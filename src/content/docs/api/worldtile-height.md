---
title: WorldTile.Height
description: Verified terrain-height storage used by WorldBox tiles, with WBML lifecycle caveats for reload and world generation.
---

<span class="doc-status">✅ Verified storage path</span>
<span class="doc-status">👁 Lifecycle value may normalize/recompute</span>

`WorldTile.Height` is the verified terrain-height storage in the WorldBox 0.51.2 research baseline. The same value is also observed through `WorldTile.data.height`.

## Verified storage

TerraForge's storage probe established that `tile.Height` / `tile.data.height` affect terrain height; `tile.health` does not.

## New WBML lifecycle evidence

WBML-0022 read height across thousands of live tiles. WBML-0024/25 used height as part of post-worldgen fingerprints. WBML-0029 then discovered a crucial boundary: after a real save/reload, Height can normalize/recompute. The original reload run observed `before=1`, temporary marker `2`, `after=0` even though the load lifecycle clearly completed.

Therefore:

```text
Height is valid terrain state
!=
Height must be byte-for-byte identical after reload
```

For reload proof, use lifecycle signal + marker disappearance + live collections + stability, not exact Height equality.

## Compatibility

Verified on WorldBox 0.51.2 build 719 / NML 1.2.0.1. Numeric ranges are world-state observations, not universal constants.
