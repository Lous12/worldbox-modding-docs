---
title: World generation lifecycle — completion signals, reuse and repeated generation
description: WBML 0.0.24–0.0.25 evidence for generateNewMap, finishMakingWorld, persistent runners and reference reuse.
---

<span class="doc-status">✅ Verified — fix6/fix1 accepted</span>

This research produced some of the most important **negative knowledge** in the project.

## What works

`MapBox.generateNewMap()` performs real generation. On WorldBox 0.51.2, `MapBox.finishMakingWorld()` was the reliable explicit completion signal used by WBML. After the signal, the Lab required live tile collections plus a short stability window, then ran heavy validation once.

`0.0.24-fix6`: **36 / 0 / 0 PASS**. 65,536 tiles, exact 256×256 coordinates, terrain/height variation and services were valid after generation; 100/100 sample and 1000/1000 count checks stayed stable.

`0.0.25-fix1`: **44 / 0 / 0 PASS**. Three sequential `generateNewMap()` cycles completed in one session. Fingerprints changed 3/3, while the same tile collection and sample references were reused each time. Held refs from initial/cycle1/cycle2 were still current after cycle3 (`current=3 stale=0`).

## What failed and why

- Original 0.0.24 scanned the full 65k map inside a wait loop every frame and drove FPS to roughly 6. **Harness bug.**
- fix1 moved to cheap polling, but the coroutine host was world-owned and died when the world was replaced. **Lifecycle-host bug.**
- fix2–fix5 still assumed the first `WorldTile` must be replaced. Runtime showed same-size generation can reuse it. **False completion contract.**
- `on_world_loaded` did not reliably fire in this path. It is not the authoritative worldgen completion condition here.

## Safe pattern

```text
invoke generateNewMap
→ persistent runner survives replacement
→ wait cheaply for finishMakingWorld
→ verify live collections
→ require several stable polls
→ perform heavy validation once, chunked/yielded if needed
```

Never wait for `oldTile != newTile`.

Evidence: `/evidence/wbml-0024-result.txt`, `/evidence/wbml-0025-result.txt`, and `/evidence/wbml-rejected-harness-assumptions.txt`.
