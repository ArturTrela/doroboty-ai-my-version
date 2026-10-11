import { NextResponse, type NextRequest } from "next/server";
import { serverClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/env";
import { safeReturnPath } from "@/features/auth/return-path";
import { captureAnalytics } from "@/features/analytics/server";
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const requestedNext = params.get("next") ?? "";
  const next = safeReturnPath(requestedNext);
  if (getSupabaseConfig().configured) {
    const client = await serverClient();
    const code = params.get("code");
    const hash = params.get("token_hash");
    const type = params.get("type");
    let success = false;
    if (code) success = !(await client.auth.exchangeCodeForSession(code)).error;
    else if (hash && (type === "signup" || type === "recovery" || type === "email"))
      success = !(await client.auth.verifyOtp({ token_hash: hash, type })).error;
    if (success) {
      if (type === "signup") {
        const {
          data: { user },
        } = await client.auth.getUser();
        if (user)
          await captureAnalytics(user.id, { event: "registration_completed", properties: {} });
      }
      return new NextResponse(null, {
        status: 303,
        headers: { Location: next, "Cache-Control": "private, no-store" },
      });
    }
  }
  return new NextResponse(null, {
    status: 303,
    headers: { Location: "/auth/sign-in?error=link", "Cache-Control": "private, no-store" },
  });
}
