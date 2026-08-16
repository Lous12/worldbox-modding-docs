---
title: Save/reload lifecycle and stale-reference torture
description: WBML 0.0.29 evidence for safe SaveManager discovery, real reload proof, Height normalization and reference reuse.
---

<span class="doc-status">✅ Verified — 0.0.29-fix1: 26 / 0 / 0</span>

WBML discovered and safely invoked these version-bound signatures:

```text
SaveManager.saveToCurrentPath() -> SavedMap
SaveManager.loadWorld() -> void
```

No path, slot or unknown argument was guessed.

## Reload proof

The accepted run saved the disposable world, changed one tile Height `30 → 31`, then called `loadWorld()`. Reload was accepted only when all of these aligned:

- `MapBox.finishingUpLoading` observed;
- marker value `31` disappeared;
- `tiles_map`/`tiles_list` were live with 65,536 entries;
- six stable post-load polls completed.

`_load_counter` changed `1 → 2` as independent observational corroboration.

## Why exact Height equality is not the contract

The original 0.0.29 run really reloaded the world, but the marker test was `before=1 marker=2 after=0`. The old harness required `after==before` and falsely failed. `WorldTile.Height` can normalize/recompute on load. The correct proof is **marker cleared + lifecycle signal + live stable collections**, not byte-for-byte Height equality.

## Reference result

In the accepted run the old sample classified `REUSED_CURRENT`. `tiles_map`, `tiles_list`, zone, chunk, region and kingdom/city/actor manager objects were the same references after reload. The old tile survived **100/100 safe reads**. This reuse is an implementation observation, not a requirement for future versions.

Kingdom/City/Actor entity-object stale-vs-reuse across reload remains UNKNOWN because those registries were empty in the torture world before the load.

Evidence: `/evidence/wbml-0029-result.txt` and rejected-harness evidence.
