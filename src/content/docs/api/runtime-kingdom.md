---
title: Kingdom runtime reference
description: Verified Kingdom read signatures, reversible counters and bounded zero-city registration evidence.
---

Evidence scope: WorldBox 0.51.2 build 719 / NML 1.2.0.1.

## Zero-argument reads — owner `KingdomManager.dict{value}`

| Signature | Access | Sample | Stability |
|---|---|---|---|
| `countUnits()->Int32` | public | `14468` | same |
| `getPopulationTotal()->Int32` | public | `14468` | same |
| `getCulture()->Culture` | public | reference | same |
| `getLanguage()->Language` | public | reference | same |
| `getReligion()->Religion` | public | reference | same |
| `getSpecies()->String` | public | `human` | same |
| `getTaxRateLocal()->Single` | public | `0.5` | same |

There were no Kingdom parameterized calls promoted to `VERIFIED` in the canonical 0.4 run. Do not invent that surface from method names alone.

## Reversible KingdomData — 5 records

`total_kings`, `renown`, `total_births`, `total_deaths`, `total_kills` are `VERIFIED-REVERSIBLE` under the 0.5 transaction contract.

## Zero-city lifecycle window

Canonical 0.6 fix5 used only natural `City.destroyCity()` calls. After the initial victim city, the Kingdom had five remaining cities; the harness destroyed all five and verified owner cleanup each time before observing Kingdom:

```text
Kingdom.cities: 5 → 0
KingdomManager F:dict: 6 → 6
registry key: still present
observation: 120 frames
status: VERIFIED-EMPTY-REGISTERED-WINDOW
control kingdom: alive
engine/game exceptions: 0
```

Do not interpret this as permanent empty-Kingdom persistence. It proves a bounded non-terminal window and, importantly, disproves the assumption that “last city gone” means “Kingdom object immediately gone”.

[Quick Kingdom](../../quick/kingdoms/) · [Safe mutations](../runtime-safe-mutations/) · [Lifecycle](../runtime-entity-lifecycle/) · [WBML 0.6](../../research/wbml-0600-entity-lifecycle-atlas/)
