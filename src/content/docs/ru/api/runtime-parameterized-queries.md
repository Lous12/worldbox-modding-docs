---
title: Parameterized Query Atlas
description: Canonical WBML 0.4.0 argument provenance, invocation results, unresolved calls и смысл OBSERVED-THREW.
---

Canonical probe: **`0.4.0-fix2`**, run `7d17ef55149e`, JSON schema 3.

## Coverage

| Метрика | Value |
|---|---:|
| Methods scanned | 18,625 |
| Parameterized non-void | 4,291 |
| Records | 1,803 |
| IL-safe | 473 |
| Owner resolved | 382 |
| Argument sets built | 326 |
| Argument unresolved | 56 |
| Observed arguments used | 284 |
| Synthetic arguments used | 187 |
| Weak observed values rejected | 223 |
| Collection keys observed | 1,280 |
| Collection elements observed | 586 |
| Invoked | 326 |
| `VERIFIED` | 315 |
| `OBSERVED-THREW` | 11 |
| Public Verified | 245 |
| Reflection Verified | 70 |
| Unsafe / stale invoked | 0 / 0 |

## Почему provenance критичен

Первый 0.4 показал: «реальное runtime значение правильного CLR type» всё равно может быть semantic nonsense. В building ID попадал nameplate ID, в sprite index — unrelated UI index, в spacing — zero из чужого field.

`fix1` улучшил semantic scoring, но всё ещё пропускал unrelated strings вроде цвета или player name для option/ID-like parameters. `fix2` стал canonical только после bounded dictionary-key/collection-element harvesting, сохранения лучшего provenance одинаковых values и rejection слабых generic ID matches.

### Canonical examples

```text
City.countBuildingsOfID("bonfire")
provenance: City.buildings_dict_id dictionary-key
result: 1
status: VERIFIED

City.getBuildingListOfType("type_bonfire")
provenance: City.buildings_dict_type dictionary-key
result: count=1
status: VERIFIED (internal/reflection)

City.getSubspeciesId("human")
provenance: City._species dictionary-key
result: 2
status: VERIFIED

ZoneCalculator.getZoneByID(0)
provenance: ZoneCalculator._zones_dict_id dictionary-key
result: TileZone reference
status: VERIFIED

ArchitectureAsset.getBuildingID("order_docks_0")
provenance: styled_building_orders collection-element
result: fishing_docks_civ_unicorn
status: VERIFIED
```

## `OBSERVED-THREW` специально узкий

11 exact calls бросили exception в canonical run. Например, `PlayerConfig.getOptionInt("world_law_spread_trees")` дал `KeyNotFoundException`, а `TileSprites.getVariation(1)` — `ArgumentOutOfRangeException`.

Правильное утверждение:

> На этом exported owner и exact argument set invocation бросил записанный exception.

Это **не** «метод сломан».

Machine data: `/worldbox-modding-docs/data/wbml/0400-parameterized-query-atlas.json`.

[Quick City](../../quick/cities/) · [Quick Actor](../../quick/actors/) · [WBML 0.4](../../research/wbml-0400-parameterized-query-atlas/)
