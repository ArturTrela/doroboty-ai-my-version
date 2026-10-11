import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/env";
import { authAudience, authPath } from "@/features/auth/audience";
export async function proxy(request: NextRequest) {
  const config = getSupabaseConfig();
  if (!config.configured) return NextResponse.next();
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const requestHeaders = new Headers(request.headers);
  // Always overwrite the navigation hint; it is never used to grant authorization.
  requestHeaders.set("x-doroboty-return-path", nextPath);
  let response = NextResponse.next({ request: { headers: requestHeaders } });
  const client = createServerClient(config.url, config.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(values) {
        values.forEach(({ name, value }) => request.cookies.set(name, value));
        requestHeaders.set("cookie", request.headers.get("cookie") ?? "");
        response = NextResponse.next({ request: { headers: requestHeaders } });
        values.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const {
    data: { user },
  } = await client.auth.getUser();
  if (
    !user &&
    (request.nextUrl.pathname === "/app" ||
      request.nextUrl.pathname.startsWith("/app/") ||
      request.nextUrl.pathname.startsWith("/aplikuj/"))
  ) {
    const login = NextResponse.redirect(
      new URL(authPath("sign-in", authAudience(undefined, nextPath), nextPath), request.url),
    );
    response.cookies.getAll().forEach((cookie) => login.cookies.set(cookie));
    login.headers.set("Cache-Control", "private, no-store");
    return login;
  }
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
export const config = { matcher: ["/app/:path*", "/auth/:path*", "/aplikuj/:path*"] };
