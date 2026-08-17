---
title: City — быстрый справочник
description: Проверенные City queries, building/species lookup, обратимые scalar fields и destruction lifecycle.
---

**Статус:** Verified reads + parameterized lookup + verified lifecycle `City.destroyCity()` на протестированном baseline.

Примеры WBML 0.3.0:

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

Parameterized evidence из 0.4.0-fix2:

```csharp
int bonfires = city.countBuildingsOfID("bonfire");          // observed result: 1
var byId = city.getBuildingListOfID("bonfire");             // internal, count=1
var byType = city.getBuildingListOfType("type_bonfire");    // internal, count=1
long humanSubspecies = city.getSubspeciesId("human");       // observed result: 2
```

Эти строки взяты из собственных dictionary keys города, а не из случайных полей того же типа.

### Mutation и lifecycle

WBML 0.5.0 проверил обратимые scalar-транзакции для `CityData.total_food_consumed`, `total_leaders`, `renown`, `total_births`, `total_deaths`, `total_kills`.

WBML 0.6.0-fix5 проверил `City.destroyCity()` через закреплённые `CityManager F:dict` + `Kingdom F:cities`: manager `32→31`, owner `6→5`, registry cleanup, 50/50 stale reads, без reintroduction.

[Полные детали City](../../api/runtime-city/) · [Parameterized queries](../../api/runtime-parameterized-queries/) · [Lifecycle evidence](../../research/wbml-0600-entity-lifecycle-atlas/)
