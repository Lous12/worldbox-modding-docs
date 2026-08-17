import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import crypto from 'node:crypto';

const cwd = process.cwd();
const docsRoot = path.join(cwd, 'src', 'content', 'docs');
const publicRoot = path.join(cwd, 'public');
const exts = new Set(['.md', '.mdx']);
const errors = [];
const notes = [];

function canonicalTextBytes(bytes) {
  const text = bytes.toString('utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  return Buffer.from(text, 'utf8');
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
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

const privatePatterns = [
  /[A-Za-z]:[\\/](?:Users|SteamLibrary)[\\/]/i,
  /steamid\s*[:=]\s*\d{12,}/i,
  /\b765611\d{11}\b/,
  /(?:^|[\s"'])\/home\//i,
  /(?:^|[\s"'])\/Users\//i,
  /Keskil/i,
];
for (const relDir of ['evidence', 'data/wbml']) {
  const dir = path.join(publicRoot, relDir);
  for (const file of walk(dir)) {
    if (fs.statSync(file).isDirectory()) continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const re of privatePatterns) if (re.test(text)) errors.push(`privacy check failed: ${rel(file, cwd)} matches ${re}`);
  }
}

const manifestPath = path.join(publicRoot, 'data', 'wbml', 'manifest.json');
if (!fs.existsSync(manifestPath)) errors.push('missing public/data/wbml/manifest.json');
else {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.site_release !== '0.3.0') errors.push(`WBML manifest site_release=${manifest.site_release} expected 0.3.0`);
    if (!Array.isArray(manifest.suites) || manifest.suites.length !== 5) errors.push('WBML manifest must contain five canonical suites (0200–0600)');
    for (const suite of manifest.suites || []) {
      const dataPath = path.join(publicRoot, suite.machine_data || '');
      const evidencePath = path.join(publicRoot, suite.evidence || '');
      if (!fs.existsSync(dataPath)) { errors.push(`missing canonical machine data: ${suite.machine_data}`); continue; }
      if (!fs.existsSync(evidencePath)) errors.push(`missing canonical evidence: ${suite.evidence}`);
      try {
        const dataBytes = fs.readFileSync(dataPath);
        const canonicalDataBytes = canonicalTextBytes(dataBytes);
        const raw = JSON.parse(dataBytes.toString('utf8').replace(/^\uFEFF/, ''));
        for (const [field, expected] of [['suite', suite.suite], ['probe_version', suite.canonical_probe], ['run', suite.run], ['schema', suite.schema]]) {
          if (raw[field] !== expected) errors.push(`${suite.machine_data}: ${field}=${raw[field]} expected ${expected}`);
        }
        if (suite.machine_data_bytes !== canonicalDataBytes.length) errors.push(`${suite.machine_data}: canonical byte size ${canonicalDataBytes.length} expected ${suite.machine_data_bytes}`);
        const dataHash = crypto.createHash('sha256').update(canonicalDataBytes).digest('hex');
        if (suite.machine_data_sha256 !== dataHash) errors.push(`${suite.machine_data}: canonical SHA-256 ${dataHash} expected ${suite.machine_data_sha256}`);
        if (fs.existsSync(evidencePath)) {
          const evidenceBytes = fs.readFileSync(evidencePath);
          const canonicalEvidenceBytes = canonicalTextBytes(evidenceBytes);
          if (suite.evidence_bytes !== canonicalEvidenceBytes.length) errors.push(`${suite.evidence}: canonical byte size ${canonicalEvidenceBytes.length} expected ${suite.evidence_bytes}`);
          const evidenceHash = crypto.createHash('sha256').update(canonicalEvidenceBytes).digest('hex');
          if (suite.evidence_sha256 !== evidenceHash) errors.push(`${suite.evidence}: canonical SHA-256 ${evidenceHash} expected ${suite.evidence_sha256}`);
        }
      } catch (error) {
        errors.push(`${suite.machine_data}: invalid JSON or integrity metadata (${error.message})`);
      }
    }
    for (const derived of manifest.derived_files || []) {
      const derivedPath = path.join(publicRoot, derived.path || '');
      if (!fs.existsSync(derivedPath)) { errors.push(`missing derived machine/AI file: ${derived.path}`); continue; }
      const derivedBytes = fs.readFileSync(derivedPath);
      const canonicalDerivedBytes = canonicalTextBytes(derivedBytes);
      if (derived.bytes !== canonicalDerivedBytes.length) errors.push(`${derived.path}: canonical byte size ${canonicalDerivedBytes.length} expected ${derived.bytes}`);
      const derivedHash = crypto.createHash('sha256').update(canonicalDerivedBytes).digest('hex');
      if (derived.sha256 !== derivedHash) errors.push(`${derived.path}: canonical SHA-256 ${derivedHash} expected ${derived.sha256}`);
    }
  } catch (error) {
    errors.push(`invalid WBML manifest JSON: ${error.message}`);
  }
}
for (const name of ['llms.txt', 'llms-full.txt']) if (!fs.existsSync(path.join(publicRoot, name))) errors.push(`missing public/${name}`);

const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
const changelog = fs.readFileSync(path.join(cwd, 'CHANGELOG.md'), 'utf8');
const firstVersion = changelog.match(/^##\s+([^\s]+)\s+/m)?.[1];
if (firstVersion && firstVersion !== pkg.version) errors.push(`package version ${pkg.version} != top changelog version ${firstVersion}`);

notes.push(`${docs.length} documentation files`);
notes.push(`${en.size} EN + ${ru.size} RU pages`);
notes.push(`${routes.size} routes checked`);
notes.push('canonical WBML manifest checked with LF-normalized integrity');

if (errors.length) {
  console.error(`Docs audit FAILED with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Docs audit PASS — ${notes.join(', ')}.`);
