---
title: WorldTile runtime reference
description: Verified WorldTile zero-argument reads, owner provenance and stability observations from WBML 0.3.0.
---

Canonical capability evidence: WBML `0.3.0-fix1`, owner source `MapBox.tiles_map[]`.

| Signature | Access | Sample | Stability |
|---|---|---|---|
| `get_Height()->Int32` (`Height`) | public | `210` | same |
| `get_Type()->TileTypeBase` (`Type`) | public | reference | same |
| `get_tile_id()->Int32` (`tile_id`) | public | `0` | same |
| `get_zone_city()->City` (`zone_city`) | public | reference | same |
| `countUnits()->Int32` | public | `0` | same |
| `getBiome()->BiomeAsset` | public | `null` | same |
| `hasBuilding()->Boolean` | public | `False` | same |
| `hasCity()->Boolean` | public | `True` | same |
| `canBeFrozen()->Boolean` | public | `True` | same |
| `getColor()->Color32` | public | reference | **changed** |

A changed stability snapshot means the call worked but the sampled result changed across the repeated-read window. It is not an invocation failure.

The older map baseline separately established that exact `WorldTile.Height` equality is not a save/reload identity contract and that worldgen/reload may reuse tile/array references. Do not require reference replacement as lifecycle proof.

Parameterized WBML 0.4 also supplied live `WorldTile` arguments to Actor visibility/distance queries and verified `ZoneCalculator.getZoneByID(0)` using a real `_zones_dict_id` dictionary key.

[Quick World & Tiles](../../quick/world-and-tiles/) · [Capability atlas](../runtime-capability-atlas/) · [World map baseline](../../research/world-map-baseline/)
