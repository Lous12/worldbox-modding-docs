---
title: Parameterized Query Atlas
description: Canonical WBML 0.4.0 argument provenance, invocation results, unresolved calls and OBSERVED-THREW semantics.
---

Canonical probe: **`0.4.0-fix2`**, run `7d17ef55149e`, JSON schema 3.

## Coverage

| Metric | Value |
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

## Why provenance matters

The first 0.4 run proved that a “real runtime value of the right CLR type” can still be semantically nonsense. It produced examples such as a nameplate ID used as a building ID, an unrelated UI index used for a sprite collection, and zero used where spacing had stronger semantics.

`fix1` improved semantic scoring but still admitted unrelated strings such as a color string or player name for option/ID-like parameters. `fix2` became canonical only after it harvested bounded dictionary keys and collection elements, retained better provenance for duplicate values, and rejected weak generic ID matches.

### Canonical examples

```text
City.countBuildingsOfID("bonfire")
argument provenance: City.buildings_dict_id dictionary-key
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

## `OBSERVED-THREW` is deliberately narrow

Eleven exact calls threw in the canonical run. For example, `PlayerConfig.getOptionInt("world_law_spread_trees")` threw `KeyNotFoundException`, while `TileSprites.getVariation(1)` threw `ArgumentOutOfRangeException`.

The correct statement is:

> With this exported runtime owner and this exported argument set, the invocation threw the recorded exception.

It is **not** “the method is broken”.

Machine data: `/worldbox-modding-docs/data/wbml/0400-parameterized-query-atlas.json`.

[Quick City](../../quick/cities/) · [Quick Actor](../../quick/actors/) · [WBML 0.4 research](../../research/wbml-0400-parameterized-query-atlas/)
