# WorldBox Modding Docs v0.3.0 — Evidence Architecture & WBML 0.2–0.6

v0.3.0 is the first release where the post-baseline WBML research is published in the full architecture agreed for the project instead of as isolated notes.

## What changed

- Added **Quick Docs** for practical entity/task lookup.
- Expanded **Detailed API & reference** with exact WorldBox runtime signatures, owner provenance, access, samples, stability and lifecycle caveats.
- Added dedicated WBML research pages for 0.2.0 through 0.6.0, including rejected harness assumptions and the canonical final run for each version.
- Published the five full canonical machine JSON exports plus manifest, evidence vocabulary and compact capability index.
- Added sanitized evidence summaries for WBML-0200 through WBML-0600.
- Updated the AI layer and added `llms-full.txt` so models/RAG systems can distinguish quick summaries, detailed truth, raw evidence and `research-needed` gaps.
- Expanded API Explorer/Compatibility coverage beyond PoliticalWorldAPI into the new WorldBox runtime evidence.
- Documented the **planned** WorldBox Modding API dependency-mod architecture and its intended role under Fog of War Overhaul and future Political World refactoring. No runtime API is claimed to exist yet.

## Canonical research in this release

| WBML | Canonical probe | Result |
|---|---|---|
| 0.2.0 Automatic API Atlas | 0.2.0-fix3 / `0fa6e20674fc` | 26/0/0 CLOSED PASS |
| 0.3.0 Capability Verification Atlas | 0.3.0-fix1 / `82c23a7c8916` | 28/0/0 CLOSED PASS |
| 0.4.0 Parameterized Query Atlas | 0.4.0-fix2 / `7d17ef55149e` | 34/0/0 CLOSED PASS |
| 0.5.0 Safe Mutation Atlas | 0.5.0 / `00d01039f05e` | 34/0/0 CLOSED PASS |
| 0.6.0 Entity Lifecycle Atlas | 0.6.0-fix5 / `d3e2a6ed626f` | 34/0/0 CLOSED PASS |

All claims remain bound to the documented WorldBox 0.51.2 / NML 1.2.0.1 research baseline unless another page states a narrower scope.

## Applying this patch

This archive is an **overlay patch**, not a clean standalone repository export. Extract it into the root of the existing `worldbox-modding-docs` checkout and allow matching files to be replaced. Existing files not present in the archive must remain in place.

After extraction, review the changes in GitHub Desktop, commit/push them, and let the repository's normal audit + Astro GitHub Pages workflow validate the merged tree.
