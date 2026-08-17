---
title: World & WorldTile — Quick Docs
description: Verified WorldTile reads and version-bound world/map guidance from the WBML baseline.
---

**Status:** WorldTile read surface Verified on the tested baseline; worldgen/save lifecycle has additional evidence in the 0.1 baseline.

WBML 0.3.0 verified representative `WorldTile` reads from `MapBox.tiles_map[]`:

```csharp
int height = tile.Height;
TileTypeBase type = tile.Type;
int id = tile.tile_id;
City city = tile.zone_city;
int units = tile.countUnits();
BiomeAsset biome = tile.getBiome();
bool hasBuilding = tile.hasBuilding();
bool hasCity = tile.hasCity();
```

The tested tile sample returned `Height=210`, `tile_id=0`, `hasCity=true`, `hasBuilding=false`; sample values are not global constants. `getColor()` was successfully invoked but changed during the stability window, so do not treat a single color snapshot as stable world state.

The consolidated 0.1 baseline additionally verified the tested `MapBox.generateNewMap()` completion path using `finishMakingWorld` + live collections/stability rather than requiring object-reference replacement.

For future Fog of War / exploration work, deeper map visibility, camera and rendering control still need dedicated later WBML phases. Do not invent a per-kingdom fog API from current evidence.

[Full WorldTile details](../../api/runtime-worldtile/) · [Automatic/Capability atlas](../../api/runtime-capability-atlas/) · [World-map research baseline](../../research/world-map-baseline/)
