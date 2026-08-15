---
title: WorldTile.health is not terrain height
description: An early TerraForge reflection mistake preserved as a warning.
---

<span class="doc-status">❌ Failed approach</span>
<span class="doc-status">TerraForge 0.0.5</span>

# `WorldTile.health` is not terrain height

During an early TerraForge height-storage search, automatic reflection matching selected `WorldTile.health` as a candidate.

It looked plausible enough to test.

It was wrong.

## What happened

TerraForge wrote generated values into `WorldTile.health`.

The values changed, but terrain height did not.

This is a useful example of a dangerous reflection pattern:

> “numeric field with a plausible name” is not evidence of semantic meaning.

## What replaced it

A dedicated height-storage probe later confirmed:

```csharp
WorldTile.Height
WorldTile.data.height
```

as the real terrain-height storage in the tested build.

## Rule extracted from the failure

When discovering unknown game internals with reflection:

1. find candidates;
2. do not promote the first match to a fact;
3. write a minimal reversible probe;
4. verify a visible or measurable behavioral effect;
5. log the exact tested member;
6. only then document it as Verified.

This graveyard entry exists because the incorrect route is exactly the kind of mistake another modder — or an AI assistant — could repeat.
