---
title: Kingdom — Quick Docs
description: Verified Kingdom reads, reversible counters and the zero-city registered lifecycle window.
---

**Status:** Verified zero-argument reads + five reversible `KingdomData` scalar transactions. Lifecycle has an important bounded non-terminal result.

WBML 0.3.0 verified examples on `KingdomManager.dict{value}`:

```csharp
int units = kingdom.countUnits();
int population = kingdom.getPopulationTotal();
Culture culture = kingdom.getCulture();
Language language = kingdom.getLanguage();
Religion religion = kingdom.getReligion();
string species = kingdom.getSpecies();
float localTax = kingdom.getTaxRateLocal();
```

The tested sample returned `14468` for population/countUnits, `"human"` for species and `0.5` for local tax. These values are sample observations, not constants.

WBML 0.5.0 verified reversible `KingdomData` transactions for `total_kings`, `renown`, `total_births`, `total_deaths`, `total_kills`.

### Critical lifecycle caveat

WBML 0.6.0-fix5 destroyed all five remaining cities through natural `City.destroyCity()` calls and proved the kingdom's city collection reached zero. The same Kingdom still remained in pinned `KingdomManager F:dict` for **120 observation frames**, with no game exception and an independent control kingdom still alive.

Status: `VERIFIED-EMPTY-REGISTERED-WINDOW`.

This means **“not guaranteed to disappear immediately”**, not “empty kingdoms persist forever”. Do not manually call generic manager removal/`Dispose()` to force the expected shape; that rejected approach corrupted the runtime in an earlier harness.

[Full Kingdom details](../../api/runtime-kingdom/) · [Lifecycle details](../../api/runtime-entity-lifecycle/) · [WBML 0.6](../../research/wbml-0600-entity-lifecycle-atlas/)
