# Changelog

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
