---
title: Kingdom — быстрый справочник
description: Проверенные Kingdom reads, обратимые counters и zero-city registered lifecycle window.
---

**Статус:** Verified zero-arg reads + пять обратимых `KingdomData` scalar-транзакций. Для lifecycle есть важный bounded non-terminal результат.

WBML 0.3.0 подтвердил на `KingdomManager.dict{value}`:

```csharp
int units = kingdom.countUnits();
int population = kingdom.getPopulationTotal();
Culture culture = kingdom.getCulture();
Language language = kingdom.getLanguage();
Religion religion = kingdom.getReligion();
string species = kingdom.getSpecies();
float localTax = kingdom.getTaxRateLocal();
```

У sample были `14468` population/countUnits, `"human"` species и `0.5` local tax. Это наблюдавшиеся значения, а не константы игры.

WBML 0.5.0 проверил обратимые `KingdomData`: `total_kings`, `renown`, `total_births`, `total_deaths`, `total_kills`.

### Критичный lifecycle caveat

WBML 0.6.0-fix5 уничтожил все пять оставшихся городов через natural `City.destroyCity()` и доказал, что `Kingdom.cities` дошёл до нуля. Тот же Kingdom оставался в закреплённом `KingdomManager F:dict` ещё **120 observation frames**, без game exception и с живым независимым control kingdom.

Статус: `VERIFIED-EMPTY-REGISTERED-WINDOW`.

Это значит **«не обязан исчезать немедленно»**, а не «пустое королевство хранится навсегда». Нельзя насильно подгонять результат через generic manager removal/`Dispose()` — такой отвергнутый harness уже ломал runtime.

[Полные детали Kingdom](../../api/runtime-kingdom/) · [Lifecycle](../../api/runtime-entity-lifecycle/) · [WBML 0.6](../../research/wbml-0600-entity-lifecycle-atlas/)
