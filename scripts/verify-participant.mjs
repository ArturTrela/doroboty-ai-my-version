import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
export const packetFiles = ["journeys.json"];
export const baselineColumns = [
  "id",
  "release",
  "candidateId",
  "jobId",
  "jobFamily",
  "seniority",
  "viewedAt",
  "startedAt",
  "submittedAt",
  "reviewedAt",
  "invitedAt",
  "conversationAt",
  "employerContinued",
];
export function verifyPacket(root, { pristine = false } = {}) {
  const folder = path.join(root, "docs/case/baseline");
  assert.deepEqual(fs.readdirSync(folder).sort(), packetFiles);
  const rows = JSON.parse(fs.readFileSync(path.join(folder, "journeys.json"), "utf8"));
  assert.equal(rows.length, 120);
  assert.equal(new Set(rows.map((row) => row.id)).size, rows.length);
  for (const row of rows) {
    assert.deepEqual(Object.keys(row).sort(), [...baselineColumns].sort());
    assert.equal(row.release, "baseline");
    assert.ok([null, true, false].includes(row.employerContinued));
    for (const key of baselineColumns.filter((key) => key.endsWith("At")))
      assert.ok(row[key] === null || !Number.isNaN(Date.parse(row[key])));
  }
  for (const [key, expected] of [
    ["startedAt", 72],
    ["submittedAt", 36],
    ["reviewedAt", 31],
    ["invitedAt", 18],
    ["conversationAt", 12],
  ])
    assert.equal(rows.filter((row) => row[key]).length, expected);
  assert.equal(rows.filter((row) => row.employerContinued === true).length, 6);
  const quote = (value) => '"' + String(value ?? "").replaceAll('"', '""') + '"';
  const csv =
    baselineColumns.join(",") +
    "\n" +
    rows.map((row) => baselineColumns.map((key) => quote(row[key])).join(",")).join("\n") +
    "\n";
  assert.equal(fs.readFileSync(path.join(root, "public/case/baseline.csv"), "utf8"), csv);
  if (fs.existsSync(path.join(root, "participant-manifest.json"))) {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(root, "participant-manifest.json"), "utf8"),
    );
    assert.equal(manifest.stage, "baseline");
    assert.equal(manifest.version, 1);
    if (!pristine) return rows.length;
    const actual = [];
    function visit(folder, prefix = "") {
      for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
        const relative = prefix + entry.name;
        if (entry.isDirectory()) visit(path.join(folder, entry.name), relative + "/");
        else if (relative !== "participant-manifest.json") actual.push(relative);
      }
    }
    visit(root);
    assert.deepEqual(actual.sort(), Object.keys(manifest.files).sort());
    for (const [relative, hash] of Object.entries(manifest.files)) {
      assert.ok(
        !relative
          .split("/")
          .some((part) => [".git", "source", "node_modules", "supabase"].includes(part)),
      );
      assert.equal(
        createHash("sha256")
          .update(fs.readFileSync(path.join(root, relative)))
          .digest("hex"),
        hash,
      );
    }
  }
  return rows.length;
}
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const root = path.resolve(process.argv[2] ?? ".");
  console.log(
    `Baseline packet verified: ${verifyPacket(root, { pristine: process.argv.includes("--pristine") })} journeys; expected files, columns and funnel.`,
  );
}
