import "server-only";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { serverClient } from "@/lib/supabase/server";
import { authAudience, authPath, authReturnPath } from "./audience";

export type ProfileRole = "candidate" | "employer" | "operator";

export async function requireSession() {
  const client = await serverClient();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (error || !user) {
    const nextPath = authReturnPath((await headers()).get("x-doroboty-return-path") ?? undefined);
    redirect(authPath("sign-in", authAudience(undefined, nextPath), nextPath));
  }
  return { client, user };
}

export async function requireProfile(allowed?: ProfileRole[]) {
  const { client, user } = await requireSession();
  const { data, error } = await client
    .from("profiles")
    .select("id, role, display_name, first_name, last_name")
    .eq("id", user.id)
    .single();
  if (error || !data) throw new Error("Nie udało się wczytać profilu użytkownika.");
  const profile = data as {
    id: string;
    role: ProfileRole;
    display_name: string | null;
    first_name: string | null;
    last_name: string | null;
  };
  if (allowed && !allowed.includes(profile.role)) {
    const audience = allowed.includes("employer")
      ? "employer"
      : allowed.includes("candidate")
        ? "candidate"
        : null;
    if (audience) {
      const nextPath = authReturnPath(
        (await headers()).get("x-doroboty-return-path") ?? undefined,
        audience === "employer" ? "/app/oferty" : "/app",
      );
      redirect(`${authPath("sign-in", audience, nextPath)}&error=role`);
    }
    redirect("/app");
  }
  return { client, user, profile };
}
