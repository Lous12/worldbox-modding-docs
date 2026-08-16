# Changelog

## 0.2.0-alpha.5 — Practical Tools 2.0
- Expanded the task-first Recipe Library into dedicated beginner-friendly recipe pages instead of routing every card directly into low-level reference pages.
- Added dedicated EN/RU recipes for a first NML mod, kingdom data, party data, Political World events, Political World actions, Player.log diagnosis, safer UI cloning and WorldTile height.
- Reworked Recipe Finder cards to show evidence/status context and send users to the practical recipe first, then to deep reference/evidence from there.
- Upgraded Player.log Analyzer with actionable next-step links for compiler errors, StackOverflow, NullReference, Event Bus callback failures, NML listener failures, Political World diagnostics, localization gaps and common non-fatal log noise.
- Added severity-aware analyzer output so informational network/library noise is not presented like a fatal crash.
- Added compiler-code extraction, Political World diagnostic grouping, missing-localization detection and clearer summary counts.
- Added new EN/RU troubleshooting pages for C# compile errors, NullReferenceException, NML listener construction failures and common Player.log noise.
- Updated Tools and Player.log landing pages to explain the new diagnosis → explanation → documentation flow.
- Kept all runtime-evidence boundaries explicit: the analyzer recognizes signatures and routes to documentation, but does not claim a root cause when the log does not prove one.

## 0.2.0-alpha.4 — Practical UX Polish
- Polished the English and Russian home-page trust/status blocks so practical navigation no longer depends on newer emoji glyphs.
- Made the beginner entry route slightly more visually dominant on wide screens while keeping the other two entry paths obvious.
- Unified Workbench headers around compact `LOG` / `MOD` / `API` / `HOW` / `FIX` identities and clearer evidence/privacy badges.
- Added live result counts and one-click reset controls to Recipe Finder and API Explorer.
- Added a visible three-step flow to the Troubleshooter so beginners can see where they are in the diagnosis path.
- Added real drag-and-drop handling to Player.log Analyzer plus compact result overview chips for detected signal groups and loaded mods.
- Reworked the Tools landing page around human goals (what broke, first skeleton, which API, evidence boundaries) and removed emoji-only tool glyphs.
- Improved mobile behavior for filter pills, tool inputs, status cards, support buttons, environment summaries and trust badges.
- Added focus-visible and reduced-motion rules for better keyboard/accessibility behavior.
- Kept all existing WBML evidence boundaries, temporary artwork filenames, donation links, bilingual structure and the `Какова цена свободы?` epigraph intact.

## 0.2.0-alpha.3 — Visual & Navigation Polish
- Reworked the English and Russian home pages around clearer illustrated entry routes and practical task cards.
- Added eight temporary transparent PNG concept icons for Start, Recipes, UI, Persistence, Political World, World Generation, Tools, and Troubleshooting.
- Added a base-aware `HomeIllustration` component so public assets work under the GitHub Pages `/worldbox-modding-docs/` base path and local Astro builds.
- Replaced the missing/newer UI emoji on the main practical route with an actual image asset.
- Added quick links for Event Bus, Player.log, API Explorer and compatibility without requiring the user to know sidebar categories.
- Replaced emoji-dependent Workbench/Recipe/Troubleshooter utility glyphs with short text badges such as `LOG`, `API`, `UI`, `SAVE`, and `C#` where practical.
- Renamed the English sidebar `Workbench` group to the clearer `Tools`, and simplified `Reference` / `Research & evidence` labels.
- Added `ARTWORK-NOTES.md` so the temporary concepts can later be redrawn by hand by replacing stable filenames only.
- Kept the epigraph `Какова цена свободы?`, DonationAlerts / DALink support, bilingual structure, and evidence-status model intact.
- Added responsive rules for illustrated cards and small-screen quick links.

## 0.2.0-alpha.2 — Friendly Task-First UX
- Reworked both home pages around three obvious entry routes: new modder, known task, or broken mod.
- Reduced beginner-facing technical density and moved research/support detail lower on the home page without removing it.
- Added a bilingual task-first Recipe Library with local search and category filters.
- Added a bilingual symptom-first Troubleshooter that routes users to concrete checks, Player.log analysis, and relevant guides instead of guessing a cause.
- Reworked Getting Started into five explicit steps with “Done when” checkpoints.
- Reworked Troubleshooting landing pages around observable symptoms and a practical debugging order.
- Added a dedicated Recipes sidebar group and renamed the old broad “Build something” group to the clearer “Guides”.
- Preserved DonationAlerts / DALink support links, the `Какова цена свободы?` epigraph, WBML evidence statuses, and the browser-local tool model.
- Added responsive styles for entry cards, recipes, checkpoints, and the troubleshooter.

## 0.2.0-alpha.1.1 — Homepage Support Hotfix
- Restored prominent DonationAlerts and DALink support links on both English and Russian home pages after the v0.2 homepage redesign.
- Kept support optional and the documentation explicitly free/open.
- Reused the existing responsive support-card styles, so the block stacks cleanly on small screens.

## 0.2.0-alpha.1 — Practical Workbench UX
- Reworked the English and Russian home pages around beginner goals instead of documentation categories.
- Preserved the project epigraph `Какова цена свободы?` while moving technical detail below the first-use path.
- Added a Workbench section with a browser-local Player.log Analyzer, Starter Mod Generator, searchable API Explorer and Compatibility Matrix.
- Added a beginner route that prioritizes: make the mod load → verify the log → add one feature → check evidence boundaries.
- Reorganized the Starlight sidebar into Start here, Build something, Workbench, Fix a problem, Reference, Research & evidence, For AI and More.
- Added responsive, task-oriented cards and practical tool UI styles for desktop and mobile.
- The Player.log Analyzer performs no network upload and sanitizes local paths / long numeric IDs in displayed excerpts.
- The Starter Mod Generator is based on the manifest and `BasicMod<Main>` / `OnModLoad()` structure used by working WBML probes on the current research stack.
- The API Explorer includes only the WBML-0001 through WBML-0005 PoliticalWorldAPI baseline and keeps Observed behavior visually separate from Verified behavior.
- Expanded Getting Started into a usable beginner workflow without inventing unverified version-specific NML installation steps.

## 0.1.10 — Lab Baseline Through WBML-0005
- Documented the accumulated WorldBox Modding Lab runtime baseline through WBML-0005 in beginner-friendly English and Russian pages.
- Promoted WBML-0003 executed party-private persistence and party lifecycle branches to runtime Verified for the exact tested stack; preserved the one party-to-party isolation SKIP as an explicit evidence gap.
- Reworked the PoliticalWorldAPI Event Bus reference around WBML-0004 runtime evidence, including 23 discovered event IDs, runtime acceptance of custom/unknown event IDs, `OldValue`/`NewValue` rename mapping, per-subscriber payload isolation, callback exception isolation, recursion depth 16, and 100-dispatch stress completion.
- Added a PoliticalWorldAPI Actions / Conditions / Effects reference based on WBML-0005 runtime evidence.
- Documented same-ID action registration as runtime replacement/upsert behavior for API 1.14.0.
- Documented the single-active-party support normalization trap as Observed, while keeping exact multi-party support mutation unverified.
- Documented the diagnostics bookkeeping mismatch observed after repeated same-ID action replacement: live action query count 0 while diagnostics reported 2 registered actions.
- Added sanitized evidence excerpts for WBML-0003, WBML-0004 and WBML-0005.
- Added a beginner-oriented PoliticalWorldAPI runtime baseline guide, detailed research pages, case studies, AI boundary rules and updated landing pages.
- Added methodology rules learned from failed harness assumptions: persist proof state across restart, re-query live DTO/state, treat cleanup as part of the experiment, and never promote SKIP branches.

## 0.1.9 — World Isolation Verified
- Promoted WBML-0002 from Experimental to runtime Verified for the exact WorldBox 0.51.2 build 719 / NML 1.2.0.1 / PoliticalWorldAPI 1.14.0 stack.
- Added a dedicated World Isolation Probe research page and WBML-0002 case study in English and Russian.
- Recorded the corrected `0.0.2-fix1` strict A → B → A → B state machine and unique-run-token methodology.
- Documented the rejected false-positive harness run as a testing-methodology lesson rather than evidence.
- Added sanitized WBML-0002 runtime evidence.
- Updated addon-private data docs, persistence AI rules and `llms.txt` so cross-world isolation is no longer listed as wholly unverified.
- Kept party-private persistence/isolation, full-restart isolation, language-switch float behavior, runtime legacy migration and future versions explicitly outside the verified scope.
- Updated Research and Case Studies landing pages and added WBML-0002 to both home pages.

## 0.1.8 — First Lab-Verified Result
- Promoted PoliticalWorldAPI kingdom typed-data persistence from Experimental to runtime Verified for WorldBox 0.51.2 build 719 / NML 1.2.0.1 / API 1.14.0.
- Added WBML-0001 case study.
- Recorded full-process restart evidence for int, Unicode string, bool, float, addon-private tag and shared tag.
- Updated the Addon Data Save/Load Probe from planned research to a completed Verified result.
- Added a sanitized evidence excerpt without local paths or account identifiers.
- Updated AI persistence rules and `llms.txt` with strict evidence boundaries.
- Added WBML-0001 to both home pages.
- Kept party-private persistence, cross-world isolation, language-switch behavior and legacy runtime migration explicitly unverified.

## 0.1.7 — Project Support Links
- Added a dedicated English/Russian Support page.
- Added optional DonationAlerts and DALink support buttons to both home pages.
- Added a Project → Support sidebar entry.
- Added support links to the GitHub README.
- Kept documentation explicitly free/open with no paid documentation tier.
- Added responsive styling for the support block.

## 0.1.6 — Data Storage, Addon-Private State & Migrations
- Added source-backed PoliticalWorldAPI addon-private kingdom data reference.
- Documented int/string storage, bool→int representation and invariant round-trip float→string representation.
- Documented collision-safe v2 UTF-8 hex addon-data keys.
- Added case study for lazy API 1.1 → v2 copy-forward migration.
- Documented that legacy values are kept after migration rather than deleted.
- Added shared-vs-private kingdom tag guide.
- Documented private tag storage model and shared legacy tag key.
- Added typed addon-state architecture guide.
- Added party-private int/string/bool/float API reference.
- Added stable-ID and migration guide based on the real Political World identity transition.
- Added a detailed Addon Data Save/Load Probe plan without falsely marking persistence as runtime-verified.
- Added AI persistence/migration safety rules.
- Expanded `llms.txt` with storage layout, migration and verification-status facts.
- Added Russian equivalents for every new page.

## 0.1.5 — Localization, Registration & API Versioning
- Added source-backed PoliticalWorldAPI addon registration reference.
- Documented addon ID validation, ownership rules and stable-ID compatibility concerns.
- Added addon localization fallback guide with exact resolution order.
- Added localization ownership/collision case study and `PWDIAG190`.
- Added API versioning and capability-check guide.
- Documented `IsCompatible` as a minimum-contract check rather than a current-version declaration.
- Documented capability discovery and O(1) cached lookup design.
- Added batch content registration guide with partial-success semantics.
- Added Political World API evolution research notes.
- Added AI rules for choosing minimum API versions and optional capabilities.
- Added case study on readable addon content without complete localization.
- Expanded `llms.txt` with registration, localization, versioning, capabilities and batch-registration facts.
- Added Russian equivalents for every new page.

## 0.1.4 — Public API, Event Bus & Diagnostics
- Added a source-backed PoliticalWorldAPI Event Bus reference.
- Added Event Bus failure-containment case study.
- Added addon diagnostics/supportability guide.
- Added event-driven addon vs permanent polling guide.
- Added PoliticalWorldAPI public-boundary architecture research.
- Added AI rules for respecting parent-mod public API boundaries.
- Documented subscriber snapshots, payload cloning, callback isolation and recursive-dispatch protection.
- Documented Rare Political Event shared scheduling and broken-handler cooldown behavior.
- Expanded `llms.txt` with Event Bus, diagnostics, rare-event and boundary rules.
- Added Russian equivalents for every new page.

## 0.1.3 — Political World Source Archaeology
- Added a source-backed Political World module map.
- Added a guide to staggering heavy simulation systems across frames.
- Added a defensive/version-resilient Harmony patch discovery guide.
- Added a `Kingdom.data` custom-value helper guide with explicit save/load verification limits.
- Added AI source-of-truth and version-drift rules.
- Added a Political World case study showing stale AI docs versus source and newer runtime evidence.
- Updated `llms.txt` with snapshot provenance and strict version-scope rules.
- Added Russian equivalents for all new documentation pages.

## 0.1.2 — Political World Archaeology
- Added Political World government initialization recursion case study.
- Added StackOverflow recursive-initialization troubleshooting guide.
- Added Quiet Feed / event-spam case study.
- Added simulation-vs-notifications design guide.
- Added Political World research inventory.
- Updated AI-facing `llms.txt`.
- Added Russian translations for all new documentation pages.

## 0.1.1 — First verified research pages
- Added documentation reliability/status system.
- Added `WorldTile.Height` API entry.
- Added TerraForge safe UI cloning case study.
- Added all-ocean custom generation troubleshooting.
- Added `WorldTile.health` failed-approach graveyard entry.
- Added AI verification rules.
- Expanded `llms.txt`.

## 0.1.0 — Initial site foundation
- Added Astro + Starlight documentation site.
- Added English and Russian roots.
- Added GitHub Pages deployment workflow.
- Added initial navigation and project structure.
