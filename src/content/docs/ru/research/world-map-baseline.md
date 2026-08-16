---
title: "World map baseline — WorldTile, terrain, biome and map services"
description: "Русская версия: WBML 0.0.21–0.0.23 findings for WorldTile, terrain/biome routing, coordinates, zones, chunks, regions and map services."
---

<span class="doc-status">✅ Verified — current baseline</span>

## WBML-0021 — WorldTile

**25 / 0 / 0 PASS.** `MapBox.tiles_map` дал 65 536 live tiles. Sample `(1,1)` имел читаемые coords/height, `TileZone`, восемь `neighboursAll`; reciprocity соседей прошла. Прямая ссылка `WorldTile → BiomeAsset` не требуется.

## WBML-0022 — Terrain / Biome

**30 / 0 / 0 PASS.** Реальный маршрут:

```text
WorldTile.cur_tile_type → TileTypeBase → biome_asset → BiomeAsset
```

`BiomeLibrary.pool_biomes count=60`, наблюдались 24 distinct live TileTypeBase refs. На 8192 height reads диапазон был `0..177` — это состояние конкретного мира, не universal range. `biome_grass.getTileCount()` дал 1105.

## WBML-0023 — map services

**28 / 0 / 0 PASS.** Все 65 536 координат читаемы и уникальны; конкретная карта была 256×256 (`0..255`). WorldTile разрешался в `TileZone`, `MapChunk`, `MapRegion`; наблюдалось 64 tiles/zone, 256 tiles/chunk, 4 zones/region. `TileManager`, `MapChunkManager`, `WorldTilemap` разрешились. Sample 100/100 и count 1000/1000 стабильны. 256×256 — observation, а не контракт для Custom Worldsize.
