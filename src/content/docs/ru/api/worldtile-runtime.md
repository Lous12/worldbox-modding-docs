---
title: "WorldTile runtime map"
description: "Русская версия: Verified WorldTile fields, relationships and lifecycle lessons from WBML 0.0.21–0.0.30."
---

<span class="doc-status">✅ Verified baseline map</span>

На baseline подтверждены читаемые `x`, `y`, `Height`, `cur_tile_type`, `zone`, `chunk`, `region`, `neighboursAll`. Biome route: `cur_tile_type → TileTypeBase.biome_asset → BiomeAsset`.

Тестовая default map — 65 536 unique coords, 256×256, но это не universal contract при Custom Worldsize.

`WorldTile` может сохранить ту же managed identity через reload и repeated same-size worldgen. Поэтому replacement ref не completion signal; но future reuse тоже нельзя гарантировать без revalidation.
