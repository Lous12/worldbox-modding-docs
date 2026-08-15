---
title: WorldTile.Height
description: Verified terrain-height storage used by WorldBox tiles on the current research baseline.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">WorldBox 0.51.2 build 719</span>
<span class="doc-status">NeoModLoader 1.2.0.1</span>

`WorldTile.Height` is the **verified terrain-height storage** used in our WorldBox 0.51.2 research baseline.

<div class="doc-meta">

Also observed through the underlying data as `WorldTile.data.height`.

</div>

## What was verified

During TerraForge's height-storage probe, both access paths changed the same tested tile set and produced matching results:

```csharp
tile.Height
tile.data.height
```

For TerraForge, `WorldTile.Height` became the preferred access path.

## What it is not

Do **not** confuse terrain height with:

```csharp
tile.health
```

That false match was used in an early TerraForge experiment and did not modify terrain height.

## Why this matters

A custom generator can calculate perfect continent masks and noise fields, but if the result is written to the wrong member, WorldBox terrain conversion never receives the intended height data.

This is why TerraForge separated two questions:

1. Is our generator math correct?
2. Are we writing the result into the actual WorldBox height storage?

The second question required a runtime probe instead of guessing from a field name.

## Evidence

**Origin:** TerraForge Height Storage Probe  
**Evidence type:** runtime probe  
**Result:** `WorldTile.Height` and `WorldTile.data.height` behaved as the same terrain-height storage in the tested environment.

## Compatibility

This page is verified for the baseline shown above. Re-test after significant WorldBox updates before treating the behavior as unchanged.
