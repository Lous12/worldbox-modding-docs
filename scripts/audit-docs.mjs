import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const cwd = process.cwd();
const docsRoot = path.join(cwd, 'src', 'content', 'docs');
const publicRoot = path.join(cwd, 'public');
const exts = new Set(['.md', '.mdx']);
const errors = [];
const notes = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
function rel(file, root = docsRoot) { return path.relative(root, file).split(path.sep).join('/'); }
function routeFor(file) {
  const r = rel(file).replace(/\.(md|mdx)$/i, '');
  if (r === 'index') return '';
  if (r.endsWith('/index')) return r.slice(0, -'index'.length);
  return `${r}/`;
}
function normalizeRoute(base, target) {
  const clean = target.split('#')[0].split('?')[0];
  if (!clean) return null;
  const joined = path.posix.normalize(path.posix.join('/', base, clean));
  return joined === '/' ? '' : `${joined.replace(/^\//, '').replace(/\/$/, '')}/`;
}

const docs = walk(docsRoot).filter((f) => exts.has(path.extname(f)));
const routes = new Set(docs.map(routeFor));

for (const file of docs) {
  const text = fs.readFileSync(file, 'utf8');
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) errors.push(`${rel(file)}: missing frontmatter`);
  else {
    if (!/^title\s*:/m.test(fm[1])) errors.push(`${rel(file)}: missing frontmatter title`);
    if (!/^description\s*:/m.test(fm[1])) errors.push(`${rel(file)}: missing frontmatter description`);
  }
  const fenceCount = (text.match(/^```/gm) || []).length;
  if (fenceCount % 2) errors.push(`${rel(file)}: unbalanced code fences (${fenceCount})`);

  const links = [
    ...[...text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1].trim()),
    ...[...text.matchAll(/href=["']([^"']+)["']/g)].map((m) => m[1].trim()),
  ];
  const base = routeFor(file);
  for (const href of links) {
    if (!href || /^(#|https?:|mailto:|javascript:)/i.test(href)) continue;
    if (href.startsWith('/')) continue;
    const targetRoute = normalizeRoute(base, href);
    if (targetRoute !== null && !routes.has(targetRoute)) {
      errors.push(`${rel(file)}: broken internal link ${href} -> /${targetRoute}`);
    }
  }

  for (const m of text.matchAll(/<HomeIllustration\s+[^>]*src=["']([^"']+)["']/g)) {
    const asset = path.join(publicRoot, m[1].replace(/^\/+/, ''));
    if (!fs.existsSync(asset)) errors.push(`${rel(file)}: missing public asset ${m[1]}`);
  }
}

const en = new Set(docs.map((f) => rel(f)).filter((r) => !r.startsWith('ru/')));
const ru = new Set(docs.map((f) => rel(f, path.join(docsRoot, 'ru'))).filter((r) => !r.startsWith('../')));
for (const item of [...en].sort()) if (!ru.has(item)) errors.push(`missing RU counterpart: ${item}`);
for (const item of [...ru].sort()) if (!en.has(item)) errors.push(`missing EN counterpart: ${item}`);

const evidenceDir = path.join(publicRoot, 'evidence');
if (fs.existsSync(evidenceDir)) {
  const privatePatterns = [
    /[A-Za-z]:[\\/](?:Users|SteamLibrary)[\\/]/i,
    /steamid\s*[:=]\s*\d{12,}/i,
    /\b765611\d{11}\b/,
  ];
  for (const file of walk(evidenceDir)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const re of privatePatterns) if (re.test(text)) errors.push(`privacy check failed: ${rel(file, cwd)} matches ${re}`);
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
const changelog = fs.readFileSync(path.join(cwd, 'CHANGELOG.md'), 'utf8');
const firstVersion = changelog.match(/^##\s+([^\s]+)\s+/m)?.[1];
if (firstVersion && firstVersion !== pkg.version) errors.push(`package version ${pkg.version} != top changelog version ${firstVersion}`);

notes.push(`${docs.length} documentation files`);
notes.push(`${en.size} EN + ${ru.size} RU pages`);
notes.push(`${routes.size} routes checked`);

if (errors.length) {
  console.error(`Docs audit FAILED with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Docs audit PASS — ${notes.join(', ')}.`);
