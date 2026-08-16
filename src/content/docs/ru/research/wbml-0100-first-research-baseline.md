---
title: WBML 0.1.0 — First Research Baseline
description: Полный evidence-ledger и классификация знаний WorldBox Modding Lab от 0.0.1 до 0.0.30.
---

<span class="doc-status">✅ Baseline audit PASS: 19 / 0 / 0</span>
<span class="doc-status">WorldBox 0.51.2 build 719</span>
<span class="doc-status">NML 1.2.0.1</span>
<span class="doc-status">ResearchEngine v2.1.1</span>


Это **первая сводная база исследований** Lab. Она не заявляет, что WorldBox уже исследован полностью. Здесь отдельно записано: что доказано, что только наблюдалось, какие предположения оказались ложными, какие паттерны опасны и что остаётся неизвестным.

Машиночитаемый каталог: [`/data/wbml-0100-baseline.json`](/worldbox-modding-docs/data/wbml-0100-baseline.json).

## Проверенная среда

```text
WorldBox:            0.51.2 build 719
Unity:               2022.3.60f1
NeoModLoader:        1.2.0.1
ResearchEngine:      v2.1.1
Political World:     1.7.0
PoliticalWorldAPI:   1.14.0
Cross-mod baseline:  Political World + Custom Worldsize + Scenario Tools + WBML
```

## Ledger suite

| Версия | Блок | Verdict | Финальный evidence / boundary |
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

## Verified — подтверждённые факты

- **`addon-data-persistence`** — Addon Data save/load отработал в проверенном runtime. *(evidence: 0.0.1)*
- **`event-bus`** — Event Bus Political World закрыт без FAIL. *(evidence: 0.0.4)*
- **`actions-conditions-effects`** — Основной путь Actions / Conditions / Effects пригоден; опасные/неподдержанные ветки классифицируются отдельно. *(evidence: 0.0.5)*
- **`automated-lifecycle-runner`** — Автоматический lifecycle/regression runner пригоден; неподдержанные ветки оставлены отдельно. *(evidence: 0.0.6)*
- **`reflection-access-tools`** — Reflection + Harmony AccessTools закрыты PASS. *(evidence: 0.0.7)*
- **`localization-lm`** — Localization / LM закрыты PASS. *(evidence: 0.0.8)*
- **`ui-automation`** — Автоматизированная UI-инфраструктура закрыта PASS. *(evidence: 0.0.9-fix3)*
- **`diagnostics-reports`** — Diagnostics/logging/report generation закрыты PASS. *(evidence: 0.0.10)*
- **`gameobject-transform`** — Основы GameObject / Transform закрыты PASS. *(evidence: 0.0.11)*
- **`asset-registry-lookup`** — AssetManager / AssetLibrary / registry / lookup закрыты PASS. *(evidence: 0.0.12)*
- **`ownership-parent-child`** — Ownership / parent-child lifecycle закрыт PASS. *(evidence: 0.0.13)*
- **`snapshot-mutate-restore`** — Snapshot / mutate / restore / transaction path закрыт PASS, включая rollback после exception. *(evidence: 0.0.14)*
- **`unity-fake-null`** — Unity fake-null / stale-reference / destroy semantics эмпирически охарактеризованы. *(evidence: 0.0.15)*
- **`kingdom-api`** — Основы Kingdom API закрыты PASS. *(evidence: 0.0.16)*
- **`city-api`** — City API закрыт PASS. *(evidence: 0.0.17)*
- **`actor-api`** — Actor API закрыт PASS. *(evidence: 0.0.18-fix1)*
- **`entity-relationships`** — Связи Kingdom↔City↔Actor и liveness закрыты PASS. *(evidence: 0.0.19)*
- **`destruction-ownership`** — Destruction & ownership lifecycle закрыт PASS. *(evidence: 0.0.20)*
- **`worldtile-api`** — WorldTile API закрыт PASS. *(evidence: 0.0.21)*
- **`terrain-biome-route`** — Terrain идёт через TileTypeBase; TileTypeBase содержит biome_asset:BiomeAsset. *(evidence: 0.0.22)*
- **`map-services`** — WorldTile разрешается в TileZone, MapChunk и MapRegion; managers/services стабильны в тестовой карте. *(evidence: 0.0.23)*
- **`generate-new-map`** — MapBox.generateNewMap() запускает реальный lifecycle генерации мира. *(evidence: 0.0.24-fix6)*
- **`worldgen-finish-signal`** — MapBox.finishMakingWorld() работает как completion signal для generateNewMap() на baseline. *(evidence: 0.0.24-fix6)*
- **`worldgen-reuse-valid`** — Same-size worldgen может переиспользовать tiles_map и WorldTile; смена identity не обязательна. *(evidence: 0.0.24-fix6)*
- **`triple-worldgen`** — Три generateNewMap() подряд завершились со стабильным live state. *(evidence: 0.0.25-fix1)*
- **`performance-read-paths`** — Read-only performance suite завершился без drift состояния. *(evidence: 0.0.26)*
- **`mass-stress`** — 524 288 WorldTile reads, 250 000 coordinate lookups и 100 000 neighbour checks прошли без повреждения состояния. *(evidence: 0.0.27)*
- **`cross-mod-coexistence`** — Political World + Custom Worldsize + Scenario Tools сосуществовали с целыми core lookups и Harmony state. *(evidence: 0.0.28-fix1)*
- **`save-reload`** — SaveManager.saveToCurrentPath() и SaveManager.loadWorld() безопасно выполнились на baseline. *(evidence: 0.0.29-fix1)*
- **`reload-reuse-safety`** — После реального reload старые WorldTile/collections/services/managers были переиспользованы; old tile reads 100/100 safe. *(evidence: 0.0.29-fix1)*
- **`full-integration-torture`** — Save→reload→2 worldgen→262 144 tile reads→100 000 GetTile comparisons прошли с PASS всех gates. *(evidence: 0.0.30)*
## Observed — наблюдаемое поведение

- **`game-language-library`** — GameLanguageLibrary наблюдался с count=40 и sample id=en. *(evidence: 0.0.12)*
- **`default-map-shape`** — Тестовая default map содержала 65 536 tiles с точными координатами 256×256. *(evidence: 0.0.23)*
- **`height-ranges-vary`** — Диапазоны WorldTile height менялись между мирами и зависят от world state. *(evidence: 0.0.22/0.0.24)*
- **`height-load-normalization`** — WorldTile.Height может normalize/recompute во время load; byte-for-byte equality не является reload contract. *(evidence: 0.0.29)*
- **`on-world-loaded-not-required`** — MapBox.on_world_loaded не срабатывал надёжно для исследованного generateNewMap path; finishMakingWorld оказался полезнее. *(evidence: 0.0.24-fix5/fix6)*
- **`lazy-framework-assemblies`** — Reflection/type inspection лениво загрузил System.Net.Http, System.ServiceModel.Internals и System.Transactions. *(evidence: 0.0.28-fix1)*
- **`pw-harmony-owner`** — Наблюдаемый PW Harmony owner для startWar: fluttershy.politicalworld.politics.v1392. *(evidence: 0.0.28/0.0.30)*
- **`save-load-signatures`** — No-args signatures saveToCurrentPath() и loadWorld() — version-bound implementation observations, не гарантированный public API. *(evidence: 0.0.29)*
- **`tile-reuse-implementation`** — Reuse WorldTile/arrays/services/managers через lifecycle transitions — наблюдаемое поведение реализации WorldBox 0.51.2. *(evidence: 0.0.24–0.0.30)*
- **`performance-numbers`** — Измеренные timings/ops-per-second — hardware/runtime observations, не PASS/FAIL contracts. *(evidence: 0.0.26)*
## Failed assumption — отброшенные предположения

- **`require-tile-ref-replacement`** — Отброшено: worldgen completion нельзя связывать с обязательной сменой первого WorldTile ref. *(evidence: 0.0.24-fix2–fix5)*
- **`require-old-tile-removal`** — Отброшено: old WorldTile не обязан исчезать из current map после same-size worldgen. *(evidence: 0.0.24)*
- **`exact-height-reload-proof`** — Отброшено: точное восстановление WorldTile.Height не может быть единственным доказательством reload. *(evidence: 0.0.29)*
- **`raw-assembly-count-stability`** — Отброшено: total AppDomain assembly count не обязан оставаться постоянным во время reflection inspection. *(evidence: 0.0.28)*
- **`scene-owned-coroutine-survival`** — Отброшено: coroutine на world-owned object нельзя считать переживающей full world replacement. *(evidence: 0.0.24-fix1)*
- **`worldloaded-callback-authority`** — Отброшено: on_world_loaded callback сам по себе не authoritative generateNewMap completion condition. *(evidence: 0.0.24-fix5/fix6)*
## Unsafe — опасные паттерны

- **`full-map-scan-per-frame`** — Unsafe/performance-hostile: scan всех 65 536 tiles на каждом wait-loop frame вызвал сильную просадку FPS. *(evidence: 0.0.24 original)*
- **`guess-save-load-args`** — Unsafe: never guess required SaveManager/load/save arguments or paths; only invoke proven safe signatures. *(evidence: 0.0.29+)*
- **`destructive-tests-production-world`** — Unsafe: worldgen/save-reload/destruction suites must use disposable worlds. *(evidence: 0.0.20/0.0.24/0.0.29/0.0.30)*
- **`plain-null-unity-liveness`** — Unsafe pattern: plain object/null assumptions are insufficient for UnityEngine.Object liveness because fake-null semantics exist. *(evidence: 0.0.15)*
## Unknown — открытые вопросы

- **`world-isolation-return-tail`** — Final return-to-World-B identity/signature tail from World Isolation Probe remains unresolved; A/B/A is not to be rerun without a narrow reason. *(evidence: 0.0.2)*
- **`persistence-unsafe-branch`** — Optional unsafe branch of Persistence & Lifecycle Suite remains intentionally unexecuted. *(evidence: 0.0.3)*
- **`ui-escape-manual`** — UI Infrastructure automated checks are green; manual Escape behavior remains pending. *(evidence: 0.0.9)*
- **`entity-stale-reuse-reload`** — Kingdom/City/Actor stale-vs-reuse across save/reload remains unobserved because tested registries were empty. *(evidence: 0.0.29/0.0.30)*
- **`different-version-behavior`** — Behavior under other WorldBox/NML/PW versions is unknown until a new baseline diff is run. *(evidence: baseline policy)*
- **`nondefault-worldsize-lifecycle`** — Full save/reload + repeated worldgen lifecycle on non-default Custom Worldsize dimensions remains unverified. *(evidence: future)*

## Правила baseline

1. Нельзя требовать смену ссылки `WorldTile` как доказательство worldgen/reload.
2. Надёжнее lifecycle signal + live collections + короткое stability window.
3. Нельзя делать богатый reflection scan всех 65 536 тайлов каждый frame ожидания.
4. Нельзя угадывать пути, slots и arguments `SaveManager`.
5. Unity fake-null нельзя сводить к обычному CLR `null`.
6. Version-bound observations не превращаются в универсальный контракт.
7. `SKIP` и `UNKNOWN` остаются видимыми, если не хватает prerequisites.
8. Закрытые suite не повторяются без изменения baseline или узкого открытого вопроса.

## Открытые хвосты

- финальный return-to-World-B identity/signature tail WBML-0002;
- optional unsafe branch WBML-0003;
- manual Escape gate WBML-0009;
- Kingdom/City/Actor stale-vs-reuse через save/reload при непустых registries;
- другие версии WorldBox/NML до baseline diff;
- save/reload + repeated worldgen на non-default размерах Custom Worldsize.

## Evidence

- [`WBML 0.1.0 baseline audit`](/worldbox-modding-docs/evidence/wbml-0100-result.txt)
- [`Отброшенные harness assumptions`](/worldbox-modding-docs/evidence/wbml-rejected-harness-assumptions.txt)
- [`Raw baseline catalog`](/worldbox-modding-docs/data/wbml-0100-baseline.json)
