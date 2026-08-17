---
title: City — Quick Docs
description: Verified City queries, building/species lookups, reversible scalar fields and destruction lifecycle.
---

**Status:** Verified reads + parameterized lookups + verified `City.destroyCity()` lifecycle on the tested baseline.

Useful zero-arg examples from WBML 0.3.0:

```csharp
int buildings = city.countBuildings();
int warriors = city.countWarriors();
int zones = city.countZones();
Army army = city.getArmy();
int loyalty = city.getCachedLoyalty();
Culture culture = city.getCulture();
Language language = city.getLanguage();
```

Canonical owner source: `CityManager.dict{value}`.

Useful parameterized evidence from WBML 0.4.0-fix2:

```csharp
int bonfires = city.countBuildingsOfID("bonfire");          // observed result: 1
var byId = city.getBuildingListOfID("bonfire");             // internal, count=1
var byType = city.getBuildingListOfType("type_bonfire");    // internal, count=1
long humanSubspecies = city.getSubspeciesId("human");       // observed result: 2
```

The strings above came from the City's own dictionary keys, not from unrelated same-typed fields.

### Mutation and lifecycle

WBML 0.5.0 verified reversible scalar transactions for `CityData.total_food_consumed`, `total_leaders`, `renown`, `total_births`, `total_deaths`, `total_kills`.

WBML 0.6.0-fix5 verified `City.destroyCity()` against pinned `CityManager F:dict` + `Kingdom F:cities`: manager `32→31`, owner `6→5`, registry cleanup, 50/50 stale reads, no reintroduction.

[Full City details](../../api/runtime-city/) · [Parameterized queries](../../api/runtime-parameterized-queries/) · [Lifecycle evidence](../../research/wbml-0600-entity-lifecycle-atlas/)
