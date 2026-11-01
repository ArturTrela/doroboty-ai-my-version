import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { extractText, getDocumentProxy } from "unpdf";
import type { CvSnapshot } from "@/features/applications/sources";

const maximumBytes = 5 * 1024 * 1024;
const maximumPages = 30;
const maximumCharacters = 30_000;

export async function extractCvText(bytes: Uint8Array) {
  if (!bytes.length || bytes.length > maximumBytes) throw new Error("CV_UNREADABLE");
  const pdf = await getDocumentProxy(bytes, {
    maxImageSize: 1_000_000,
    verbosity: 0,
  });
  try {
    if (pdf.numPages > maximumPages) throw new Error("CV_TOO_LONG");
    const result = await extractText(pdf, { mergePages: true });
    const text = result.text.replaceAll("\u0000", "").trim();
    if (text.length < 20) throw new Error("CV_UNREADABLE");
    if (text.length > maximumCharacters) throw new Error("CV_TOO_LONG");
    return text;
  } finally {
    await pdf.loadingTask.destroy();
  }
}

export type CandidateCvText =
  | { status: "available"; fileName: string; text: string; snapshot: CvSnapshot }
  | { status: "missing"; snapshot: null }
  | { status: "unreadable"; fileName: string; snapshot: CvSnapshot };
export type CvDocument = {
  file_name: string;
  storage_path: string;
  size_bytes: number;
  uploaded_at: string;
};

export async function readCandidateCvText(
  client: SupabaseClient,
  userId: string,
): Promise<CandidateCvText> {
  const { data: document, error } = await client
    .from("candidate_documents")
    .select("file_name, storage_path, size_bytes, uploaded_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error("CV_UNAVAILABLE");
  return readCvDocumentText(client, userId, document);
}
export async function readCvDocumentText(
  client: SupabaseClient,
  userId: string,
  document: CvDocument | null,
): Promise<CandidateCvText> {
  if (!document) return { status: "missing", snapshot: null };
  if (!document.storage_path.startsWith(`${userId}/`)) throw new Error("CV_UNAVAILABLE");
  const snapshot: CvSnapshot = {
    fileName: document.file_name,
    storagePath: document.storage_path,
    sizeBytes: document.size_bytes,
    uploadedAt: document.uploaded_at,
  };
  try {
    if (document.size_bytes > maximumBytes) throw new Error("CV_UNREADABLE");
    const { data, error: downloadError } = await client.storage
      .from("candidate-cv")
      .download(document.storage_path);
    if (downloadError || !data) throw new Error("CV_UNAVAILABLE");
    const text = await extractCvText(new Uint8Array(await data.arrayBuffer()));
    return { status: "available", fileName: document.file_name, text, snapshot };
  } catch {
    return { status: "unreadable", fileName: document.file_name, snapshot };
  }
}
