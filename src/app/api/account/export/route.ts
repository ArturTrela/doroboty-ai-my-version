import { NextResponse } from "next/server";
import { serverClient } from "@/lib/supabase/server";

export async function GET() {
  const client = await serverClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [profile, candidate, experiences, samples, documents, applications, savedJobs, drafts] =
    await Promise.all([
      client
        .from("profiles")
        .select("id, role, display_name, first_name, last_name, created_at")
        .eq("id", user.id)
        .single(),
      client.from("candidate_profiles").select("*").eq("user_id", user.id).maybeSingle(),
      client.from("candidate_experiences").select("*").eq("user_id", user.id),
      client.from("candidate_work_samples").select("*").eq("user_id", user.id),
      client
        .from("candidate_documents")
        .select("file_name, mime_type, size_bytes, uploaded_at")
        .eq("user_id", user.id),
      client.from("applications").select("*").eq("candidate_id", user.id),
      client.from("saved_jobs").select("job_id, saved_at").eq("candidate_id", user.id),
      client.from("application_drafts").select("*").eq("candidate_id", user.id),
    ]);
  if (
    [profile, candidate, experiences, samples, documents, applications, savedJobs, drafts].some(
      (result) => result.error,
    )
  )
    return NextResponse.json(
      { error: "Nie udało się przygotować kompletnego eksportu. Spróbuj ponownie." },
      { status: 503 },
    );
  const events = applications.data?.length
    ? await client
        .from("application_stage_events")
        .select("application_id, stage, occurred_at")
        .in(
          "application_id",
          applications.data.map((application) => application.id),
        )
    : { data: [], error: null };
  if (events.error)
    return NextResponse.json(
      { error: "Nie udało się wczytać historii aplikacji." },
      { status: 503 },
    );
  const payload = {
    exportedAt: new Date().toISOString(),
    account: { email: user.email, ...profile.data },
    profile: candidate.data,
    experiences: experiences.data ?? [],
    workSamples: samples.data ?? [],
    documents: documents.data ?? [],
    applications: applications.data ?? [],
    applicationEvents: events.data ?? [],
    savedJobs: savedJobs.data ?? [],
    drafts: drafts.data ?? [],
  };
  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "content-disposition": `attachment; filename="doroboty-ai-export-${new Date().toISOString().slice(0, 10)}.json"`,
      "cache-control": "private, no-store",
    },
  });
}
