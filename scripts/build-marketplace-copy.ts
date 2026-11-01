import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { marketplaceCopy, type CopyJob } from "../src/features/jobs/marketplace-copy.ts";
import { companyContexts } from "../src/features/jobs/marketplace-role-copy.ts";

// Evaluate the existing metadata SELECTs in an isolated in-memory database. The
// tracked SQL stays the authority for company/role IDs, titles and salary bands.
const path = resolve(import.meta.dirname, "../supabase/marketplace-fixtures.sql");
const source = readFileSync(path, "utf8");
const args = process.argv.slice(2);
if (args.length > 1 || args.some((arg) => arg !== "--check"))
  throw new Error("Usage: node scripts/build-marketplace-copy.ts [--check]");
const db = new PGlite();
function metadataTable(name: string) {
  const start = source.indexOf("create temporary table " + name);
  const end = source.indexOf(";", start);
  if (start < 0 || end < 0) throw new Error("Missing fixture metadata SELECT: " + name);
  return source
    .slice(start, end + 1)
    .replaceAll(" on commit drop", "")
    .replace(/::public\.\w+/g, "");
}
const quote = (value: string) => "'" + value.replaceAll("'", "''") + "'";
try {
  await db.exec(metadataTable("marketplace_fixture_companies"));
  await db.exec(metadataTable("marketplace_fixture_jobs"));
  const companies = (
    await db.query<{ id: string; name: string }>(
      "select id,name from marketplace_fixture_companies order by id",
    )
  ).rows;
  const rows = (
    await db.query<CopyJob>(`select id,title,category,function,seniority,
    company_name,city as location,remote_status,contract_type,salary_min,
    salary_min+5000 as salary_max from marketplace_fixture_jobs order by id`)
  ).rows;
  if (companies.length !== 25 || rows.length !== 100) throw new Error("Unexpected fixture counts.");
  if (
    companies.some(
      (company) =>
        new Set(rows.filter((row) => row.company_name === company.name).map((row) => row.seniority))
          .size !== 4,
    )
  )
    throw new Error("Each company must offer all four experience levels.");
  for (let role = 0; role < 20; role++)
    if (
      new Set(rows.filter((_, index) => index % 20 === role).map((row) => row.seniority)).size !== 4
    )
      throw new Error("Each role must span all four experience levels.");
  const copies = rows.map((row) => ({ ...row, ...marketplaceCopy(row) }));
  const jobBlock = [
    "create temporary table marketplace_fixture_copy (id uuid primary key, description text not null) on commit drop;",
    "insert into marketplace_fixture_copy values",
    copies.map((row) => "(" + quote(row.id) + "," + quote(row.description) + ")").join(",\n") + ";",
  ].join("\n");
  const companyBlock = [
    "create temporary table marketplace_fixture_company_copy (id uuid primary key, summary text not null, description text not null) on commit drop;",
    "insert into marketplace_fixture_company_copy values",
    companies
      .map(
        (company, index) =>
          "(" +
          [
            company.id,
            companyContexts[index].split(". ")[0] + ".",
            company.name + ". " + companyContexts[index],
          ]
            .map(quote)
            .join(",") +
          ")",
      )
      .join(",\n") + ";",
  ].join("\n");
  let result = source;
  for (const [label, block] of [
    ["COMPANY", companyBlock],
    ["MARKETPLACE", jobBlock],
  ]) {
    const begin = "-- BEGIN GENERATED " + label + " COPY";
    const end = "-- END GENERATED " + label + " COPY";
    const pattern = new RegExp(begin + "[\\s\\S]*?" + end);
    if (!pattern.test(result)) throw new Error("Missing generated-copy markers.");
    result = result.replace(pattern, () => begin + "\n" + block + "\n" + end);
  }
  if (args.includes("--check")) {
    if (result !== source)
      throw new Error("Generated marketplace copy is stale. Run this command without --check.");
  } else writeFileSync(path, result);
  const lengths = copies.map((row) => row.description.length);
  console.log(
    JSON.stringify({
      jobs: copies.length,
      companies: companies.length,
      variants: [...new Set(copies.map((row) => row.variant))],
      minimumCharacters: Math.min(...lengths),
      maximumCharacters: Math.max(...lengths),
      minimumWords: Math.min(...copies.map((row) => row.description.split(/\s+/).length)),
      maximumWords: Math.max(...copies.map((row) => row.description.split(/\s+/).length)),
      checked: args.includes("--check"),
      databaseWrites: false,
    }),
  );
} finally {
  await db.close();
}
