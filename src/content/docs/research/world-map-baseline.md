---
title: World map baseline — WorldTile, terrain, biome and map services
description: WBML 0.0.21–0.0.23 findings for WorldTile, terrain/biome routing, coordinates, zones, chunks, regions and map services.
---

<span class="doc-status">✅ Verified — current baseline</span>

## WBML-0021 — WorldTile API

**25 / 0 / 0 PASS.** `MapBox.tiles_map` exposed 65,536 live tiles on the tested map. A sample at `(1,1)` had readable coordinates/height, a `TileZone`, eight `neighboursAll`, and neighbour reciprocity passed. A direct `WorldTile → BiomeAsset` reference was not required and was kept observational.

## WBML-0022 — Terrain / Biome

**30 / 0 / 0 PASS.** The real route was:

```text
WorldTile.cur_tile_type
→ TileTypeBase
→ TileTypeBase.biome_asset
→ BiomeAsset
```

`BiomeLibrary.pool_biomes` observed `count=60`. The run saw 24 distinct live `TileTypeBase`-derived references. Across 8192 height reads the observed range was `0..177`; this is world-state data, not a universal range. Sample `biome_grass.getTileCount()` returned 1105.

## WBML-0023 — map services

**28 / 0 / 0 PASS.** All 65,536 tile coordinates were readable and unique. The tested map was exactly `x=0..255`, `y=0..255` — **256×256**. A sample tile resolved `TileZone`, `MapChunk` and `MapRegion`. Observed structure:

- `TileZone`: 64 tiles;
- `MapChunk`: 256 tiles;
- `MapRegion`: 4 zones;
- `TileManager`, `MapChunkManager`, `WorldTilemap`: all resolved.

Sample state stayed stable 100/100 and tile count 1000/1000. The 256×256 shape is an observation of this map, not a fixed contract when Custom Worldsize is present.

Evidence: `/evidence/wbml-0021-result.txt` … `/evidence/wbml-0023-result.txt`.
