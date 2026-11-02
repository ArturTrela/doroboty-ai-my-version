import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const folder = path.dirname(fileURLToPath(import.meta.url));
const kit = path.join(folder, "agent-kit");
const manifest = JSON.parse(fs.readFileSync(path.join(folder, "kit-manifest.json"), "utf8"));
const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
const actual = walk(kit).map((file) => path.relative(kit, file).split(path.sep).join("/"));
assert.deepEqual(
  actual.sort(),
  Object.keys(manifest.files).sort(),
  "Agent-kit file inventory changed",
);
for (const [relative, expected] of Object.entries(manifest.files)) {
  const hash = createHash("sha256")
    .update(fs.readFileSync(path.join(kit, relative)))
    .digest("hex");
  assert.equal(hash, expected, `Agent-kit reference changed: ${relative}`);
}
console.log(
  `Design-system reference verified: ${actual.length} files match version ${manifest.version}.`,
);
