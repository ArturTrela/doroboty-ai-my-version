import { PGlite } from "@electric-sql/pglite";
import { describe, expect, it } from "vitest";
import { originalCopyQuery, planOriginalJobCopy } from "../../../scripts/lib/original-job-copy";
import type { OriginalCopyRow } from "../../../scripts/lib/original-job-copy";
import legacyDescriptions from "../../../scripts/fixtures/legacy-job-descriptions.json";
import { jobs, companies } from "./fixtures";

async function fixtureDatabase() {
  const db = new PGlite();
  await db.exec(`create table companies (id uuid primary key, name text);
    create table jobs (id uuid primary key, company_id uuid, slug text, title text,
      summary text, description text, salary_min int, updated_at timestamptz);
    create table job_text_versions (job_id uuid, version int, source text,
      visibility text, title text, summary text, description text,
      approved_at timestamptz, unique(job_id, version));`);
  for (const company of companies)
    await db.query("insert into companies values ($1,$2)", [company.id, company.name]);
  for (const job of jobs) {
    await db.query("insert into jobs values ($1,$2,$3,$4,$5,$6,$7,'2026-01-01')", [
      job.id,
      job.companyId,
      job.slug,
      job.title,
      job.summary,
      legacyDescriptions[job.slug as keyof typeof legacyDescriptions],
      job.salaryMin,
    ]);
  }
  await db.exec(`insert into job_text_versions
    select id,1,'human','public',title,summary,description,now() from jobs`);
  return db;
}

async function readRows(db: PGlite): Promise<OriginalCopyRow[]> {
  const result = await db.query<{ coalesce: OriginalCopyRow[] }>(originalCopyQuery);
  return result.rows[0].coalesce;
}

describe("original fixture copy refresh", () => {
  it("preserves an edited role and metadata, appends matching versions, and is idempotent", async () => {
    const db = await fixtureDatabase();
    try {
      await db.query("update jobs set description='My own edited description' where id=$1", [
        jobs[0].id,
      ]);
      const before = (
        await db.query(
          "select to_jsonb(j)-'description'-'updated_at' as metadata from jobs j order by id",
        )
      ).rows;
      const originalVersions = (await db.query("select * from job_text_versions order by job_id"))
        .rows;
      const plan = planOriginalJobCopy(await readRows(db));
      expect(plan.changes).toHaveLength(5);
      await db.exec(plan.sql);
      expect(
        (
          await db.query(
            "select to_jsonb(j)-'description'-'updated_at' as metadata from jobs j order by id",
          )
        ).rows,
      ).toEqual(before);
      expect(
        (await db.query("select * from job_text_versions where version=1 order by job_id")).rows,
      ).toEqual(originalVersions);
      expect(
        (await db.query("select description from jobs where id=$1", [jobs[0].id])).rows[0],
      ).toEqual({ description: "My own edited description" });
      expect(
        (
          await db.query(`select count(*)::int as count from jobs j join job_text_versions v
        on v.job_id=j.id and v.version=2 and v.description=j.description
        where v.source='human_edited' and v.visibility='public' and v.approved_at is not null`)
        ).rows[0],
      ).toEqual({ count: 5 });
      expect(planOriginalJobCopy(await readRows(db)).changes).toHaveLength(0);
    } finally {
      await db.close();
    }
  });

  it("refuses stale context and rolls back every copy and version insert", async () => {
    const db = await fixtureDatabase();
    try {
      const before = await readRows(db);
      const plan = planOriginalJobCopy(before);
      await db.query("update companies set name='Changed after preflight' where id=$1", [
        companies[0].id,
      ]);
      await expect(db.exec(plan.sql)).rejects.toThrow("Job or company changed since preflight");
      await db.exec("rollback");
      const after = await readRows(db);
      expect(after.map((row) => row.description)).toEqual(before.map((row) => row.description));
      expect(
        (await db.query("select count(*)::int as count from job_text_versions")).rows[0],
      ).toEqual({ count: 6 });
    } finally {
      await db.close();
    }
  });
});
