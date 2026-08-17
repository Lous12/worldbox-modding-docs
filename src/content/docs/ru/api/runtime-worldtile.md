---
title: WorldTile runtime reference
description: Verified WorldTile zero-argument reads, owner provenance и stability observations из WBML 0.3.0.
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

Changed stability snapshot означает, что call работал, но sampled result изменился в repeated-read window. Это не invocation failure.

Старый map baseline отдельно показал, что exact `WorldTile.Height` equality — не save/reload identity contract, а worldgen/reload может reuse tile/array references. Нельзя требовать reference replacement как proof lifecycle.

WBML 0.4 также использовал live `WorldTile` arguments для Actor visibility/distance queries и подтвердил `ZoneCalculator.getZoneByID(0)` через настоящий `_zones_dict_id` dictionary key.

[Quick World & Tiles](../../quick/world-and-tiles/) · [Capability atlas](../runtime-capability-atlas/) · [World map baseline](../../research/world-map-baseline/)
