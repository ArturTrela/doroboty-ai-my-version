import { createClient } from "@supabase/supabase-js";
import { LOCAL_TEST_PASSWORD, localSupabaseStatus } from "../lib/local-database.ts";

const status = localSupabaseStatus();
const url = status.API_URL as string | undefined;
const serviceKey = (status.SERVICE_ROLE_KEY ?? status.SECRET_KEY) as string | undefined;
if (!url || !["127.0.0.1", "localhost"].includes(new URL(url).hostname) || !serviceKey) {
  throw new Error("Test accounts may be created only in the local Supabase stack.");
}

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function fixtureCv(email: string) {
  const stream = [
    "BT",
    "/F1 22 Tf",
    "72 740 Td",
    "(DoRoboty.ai - Candidate CV) Tj",
    "0 -42 Td",
    "/F1 12 Tf",
    `(${email}) Tj`,
    "0 -26 Td",
    "(Product discovery, AI delivery, measurable outcomes.) Tj",
    "0 -22 Td",
    "(Fixture document for local testing only.) Tj",
    "ET",
  ].join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  let body = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(body));
    body += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = Buffer.byteLength(body);
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  body += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("");
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(body);
}

const password = LOCAL_TEST_PASSWORD;
const fixtures = [
  { email: "candidate@doroboty.local", role: "candidate" },
  { email: "candidate-longform@doroboty.local", role: "candidate" },
  { email: "employer@doroboty.local", role: "employer" },
  { email: "employer-other@doroboty.local", role: "employer" },
  { email: "employer-new@doroboty.local", role: "employer" },
  { email: "operator@doroboty.local", role: "operator" },
] as const;

const listed = await admin.auth.admin.listUsers({ perPage: 1000 });
if (listed.error) throw listed.error;
const users = new Map<string, string>();
for (const fixture of fixtures) {
  let user = listed.data.users.find((candidate) => candidate.email === fixture.email);
  if (!user) {
    const created = await admin.auth.admin.createUser({
      email: fixture.email,
      password,
      email_confirm: true,
      user_metadata: { display_name: fixture.role },
    });
    if (created.error) throw created.error;
    user = created.data.user;
  }
  if (user) {
    const updated = await admin.auth.admin.updateUserById(user.id, {
      password,
      email_confirm: true,
    });
    if (updated.error) throw updated.error;
  }
  const existing = await admin
    .from("profiles")
    .select("display_name, first_name, last_name")
    .eq("id", user.id)
    .single();
  if (existing.error) throw existing.error;
  const profile = await admin
    .from("profiles")
    .update({
      role: fixture.role,
      display_name:
        existing.data.display_name ||
        (fixture.role === "candidate" ? "Kandydat testowy" : fixture.role),
      first_name: existing.data.first_name || (fixture.role === "candidate" ? "Kandydat" : null),
      last_name: existing.data.last_name || (fixture.role === "candidate" ? "Testowy" : null),
    })
    .eq("id", user.id);
  if (profile.error) throw profile.error;
  users.set(fixture.email, user.id);
  if (fixture.role === "employer" && fixture.email !== "employer-new@doroboty.local") {
    const membership = await admin.from("organization_memberships").upsert({
      organization_id:
        fixture.email === "employer-other@doroboty.local"
          ? "40000000-0000-4000-8000-000000000002"
          : "40000000-0000-4000-8000-000000000001",
      user_id: user.id,
      role: "recruiter",
    });
    if (membership.error) throw membership.error;
  }
}

for (const email of ["candidate@doroboty.local", "candidate-longform@doroboty.local"] as const) {
  const userId = users.get(email)!;
  const existingDocument = await admin
    .from("candidate_documents")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (existingDocument.error) throw existingDocument.error;
  if (existingDocument.data) continue;
  const path = `${userId}/cv.pdf`;
  const pdf = fixtureCv(email);
  const uploaded = await admin.storage.from("candidate-cv").upload(path, pdf, {
    contentType: "application/pdf",
    upsert: true,
  });
  if (uploaded.error) throw uploaded.error;
  const document = await admin.from("candidate_documents").upsert({
    user_id: userId,
    storage_path: path,
    file_name: `CV-${email.split("@")[0]}.pdf`,
    mime_type: "application/pdf",
    size_bytes: pdf.byteLength,
    uploaded_at: new Date().toISOString(),
  });
  if (document.error) throw document.error;
}

console.log("Local test accounts ready.");
