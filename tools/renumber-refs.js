#!/usr/bin/env node
/* ============================================================
   Renumber references by order of first citation.

   Usage (from the repo root):
     node tools/renumber-refs.js           rewrite data.js in place
     node tools/renumber-refs.js --check   report only, change nothing

   1. Walks CASES in order (case -> vignette, then each stage's
      context / question / mcq (stem, options, option notes) / reveal /
      pearl / revealExtra, i.e. display order), then the
      Start-here MCQS (stem, options, option notes, rationale), and records the
      order in which each cite(n) first appears.
   2. Builds an old -> new number map and rewrites every cite(...)
      inside CASES (stage mcq blocks included: the rewrite covers the
      whole CASES source text) and MCQS, and every `n:` in REFERENCES.groups.
   3. Rebuilds REFERENCES.groups: one group per case, each reference
      filed under the case that cites it first, sorted by new number.
      References first cited in MCQS get a "Start here" group.
   4. Prints the map. Exits non-zero if any reference is unused
      (listed but never cited) or missing (cited but not listed).

   Safe to rerun: on an already-numbered file the map is the identity.
   ============================================================ */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DATA = path.join(__dirname, "..", "data.js");
const CHECK_ONLY = process.argv.includes("--check");

const GROUP_TITLES = {
  1: "Case 1 — Hr-TB",
  2: "Case 2 — MDR-TB / BPaLM",
  3: "Case 3 — Miliary TB / HIV / LAM",
  4: "Case 4 — Lymphadenopathy / EBUS",
  5: "Case 5 — Occupational exposure / LTBI",
  6: "Case 6 — Pleural TB",
  7: "Case 7 — Spinal TB",
  8: "Case 8 — TB meningitis",
  9: "Case 9 — Intestinal TB",
  10: "Case 10 — Peritoneal TB",
  start: "Start here questions",
};
const STAGE_FIELDS = ["context", "question", "reveal", "pearl", "revealExtra"];

const src = fs.readFileSync(DATA, "utf8");
const EOL = src.includes("\r\n") ? "\r\n" : "\n";

// ---------- load the data the same way the browser does ----------
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  src +
    '\n;this.__CASES = CASES; this.__REFS = REFERENCES; this.__MCQS = typeof MCQS === "undefined" ? [] : MCQS;',
  ctx
);
const CASES = ctx.__CASES;
const REFERENCES = ctx.__REFS;
const MCQS = ctx.__MCQS;

// ---------- 1. first-citation order ----------
const citedIn = new Map(); // old n -> case id (or "start") of first citation
const order = [];
const citeRe = /references\.html#ref(\d+)"/g;
function record(texts, owner) {
  for (const t of texts) {
    if (!t) continue;
    for (const m of t.matchAll(citeRe)) {
      const n = Number(m[1]);
      if (!citedIn.has(n)) {
        citedIn.set(n, owner);
        order.push(n);
      }
    }
  }
}
for (const c of CASES) {
  const texts = [c.vignette];
  for (const s of c.stages) {
    for (const f of STAGE_FIELDS) {
      if (f === "reveal" && s.mcq) texts.push(s.mcq.stem, ...s.mcq.options, ...(s.mcq.optionNotes || []));
      texts.push(s[f]);
    }
  }
  record(texts, c.id);
}
for (const mcq of MCQS) record([mcq.stem, ...mcq.options, ...(mcq.optionNotes || []), mcq.rationale], "start");

// ---------- 2. map, unused, missing ----------
const items = REFERENCES.groups.flatMap((g) => g.items);
const byN = new Map(items.map((it) => [it.n, it]));
if (byN.size !== items.length) fail("Duplicate reference numbers in REFERENCES.groups.");

const map = new Map(order.map((oldN, i) => [oldN, i + 1]));
const unused = items.map((it) => it.n).filter((n) => !map.has(n));
const missing = order.filter((n) => !byN.has(n));

console.log("old -> new");
for (const [o, n] of map) console.log(`  ${String(o).padStart(3)} -> ${n}${o === n ? "" : "  *"}`);
console.log(`\n${map.size} cited references; unused: ${unused.length ? unused.join(", ") : "none"}; missing: ${missing.length ? missing.join(", ") : "none"}`);

for (const it of items) {
  const m = /\bref\s+(\d+)/i.exec(`${it.tag || ""} ${it.note || ""}`);
  if (m) console.warn(`warning: ref ${it.n} tag/note mentions "ref ${m[1]}", which renumbering will not update`);
}

if (unused.length || missing.length) fail("Fix unused/missing references before renumbering.");
if (CHECK_ONLY) process.exit(0);

// ---------- 3. rewrite cite(...) calls inside CASES and MCQS ----------
const casesStart = src.indexOf("const CASES = [");
const refsStart = src.indexOf("const REFERENCES = {");
if (casesStart < 0 || refsStart < casesStart) fail("Could not locate CASES / REFERENCES in data.js.");
// MCQS sits between CASES and REFERENCES, so this slice covers both.
const mcqsAt = src.indexOf("const MCQS = [");
if (mcqsAt >= 0 && (mcqsAt < casesStart || mcqsAt > refsStart)) fail("MCQS must sit between CASES and REFERENCES.");

const casesText = src
  .slice(casesStart, refsStart)
  .replace(/cite\(([\d,\s]+)\)/g, (_, args) =>
    `cite(${args.split(",").map((a) => map.get(Number(a.trim()))).join(", ")})`
  );

// ---------- 4. regenerate REFERENCES.groups ----------
const q = (s) => JSON.stringify(s);
const KEY_ORDER = ["text", "doi", "url", "tag", "note"];
function itemLine(it, newN) {
  const extra = Object.keys(it).filter((k) => k !== "n" && !KEY_ORDER.includes(k));
  if (extra.length) fail(`Reference ${it.n} has unexpected keys: ${extra.join(", ")}`);
  const parts = [`n: ${newN}`];
  for (const k of KEY_ORDER) if (it[k] !== undefined) parts.push(`${k}: ${q(it[k])}`);
  return `        { ${parts.join(", ")} },`;
}

const groupsOut = [];
for (const owner of [...CASES.map((c) => c.id), "start"]) {
  const own = order.filter((o) => citedIn.get(o) === owner);
  if (!own.length) continue;
  const title = GROUP_TITLES[owner] || `Case ${owner}`;
  groupsOut.push(
    [
      "    {",
      `      title: ${q(title)},`,
      "      items: [",
      ...own.map((o) => itemLine(byN.get(o), map.get(o))),
      "      ],",
      "    },",
    ].join(EOL)
  );
}

let refsText = src.slice(refsStart);
const gStart = refsText.indexOf("  groups: [");
const gEnd = refsText.indexOf("  background: {");
if (gStart < 0 || gEnd < gStart) fail("Could not locate REFERENCES.groups / background.");
refsText =
  refsText.slice(0, gStart) +
  ["  groups: [", ...groupsOut, "  ],", ""].join(EOL) +
  refsText.slice(gEnd);

fs.writeFileSync(DATA, src.slice(0, casesStart) + casesText + refsText, "utf8");
console.log(`\nRewrote ${path.relative(process.cwd(), DATA)}.`);

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}
