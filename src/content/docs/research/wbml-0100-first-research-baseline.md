---
title: WBML 0.1.0 — First Research Baseline
description: Complete evidence ledger and knowledge classification accumulated by WorldBox Modding Lab from 0.0.1 through 0.0.30.
---

<span class="doc-status">✅ Baseline audit PASS: 19 / 0 / 0</span>
<span class="doc-status">WorldBox 0.51.2 build 719</span>
<span class="doc-status">NML 1.2.0.1</span>
<span class="doc-status">ResearchEngine v2.1.1</span>


This page is the **first consolidated research baseline** for the Lab. It does not pretend that WorldBox is fully documented. It records what we can prove, what we only observed, which assumptions were disproved, which patterns are unsafe, and what remains unknown.

The machine-readable catalog is published as [`/data/wbml-0100-baseline.json`](/worldbox-modding-docs/data/wbml-0100-baseline.json).

## Tested stack

```text
WorldBox:            0.51.2 build 719
Unity:               2022.3.60f1
NeoModLoader:        1.2.0.1
ResearchEngine:      v2.1.1
Political World:     1.7.0
PoliticalWorldAPI:   1.14.0
Cross-mod baseline:  Political World + Custom Worldsize + Scenario Tools + WBML
```

## Evidence policy

`VERIFIED` means reproduced in the stated baseline. `OBSERVED` is real runtime evidence that is not promoted to a universal contract. `FAILED ASSUMPTION` is negative knowledge: a plausible test rule that runtime evidence disproved. `UNSAFE` means a pattern should not be used casually. `UNKNOWN` is intentionally unresolved.

## Suite ledger

| Version | Research block | Verdict | Final evidence / boundary |
| --- | --- | --- | --- |
| `0.0.1` | Addon Data Save/Load Probe | **CLOSED PASS** | existing evidence |
| `0.0.2` | World Isolation Probe | **OPEN TAIL** | final return-to-World-B identity/signature tail remains unresolved in 0.1.0 baseline |
| `0.0.3` | Persistence & Party Lifecycle | **PARTIAL PASS** | 119 / 0 / 1 |
| `0.0.4` | Event Bus | **PASS** | 68 / 0 / 0 |
| `0.0.5` | Actions / Conditions / Effects | **PARTIAL PASS** | 90 / 0 / 3 |
| `0.0.6-fix1` | Automated Lifecycle / Regression Runner | **PARTIAL PASS** | 36 / 0 / 2 |
| `0.0.7` | Reflection + Harmony AccessTools | **PASS** | 54 / 0 / 0 |
| `0.0.8` | Localization / LM | **PASS** | 51 / 0 / 0 |
| `0.0.9-fix3` | UI Infrastructure | **AUTOMATED PASS** | 126 / 0 / 0; manual Escape gate pending |
| `0.0.10` | Diagnostics / Logging / Reports | **PASS** | 33 / 0 / 0 |
| `0.0.11` | GameObject / Transform | **PASS** | 46 / 0 / 0 |
| `0.0.12-fix1` | AssetManager / AssetLibrary / Registry / Lookup | **PASS** | 33 / 0 / 0 |
| `0.0.13-fix1` | Ownership / Parent–Child Lifecycle | **PASS** | 46 / 0 / 0 |
| `0.0.14` | Snapshot / Mutate / Restore / Transactions | **PASS** | 49 / 0 / 0 |
| `0.0.15` | Unity Fake Null / Stale References / Destroy | **PASS** | 37 / 0 / 0 |
| `0.0.16` | Kingdom API Basics | **PASS** | 24 / 0 / 0 |
| `0.0.17` | City API | **PASS** | 29 / 0 / 0 |
| `0.0.18-fix1` | Actor API | **PASS** | 35 / 0 / 0 |
| `0.0.19` | Kingdom↔City↔Actor Relationships / Liveness | **PASS** | 26 / 0 / 0 |
| `0.0.20` | Destruction & Ownership Lifecycle | **PASS** | 35 / 0 / 0 |
| `0.0.21` | WorldTile API | **PASS** | 25 / 0 / 0 |
| `0.0.22` | Terrain / Biome API | **PASS** | 30 / 0 / 0 |
| `0.0.23` | World State / Map Services | **PASS** | 28 / 0 / 0 |
| `0.0.24-fix6` | Worldgen Pipeline | **PASS** | 36 / 0 / 0 |
| `0.0.25-fix1` | Worldgen Edge Cases | **PASS** | 44 / 0 / 0 |
| `0.0.26` | Performance | **PASS** | 37 / 0 / 0 |
| `0.0.27` | Mass Stress | **PASS** | 44 / 0 / 0 |
| `0.0.28-fix1` | Cross-Mod Conflicts | **PASS** | 45 / 0 / 0 |
| `0.0.29-fix1` | Save/Reload Stale-Ref Torture | **PASS** | 26 / 0 / 0 |
| `0.0.30` | Full Integration Torture | **PASS** | 42 / 0 / 0 |
| `0.1.0` | First Research Baseline Audit | **PASS** | 19 / 0 / 0 |

## Verified facts

- **`addon-data-persistence`** — Addon Data save/load path worked in the tested runtime. *(evidence: 0.0.1)*
- **`event-bus`** — Political World event bus suite closed without failures. *(evidence: 0.0.4)*
- **`actions-conditions-effects`** — Actions/Conditions/Effects core path is usable; unsafe/unsupported branches remain separately classified. *(evidence: 0.0.5)*
- **`automated-lifecycle-runner`** — Automated lifecycle/regression runner is usable; unsupported branches remain separately classified. *(evidence: 0.0.6)*
- **`reflection-access-tools`** — Reflection + Harmony AccessTools suite closed PASS. *(evidence: 0.0.7)*
- **`localization-lm`** — Localization / LM suite closed PASS. *(evidence: 0.0.8)*
- **`ui-automation`** — Automated UI infrastructure checks closed PASS. *(evidence: 0.0.9-fix3)*
- **`diagnostics-reports`** — Diagnostics/logging/report generation closed PASS. *(evidence: 0.0.10)*
- **`gameobject-transform`** — GameObject / Transform API basics closed PASS. *(evidence: 0.0.11)*
- **`asset-registry-lookup`** — AssetManager / AssetLibrary / registry / lookup suite closed PASS. *(evidence: 0.0.12)*
- **`ownership-parent-child`** — Ownership / parent-child lifecycle closed PASS. *(evidence: 0.0.13)*
- **`snapshot-mutate-restore`** — Snapshot / mutate / restore / transaction path closed PASS, including exception restoration. *(evidence: 0.0.14)*
- **`unity-fake-null`** — Unity fake-null / stale-reference / destroy semantics were empirically characterized. *(evidence: 0.0.15)*
- **`kingdom-api`** — Kingdom API basics closed PASS. *(evidence: 0.0.16)*
- **`city-api`** — City API suite closed PASS. *(evidence: 0.0.17)*
- **`actor-api`** — Actor API suite closed PASS. *(evidence: 0.0.18-fix1)*
- **`entity-relationships`** — Kingdom↔City↔Actor relationship/liveness checks closed PASS. *(evidence: 0.0.19)*
- **`destruction-ownership`** — Destruction & ownership lifecycle checks closed PASS. *(evidence: 0.0.20)*
- **`worldtile-api`** — WorldTile API suite closed PASS. *(evidence: 0.0.21)*
- **`terrain-biome-route`** — Terrain resolves through TileTypeBase; TileTypeBase exposes biome_asset:BiomeAsset. *(evidence: 0.0.22)*
- **`map-services`** — WorldTile resolves TileZone, MapChunk and MapRegion; managers/services were stable in the tested map. *(evidence: 0.0.23)*
- **`generate-new-map`** — MapBox.generateNewMap() performs a real world-generation lifecycle. *(evidence: 0.0.24-fix6)*
- **`worldgen-finish-signal`** — MapBox.finishMakingWorld() is a working completion signal for generateNewMap() in the tested baseline. *(evidence: 0.0.24-fix6)*
- **`worldgen-reuse-valid`** — Same-size worldgen can legally reuse tiles_map and WorldTile objects; identity replacement is not required. *(evidence: 0.0.24-fix6)*
- **`triple-worldgen`** — Three sequential generateNewMap() cycles in one session completed with stable live state. *(evidence: 0.0.25-fix1)*
- **`performance-read-paths`** — Read-only performance suite completed without state drift. *(evidence: 0.0.26)*
- **`mass-stress`** — 524,288 WorldTile reads, 250,000 coordinate lookups and 100,000 neighbour checks completed without corruption. *(evidence: 0.0.27)*
- **`cross-mod-coexistence`** — Political World + Custom Worldsize + Scenario Tools coexisted with core lookups and Harmony state intact. *(evidence: 0.0.28-fix1)*
- **`save-reload`** — SaveManager.saveToCurrentPath() and SaveManager.loadWorld() safely executed in the tested baseline. *(evidence: 0.0.29-fix1)*
- **`reload-reuse-safety`** — After real reload, old WorldTile/collections/services/managers were reused in the tested run and old tile reads were safe 100/100. *(evidence: 0.0.29-fix1)*
- **`full-integration-torture`** — Save→reload→two worldgen cycles→262,144 tile reads→100,000 GetTile comparisons completed with all gates PASS. *(evidence: 0.0.30)*
## Observed behavior

- **`game-language-library`** — GameLanguageLibrary observed count=40 with sample id=en. *(evidence: 0.0.12)*
- **`default-map-shape`** — Tested default map contained 65,536 tiles with exact 256×256 coordinates. *(evidence: 0.0.23)*
- **`height-ranges-vary`** — WorldTile height ranges varied across generated worlds and are world-state dependent. *(evidence: 0.0.22/0.0.24)*
- **`height-load-normalization`** — WorldTile.Height can normalize/recompute during load; exact byte-for-byte equality is not a reload contract. *(evidence: 0.0.29)*
- **`on-world-loaded-not-required`** — MapBox.on_world_loaded did not reliably fire for generateNewMap in the investigated path; finishMakingWorld was more useful. *(evidence: 0.0.24-fix5/fix6)*
- **`lazy-framework-assemblies`** — Reflection/type inspection lazily loaded System.Net.Http, System.ServiceModel.Internals and System.Transactions. *(evidence: 0.0.28-fix1)*
- **`pw-harmony-owner`** — The tested PW startWar Harmony owner id was fluttershy.politicalworld.politics.v1392. *(evidence: 0.0.28/0.0.30)*
- **`save-load-signatures`** — saveToCurrentPath() and loadWorld() no-args signatures are version-bound implementation observations, not guaranteed public API. *(evidence: 0.0.29)*
- **`tile-reuse-implementation`** — WorldTile/array/service/manager reuse across lifecycle transitions is an implementation behavior observed on WorldBox 0.51.2. *(evidence: 0.0.24–0.0.30)*
- **`performance-numbers`** — Measured timings/ops-per-second are hardware/runtime observations, not pass/fail contracts. *(evidence: 0.0.26)*
## Rejected assumptions

- **`require-tile-ref-replacement`** — Rejected: worldgen completion must not require the first WorldTile reference to change. *(evidence: 0.0.24-fix2–fix5)*
- **`require-old-tile-removal`** — Rejected: an old WorldTile must not be required to disappear from the current map after same-size worldgen. *(evidence: 0.0.24)*
- **`exact-height-reload-proof`** — Rejected: exact restoration of WorldTile.Height must not be the sole proof of reload. *(evidence: 0.0.29)*
- **`raw-assembly-count-stability`** — Rejected: total AppDomain assembly count must not be required to remain constant across reflection inspection. *(evidence: 0.0.28)*
- **`scene-owned-coroutine-survival`** — Rejected: a coroutine hosted on a world-owned object cannot be assumed to survive full world replacement. *(evidence: 0.0.24-fix1)*
- **`worldloaded-callback-authority`** — Rejected: on_world_loaded callback alone is not an authoritative generateNewMap completion condition in this runtime. *(evidence: 0.0.24-fix5/fix6)*
## Unsafe patterns

- **`full-map-scan-per-frame`** — Unsafe/performance-hostile: scanning all 65,536 tiles in every wait-loop frame caused severe FPS degradation. *(evidence: 0.0.24 original)*
- **`guess-save-load-args`** — Unsafe: never guess required SaveManager/load/save arguments or paths; only invoke proven safe signatures. *(evidence: 0.0.29+)*
- **`destructive-tests-production-world`** — Unsafe: worldgen/save-reload/destruction suites must use disposable worlds. *(evidence: 0.0.20/0.0.24/0.0.29/0.0.30)*
- **`plain-null-unity-liveness`** — Unsafe pattern: plain object/null assumptions are insufficient for UnityEngine.Object liveness because fake-null semantics exist. *(evidence: 0.0.15)*
## Open questions

- **`world-isolation-return-tail`** — Final return-to-World-B identity/signature tail from World Isolation Probe remains unresolved; A/B/A is not to be rerun without a narrow reason. *(evidence: 0.0.2)*
- **`persistence-unsafe-branch`** — Optional unsafe branch of Persistence & Lifecycle Suite remains intentionally unexecuted. *(evidence: 0.0.3)*
- **`ui-escape-manual`** — UI Infrastructure automated checks are green; manual Escape behavior remains pending. *(evidence: 0.0.9)*
- **`entity-stale-reuse-reload`** — Kingdom/City/Actor stale-vs-reuse across save/reload remains unobserved because tested registries were empty. *(evidence: 0.0.29/0.0.30)*
- **`different-version-behavior`** — Behavior under other WorldBox/NML/PW versions is unknown until a new baseline diff is run. *(evidence: baseline policy)*
- **`nondefault-worldsize-lifecycle`** — Full save/reload + repeated worldgen lifecycle on non-default Custom Worldsize dimensions remains unverified. *(evidence: future)*

## Baseline rules for modders and AI

1. Do not require `WorldTile` reference replacement to prove worldgen or reload completion.
2. Use a lifecycle signal plus live collections plus a short stability window.
3. Never run a rich 65,536-tile reflection scan every frame while waiting.
4. Do not guess `SaveManager` paths, slots or arguments.
5. Treat Unity fake-null separately from ordinary CLR `null`.
6. Preserve version-bound observations as observations; do not turn them into universal contracts.
7. Keep `SKIP` and `UNKNOWN` visible when prerequisites are absent.
8. Re-run or diff closed research when the runtime baseline changes, not merely to reconfirm a green suite.

## Open tails carried into the next research cycle

- WBML-0002 final return-to-World-B identity/signature tail;
- WBML-0003 optional unsafe branch;
- WBML-0009 manual Escape gate;
- Kingdom/City/Actor stale-vs-reuse across save/reload with non-empty registries;
- behavior on other WorldBox/NML versions until a baseline diff is run;
- save/reload + repeated worldgen on non-default Custom Worldsize dimensions.

## Evidence

- [`WBML 0.1.0 baseline audit`](/worldbox-modding-docs/evidence/wbml-0100-result.txt)
- [`Rejected harness assumptions`](/worldbox-modding-docs/evidence/wbml-rejected-harness-assumptions.txt)
- [`Raw baseline catalog`](/worldbox-modding-docs/data/wbml-0100-baseline.json)
