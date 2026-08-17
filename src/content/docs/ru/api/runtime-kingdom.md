---
title: Kingdom runtime reference
description: Verified Kingdom read signatures, reversible counters и bounded zero-city registration evidence.
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

В canonical 0.4 ни один Kingdom parameterized call не был promoted to `VERIFIED`. Нельзя выдумывать такую поверхность из names.

## Reversible KingdomData — 5 records

`total_kings`, `renown`, `total_births`, `total_deaths`, `total_kills` — `VERIFIED-REVERSIBLE` по contract 0.5.

## Zero-city lifecycle window

Canonical 0.6 fix5 использовал только natural `City.destroyCity()`. После initial victim city у Kingdom оставалось пять городов; harness удалил все пять и проверял cleanup каждого перед observation:

```text
Kingdom.cities: 5 → 0
KingdomManager F:dict: 6 → 6
registry key: still present
observation: 120 frames
status: VERIFIED-EMPTY-REGISTERED-WINDOW
control kingdom: alive
engine/game exceptions: 0
```

Это не permanent persistence. Доказан bounded non-terminal window и опровергнут assumption «последний city gone → Kingdom object мгновенно gone».

[Quick Kingdom](../../quick/kingdoms/) · [Safe mutations](../runtime-safe-mutations/) · [Lifecycle](../runtime-entity-lifecycle/) · [WBML 0.6](../../research/wbml-0600-entity-lifecycle-atlas/)
