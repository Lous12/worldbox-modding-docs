---
title: MapBox world-generation lifecycle
description: Verified generateNewMap and completion behavior on WorldBox 0.51.2.
---

<span class="doc-status">✅ Verified</span>

Verified runtime entry point:

```text
MapBox.generateNewMap() -> void
```

For WBML on 0.51.2, `MapBox.finishMakingWorld()` was the explicit completion signal that survived repeated tests. `on_world_loaded` was not required in the investigated generate-new-map path.

Do **not** use `oldTile != newTile` as completion. The same `tiles_map`, `tiles_list` and sample `WorldTile` were reused across multiple generations.

Recommended waiter: persistent coroutine host, cheap signal/live-collection polling, several stable polls, then one heavy validation pass.

Evidence: WBML-0024-fix6, WBML-0025-fix1, WBML-0030.
