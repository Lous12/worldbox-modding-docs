# Changelog

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
