export function safeReturnPath(value: string | null | undefined, fallback = "/app"): string {
  if (!value?.startsWith("/") || value.startsWith("//") || /[\\\r\n]/.test(value)) return fallback;
  const base = new URL("https://return.invalid");
  const resolved = new URL(value, base);
  return resolved.origin === base.origin
    ? `${resolved.pathname}${resolved.search}${resolved.hash}`
    : fallback;
}
