---
title: WorldTile runtime map
description: Verified WorldTile fields, relationships and lifecycle lessons from WBML 0.0.21–0.0.30.
---

<span class="doc-status">✅ Verified baseline map</span>

Verified useful relationships include readable `x`, `y`, `Height`, `cur_tile_type`, `zone`, `chunk`, `region` and `neighboursAll` on the tested map. Terrain/biome resolution uses `cur_tile_type → TileTypeBase.biome_asset → BiomeAsset`.

The tested default map had 65,536 unique coordinates in a 256×256 rectangle, but map size is not a universal contract when Custom Worldsize is installed.

Lifecycle lesson: a `WorldTile` can remain the same managed object through save/reload and repeated same-size world generation. Identity replacement is not a completion signal. Conversely, do not assume reuse on future versions: revalidate current membership/state.

Heavy full-map reflection scans should be chunked and should never run every wait-loop frame.
