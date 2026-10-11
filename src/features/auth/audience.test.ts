import { describe, expect, it } from "vitest";
import { authAudience, authPath, authReturnPath, roleMatchesAudience } from "./audience";

describe("role-aware login", () => {
  it("recognizes legacy links and lets the protected destination define the audience", () => {
    expect(authAudience(undefined, "/app/oferty?status=review")).toBe("employer");
    expect(authAudience("candidate", "/app/kandydaci/abc")).toBe("employer");
    expect(authAudience("employer", "/aplikuj/ai-product-manager")).toBe("candidate");
    expect(authAudience(undefined, "/app/profil")).toBe("candidate");
    expect(authAudience(undefined, "/app/oferty-other")).toBeNull();
  });
  it("preserves generic case login without allowing operator privileges from a URL", () => {
    expect(authAudience("operator", "/app")).toBeNull();
    expect(authAudience("employer", "/app")).toBe("employer");
    expect(roleMatchesAudience("candidate", "employer")).toBe(false);
    expect(roleMatchesAudience("employer", "candidate")).toBe(false);
    expect(roleMatchesAudience("operator", "candidate")).toBe(false);
    expect(roleMatchesAudience("operator", "employer")).toBe(true);
    expect(roleMatchesAudience("candidate", "candidate")).toBe(true);
    expect(roleMatchesAudience("employer", "employer")).toBe(true);
    expect(roleMatchesAudience("operator", null)).toBe(true);
  });
  it("preserves safe return paths across recovery without accepting external redirects", () => {
    expect(authReturnPath("/auth/sign-in?audience=candidate")).toBe("/app");
    expect(authReturnPath("/auth/update-password", "/app/oferty")).toBe("/app/oferty");
    const path = authPath("forgot-password", "candidate", "/aplikuj/ai-product-manager");
    const query = new URL(path, "https://return.invalid").searchParams;
    expect(query.get("audience")).toBe("candidate");
    expect(query.get("next")).toBe("/aplikuj/ai-product-manager");
    expect(authPath("sign-in", "employer", "https://evil.test")).toBe(
      "/auth/sign-in?audience=employer&next=%2Fapp",
    );
  });
});
