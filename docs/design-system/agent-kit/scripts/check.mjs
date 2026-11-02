import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
if (process.versions.node.split('.')[0] !== '24') throw new Error('Use Node 24 (see .nvmrc).');
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => entry.isDirectory() ? walk(path.join(dir,entry.name)) : [path.join(dir,entry.name)]);
const files = walk(root);
let links = 0;
function checkLink(file, value) {
  if (!value || /^(?:#|[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)) return;
  const target = decodeURIComponent(value.split(/[?#]/)[0]);
  if (!target) return;
  const resolved = path.resolve(path.dirname(file), target);
  if (!resolved.startsWith(root + path.sep) && resolved !== root) throw new Error(`Outside package: ${file}: ${value}`);
  if (!fs.existsSync(resolved)) throw new Error(`Missing local file: ${path.relative(root,file)} → ${value}`);
  links++;
}
for (const file of files) {
  const ext = path.extname(file);
  if (['.js','.mjs'].includes(ext)) execFileSync(process.execPath,['--check',file],{stdio:'pipe'});
  if (!['.html','.css','.js','.mjs','.md'].includes(ext)) continue;
  const text = fs.readFileSync(file,'utf8');
  if (ext === '.html') for (const match of text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g)) checkLink(file,match[1]);
  if (ext === '.css') for (const match of text.matchAll(/(?:@import\s+["']([^"']+)["']|url\(\s*["']?([^\s)'";]+)["']?\s*\))/g)) checkLink(file,match[1]||match[2]);
  if (['.js','.mjs'].includes(ext)) for (const match of text.matchAll(/(?:from\s*|import\s*)['"](\.[^'"]+)['"]/g)) checkLink(file,match[1]);
  if (ext === '.md') for (const match of text.matchAll(/\]\(([^\s)]+)\)/g)) checkLink(file,match[1]);
}
execFileSync(process.execPath,['--test',...files.filter(file=>file.endsWith('.test.mjs'))],{stdio:'inherit'});
process.stdout.write(`Checked ${files.length} files, ${links} local references, JavaScript syntax and renderer tests.\n`);
