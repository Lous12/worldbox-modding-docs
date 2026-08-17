---
title: City runtime reference
description: Verified City reads, parameterized building/species queries, reversible CityData fields and destruction lifecycle.
---

Evidence scope: WorldBox 0.51.2 build 719 / NML 1.2.0.1.

## Zero-argument reads — owner `CityManager.dict{value}`

| Signature | Access | Sample | Stability |
|---|---|---|---|
| `countBuildings()->Int32` | public | `100` | same |
| `countWarriors()->Int32` | public | `188` | same |
| `countZones()->Int32` | public | `110` | same |
| `getArmy()->Army` | public | reference | same |
| `getCachedLoyalty()->Int32` | public | `195` | same |
| `getCulture()->Culture` | public | reference | same |
| `getLanguage()->Language` | public | reference | same |

These are one sample's values.

## Parameterized queries — semantic provenance

| Signature | Access | Argument provenance | Sample result |
|---|---|---|---|
| `countBuildingsOfID(String)->Int32` | public | `City.buildings_dict_id` key `bonfire` | `1` |
| `getBuildingListOfID(String)->List<Building>` | internal | same City dictionary key | count `1` |
| `getBuildingListOfType(String)->List<Building>` | internal | `City.buildings_dict_type` key `type_bonfire` | count `1` |
| `getSubspeciesId(String)->Int64` | public | `City._species` key `human` | `2` |

## Reversible CityData — 6 records

`total_food_consumed`, `total_leaders`, `renown`, `total_births`, `total_deaths`, `total_kills`.

## `destroyCity()` lifecycle

Canonical 0.6 fix5 pinned `CityManager F:dict` and owning `Kingdom F:cities`:

```text
manager count 32 → 31
owner city count 6 → 5
manager_removed = true
owner_removed = true
registry_removed = true
stale_reads_safe = 50
reintroduced = false
```

This is `VERIFIED-LIFECYCLE` for the tested natural path.

[Quick City](../../quick/cities/) · [Parameterized atlas](../runtime-parameterized-queries/) · [Safe mutations](../runtime-safe-mutations/) · [Lifecycle](../runtime-entity-lifecycle/)
