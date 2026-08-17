# WorldBox Modding Docs

Community-driven documentation, research, examples, and troubleshooting for WorldBox modding and NeoModLoader.

The project is built with Astro + Starlight as a multilingual modding workbench: beginner routes, practical browser tools, searchable reference, troubleshooting, and evidence-backed research for humans and AI assistants.

**Current public workbench release: v0.3.0.**

## Knowledge architecture

The documentation now has four deliberately different layers:

1. **Quick Docs** — short task/entity pages for modders who need an answer fast.
2. **Detailed API & reference** — the source of truth for signatures, runtime owner/provenance, access, result kind/type, stability, preconditions and lifecycle caveats.
3. **WBML Research Archive** — experiment design, rejected harness assumptions, final matrices and version-bound conclusions.
4. **Machine Data** — canonical JSON atlases, a manifest, compact capability index, evidence vocabulary and AI-facing text resources.

Rule: a Quick page may simplify navigation, but it must never erase a caveat from Detailed Docs or canonical WBML evidence.

## Current foundation

- English root documentation and full Russian localization
- Built-in full-text search
- Practical Workbench: local Player.log Analyzer 2.0, Starter Mod Generator, API Explorer and Compatibility Matrix
- Task-first Recipe Library with beginner-friendly step-by-step pages
- Quick Docs for Actor, City, Kingdom, Building, world/tiles, save/load, UI, diplomacy and evidence status
- Detailed WorldBox runtime reference backed by canonical WBML 0.2.0–0.6.0 results
- WBML research archive with rejected methodology kept separate from public capability truth
- Canonical machine-readable atlases under `public/data/wbml/`
- AI-facing `llms.txt` and `llms-full.txt`
- Evidence-status system for verified, observed, reversible mutation, lifecycle windows, failed assumptions, unsafe and unknown findings
- A clearly marked **planned** WorldBox Modding API roadmap; the runtime API itself does not exist yet
- GitHub Pages deployment workflow, dark/light theme, GitHub edit links and optional support links

## Current tested research stack

Main WBML 0.2.0–0.6.0 canonical evidence is bound to:

- WorldBox 0.51.2 build 719
- Unity 2022.3.60f1
- NeoModLoader 1.2.0.1
- Political World 1.7.0 / PoliticalWorldAPI 1.14.0 where those mods were present in the research environment

A green result is not a promise for future WorldBox/NML versions. Baseline-diff or re-test when the stack changes.

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Repository structure

```text
src/content/docs/quick/  Human quick-reference layer
src/content/docs/api/    Detailed/source-of-truth reference
src/content/docs/research/ WBML research archive
src/content/docs/ai/     AI reliability and retrieval rules
src/content/docs/ru/     Russian counterparts
public/data/wbml/        Canonical machine-readable WBML data
public/evidence/         Sanitized evidence excerpts
public/llms*.txt         AI-facing entry resources
```

## Documentation ingestion rule

A WBML result is not considered fully entered into the knowledge base until:

```text
canonical evidence
→ full result analysis
→ Detailed Docs
→ Quick Docs
→ machine/AI layer
```

Documentation may be published in batches after several WBML research versions, but the human and machine layers for that batch should land together.

## Support

WorldBox Modding Docs is free and open. Optional support can help fund more experiments, compatibility checks and maintenance:

- DonationAlerts: https://www.donationalerts.com/r/lous12
- DALink: https://dalink.to/lous12

There is no paid documentation tier.

## Documentation audit

Before pushing a documentation change, run:

```bash
npm run audit
```

The audit checks EN/RU page parity, internal routes, required frontmatter, code fences, referenced artwork, sanitized public evidence/machine data, package/changelog version agreement and canonical WBML manifest consistency.


## WBML 1.0 frozen baseline

Systematic research is frozen for WorldBox 0.51.2 build 719 / NeoModLoader 1.2.0.1. Re-open it only after a game/loader update or a direct contradiction to the baseline.
