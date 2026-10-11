import { SettingsView } from "@/components/settings-view";
import { CandidateAccountSettings } from "@/features/candidates/account-settings";
import { requireProfile } from "@/features/auth/session";

export default async function Page() {
  const { client, user, profile } = await requireProfile();
  const deletion =
    profile.role === "candidate"
      ? await client
          .from("account_deletion_requests")
          .select("status")
          .eq("user_id", user.id)
          .eq("status", "pending")
          .maybeSingle()
      : null;
  return (
    <>
      <SettingsView mode="live" />
      {profile.role === "candidate" && (
        <CandidateAccountSettings
          email={user.email ?? ""}
          deletionPending={Boolean(deletion?.data)}
        />
      )}
    </>
  );
}
