// build.js — reads data/items/**/*.md, parses frontmatter + body, emits site/data.json.
// Zero deps. Run with `node build.js`.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "data", "items");
const SOURCES_DIR = path.join(__dirname, "data", "sources");
const OUT = path.join(__dirname, "docs", "data.json");

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  const stack = [{ obj: meta, indent: -1 }];
  let lastKey = null;
  let foldedBuf = null;
  let foldedTarget = null;
  let foldedKey = null;
  let foldedIndent = -1;
  for (const rawLine of m[1].split("\n")) {
    if (foldedBuf !== null) {
      const lineIndent = rawLine.match(/^ */)[0].length;
      if (rawLine.trim() && lineIndent > foldedIndent) {
        foldedBuf.push(rawLine.trim());
        continue;
      } else {
        foldedTarget[foldedKey] = foldedBuf.join(" ").trim();
        foldedBuf = null;
      }
    }
    if (!rawLine.trim()) continue;
    const indent = rawLine.match(/^ */)[0].length;
    const line = rawLine.trim();
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].obj;
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    const [, k, vRaw] = kv;
    const v = vRaw.trim();
    if (v === ">") {
      foldedBuf = [];
      foldedTarget = parent;
      foldedKey = k;
      foldedIndent = indent;
    } else if (v === "") {
      parent[k] = {};
      stack.push({ obj: parent[k], indent });
    } else {
      let val = v;
      if (/^".*"$/.test(val) || /^'.*'$/.test(val)) val = val.slice(1, -1);
      else if (val === "null") val = null;
      else if (/^-?\d+$/.test(val)) val = parseInt(val, 10);
      parent[k] = val;
    }
    lastKey = k;
  }
  if (foldedBuf !== null) foldedTarget[foldedKey] = foldedBuf.join(" ").trim();
  return { meta, body: m[2] };
}

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".md")) out.push(p);
  }
  return out;
}

const items = walk(ROOT).map((file) => {
  const text = fs.readFileSync(file, "utf8");
  const { meta, body } = parseFrontmatter(text);
  return { ...meta, body: body.trim() };
});

items.sort((a, b) => (a.id || "").localeCompare(b.id || ""));

const categories = [];
const seen = new Set();
for (const it of items) {
  if (!seen.has(it.category)) {
    seen.add(it.category);
    categories.push({ id: it.category, title: it.category_title || it.category });
  }
}

const sources = {};
for (const name of fs.readdirSync(SOURCES_DIR)) {
  if (!name.endsWith(".md")) continue;
  const text = fs.readFileSync(path.join(SOURCES_DIR, name), "utf8");
  const { meta } = parseFrontmatter(text);
  if (meta.id) sources[meta.id] = meta;
}

const data = {
  version: "0.1.0",
  generated: new Date().toISOString(),
  categories,
  items,
  sources,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(data, null, 2));
console.log(`Wrote ${OUT}: ${items.length} items, ${categories.length} categories, ${Object.keys(sources).length} sources.`);
