---
title: Lifecycle-safe patterns from WBML
description: Practical patterns for worldgen, save/reload, Unity liveness, heavy scans and compatibility checks based on WBML 0.1.0.
---

<span class="doc-status">✅ Evidence-backed recipes</span>
<span class="doc-status">WorldBox 0.51.2 baseline</span>


## Wait for world generation

Prefer: persistent runner → `finishMakingWorld` → live collections → short stability window → heavy validation once. Do not wait for reference replacement.

## Prove a reload

Use several independent signals: load lifecycle signal, changed marker disappearing, live collections, stable post-load polls. Do not require exact `Height` equality.

## Hold references across lifecycle boundaries

Treat identity reuse as possible but not guaranteed. After load/worldgen/destruction, revalidate against the current manager/collection. Stable IDs plus re-query are safer than assuming the wrapper is current.

## Scan the map

Chunk large scans and yield between chunks. Cheap polling belongs in wait loops; a rich 65,536-object reflection pass does not.

## Use SaveManager

Do not guess paths/slots/arguments. Inspect signatures first and invoke only a path whose parameters are understood. Use disposable worlds for destructive research.

## Check Unity liveness

Do not use only `ReferenceEquals(x, null)`. Unity fake-null and end-of-frame destruction semantics matter; avoid member access on destroyed wrappers unless the behavior is deliberately being probed.

## Diagnose mod conflicts

Do not compare only total assembly count. Compare concrete added/removed assemblies, core type uniqueness, Harmony owners and live manager/map state.

## Version changes

A green 0.51.2 result becomes a baseline for diffing, not an eternal contract. Re-run the smallest affected probes when WorldBox/NML changes.
