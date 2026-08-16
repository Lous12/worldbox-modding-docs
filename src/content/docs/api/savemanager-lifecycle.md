---
title: SaveManager lifecycle — tested signatures
description: Version-bound save/load signatures and safe reload proof from WBML-0029/0030.
---

<span class="doc-status">✅ Runtime verified on 0.51.2</span>
<span class="doc-status">👁 Signature is version-bound</span>

WBML safely invoked:

```text
SaveManager.saveToCurrentPath() -> SavedMap
SaveManager.loadWorld() -> void
```

These are implementation observations for the tested build, not a promise of a stable public API. Never guess a slot/path/argument for another signature.

A reliable reload proof combines `finishingUpLoading`, marker disappearance, live tile collections and a short stability window. `WorldTile.Height` exact equality is not required because Height can normalize/recompute during load.
