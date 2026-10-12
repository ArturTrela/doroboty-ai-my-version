"use server";

import { revalidatePath } from "next/cache";
import { requireProfile } from "@/features/auth/session";
import { captureAnalytics } from "@/features/analytics/server";
import { z } from "zod";

export async function toggleSavedJob(formData: FormData) {
  const { client, user } = await requireProfile(["candidate"]);
  const parsed = z
    .object({
      jobId: z.uuid(),
      slug: z
        .string()
        .max(200)
        .regex(/^[a-z0-9-]*$/),
    })
    .safeParse({ jobId: formData.get("jobId"), slug: formData.get("slug") ?? "" });
  if (!parsed.success) return;
  const { jobId, slug } = parsed.data;

  const { data: existing } = await client
    .from("saved_jobs")
    .select("job_id")
    .eq("candidate_id", user.id)
    .eq("job_id", jobId)
    .maybeSingle();
  if (existing) {
    await client.from("saved_jobs").delete().eq("candidate_id", user.id).eq("job_id", jobId);
  } else {
    await client.from("saved_jobs").insert({ candidate_id: user.id, job_id: jobId });
  }
  await captureAnalytics(user.id, { event: "job_saved", properties: { jobId, saved: !existing } });
  revalidatePath("/oferty");
  if (slug) revalidatePath(`/oferty/${slug}`);
  revalidatePath("/app/zapisane");
}
