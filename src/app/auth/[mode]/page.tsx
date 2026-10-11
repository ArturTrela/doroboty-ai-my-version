import { notFound, redirect } from "next/navigation";
import { AuthForm, type AuthMode } from "@/features/auth/auth-form";
import { SetupNotice } from "@/components/setup-notice";
import { getSupabaseConfig } from "@/lib/env";
import { serverClient } from "@/lib/supabase/server";
import {
  authAudience,
  authPath,
  authReturnPath,
  roleMatchesAudience,
  type AccountRole,
} from "@/features/auth/audience";
export const dynamic = "force-dynamic";
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ mode: string }>;
  searchParams: Promise<{ error?: string; next?: string; audience?: string }>;
}) {
  const { mode } = await params;
  if (!["sign-in", "sign-up", "forgot-password", "update-password"].includes(mode)) notFound();
  if (!getSupabaseConfig().configured) return <SetupNotice />;
  const query = await searchParams;
  const nextPath = authReturnPath(
    query.next,
    query.audience === "employer" ? "/app/oferty" : "/app",
  );
  const audience = authAudience(query.audience, nextPath);
  if (mode === "sign-up" && audience === "employer")
    redirect(authPath("sign-in", audience, nextPath));
  let signedInRole: AccountRole | null = null;
  if (mode === "sign-in" && audience) {
    const client = await serverClient();
    const {
      data: { user },
    } = await client.auth.getUser();
    if (user) {
      const { data: profile, error } = await client
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (error || !profile) throw new Error("Nie udało się ustalić roli konta.");
      signedInRole = profile.role;
      if (roleMatchesAudience(profile.role, audience)) redirect(nextPath);
    }
  }
  if (mode === "update-password") {
    const client = await serverClient();
    const {
      data: { user },
    } = await client.auth.getUser();
    if (!user) redirect(authPath("forgot-password", audience, nextPath));
  }
  return (
    <AuthForm
      key={`${mode}:${audience}:${nextPath}`}
      mode={mode as AuthMode}
      linkError={query.error === "link"}
      nextPath={nextPath}
      audience={audience}
      signedInRole={signedInRole}
      roleError={query.error === "role"}
    />
  );
}
