import { safeReturnPath } from "./return-path";

export type AuthAudience = "candidate" | "employer" | null;
export type AccountRole = "candidate" | "employer" | "operator";

export function authReturnPath(value: string | undefined, fallback = "/app"): string {
  const path = safeReturnPath(value, fallback);
  const pathname = new URL(path, "https://return.invalid").pathname;
  return pathname === "/auth" || pathname.startsWith("/auth/") ? fallback : path;
}

export function authAudience(value: string | undefined, nextPath: string): AuthAudience {
  const pathname = new URL(safeReturnPath(nextPath), "https://return.invalid").pathname;
  if (/^\/app\/(oferty|kandydaci|organizacja)(\/|$)/.test(pathname)) return "employer";
  if (/^\/(aplikuj|app\/(profil|aplikacje|onboarding|zapisane))(\/|$)/.test(pathname))
    return "candidate";
  return value === "candidate" || value === "employer" ? value : null;
}

export function roleMatchesAudience(role: AccountRole, audience: AuthAudience): boolean {
  return !audience || role === audience || (audience === "employer" && role === "operator");
}

export function authPath(mode: string, audience: AuthAudience, nextPath: string): string {
  const query = new URLSearchParams();
  if (audience) query.set("audience", audience);
  query.set("next", authReturnPath(nextPath));
  return `/auth/${mode}?${query}`;
}

export function roleMismatchMessage(audience: AuthAudience): string {
  return audience === "employer"
    ? "To konto kandydata. Panel firmy wymaga konta pracodawcy. Zaloguj się na konto firmy albo wróć do swojego konta."
    : "To konto pracodawcy lub operatora. Aby korzystać z panelu kandydata, zaloguj się na konto kandydata albo wróć do swojego konta.";
}
