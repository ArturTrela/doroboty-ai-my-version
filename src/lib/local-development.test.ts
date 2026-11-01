import { describe, expect, it } from "vitest";
import {
  assertLocalApi,
  localTarget,
  updateLocalConnection,
} from "../../scripts/lib/local-database.ts";

describe("canonical local database", () => {
  const target = localTarget();

  it("uses the retained database and app ports from the tracked configuration", () => {
    expect(target).toEqual({
      projectId: "doroboty-ai-local",
      apiPort: 58321,
      databasePort: 58322,
      appOrigin: "http://127.0.0.1:3001",
    });
  });

  it("rejects the retired database and cloud targets instead of switching silently", () => {
    for (const url of ["http://127.0.0.1:55321", "https://example.supabase.co", "invalid"])
      expect(() => assertLocalApi(url, target)).toThrow("58321");
    expect(() => assertLocalApi("http://127.0.0.1:58321", target)).not.toThrow();
  });

  it("preserves AI configuration and unrelated values while replacing the local connection", () => {
    const original =
      "# keep this\nAI_PROVIDER=openai-compatible\nAI_API_KEY=fixture-only\nNEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:55321\nNEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=old-fixture\n";
    const updated = updateLocalConnection(
      original,
      {
        API_URL: "http://127.0.0.1:58321",
        DB_URL: "postgresql://127.0.0.1:58322/postgres",
        ANON_KEY: "new-public-fixture",
      },
      target,
    );
    expect(updated).toContain(
      "# keep this\nAI_PROVIDER=openai-compatible\nAI_API_KEY=fixture-only\n",
    );
    expect(updated).toContain("NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:58321\n");
    expect(updated).toContain("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=new-public-fixture\n");
    expect(updated).not.toContain("55321");
    expect(
      updateLocalConnection(
        updated,
        {
          API_URL: "http://127.0.0.1:58321",
          DB_URL: "postgresql://127.0.0.1:58322/postgres",
          ANON_KEY: "new-public-fixture",
        },
        target,
      ),
    ).toBe(updated);
  });
});
