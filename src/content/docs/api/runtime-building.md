---
title: Building runtime reference
description: Verified Building read signatures and the non-terminal registration window after Building.kill().
---

Evidence scope: WorldBox 0.51.2 build 719 / NML 1.2.0.1.

## Zero-argument reads — owner `BuildingManager.dict{value}`

| Signature | Access | Sample | Stability |
|---|---|---|---|
| `countResidents()->Int32` | public | `0` | same |
| `getCity()->City` | public | reference | same |
| `getData()->BaseObjectData` | public | reference | same |
| `getExistenceTime()->Single` | public | `134.7` | same |
| `hasResidents()->Boolean` | public | `False` | same |
| `isAbandoned()->Boolean` | public | `False` | same |

Parameterized canonical examples include `isAnimationState(Normal)` and `isState(Normal)` as Verified. Two resource-related calls in the same atlas were `OBSERVED-THREW`; those exact argument-set failures must not be generalized.

## Lifecycle

`Building.kill()` returned, but the same Building remained in both pinned evidence sources for 30 frames:

```text
manager_source = F:dict
owner_source = F:buildings
manager_removed = false
owner_removed = false
registry_removed = false
status = VERIFIED-NONTERMINAL-WINDOW
```

The later cleanup trigger/timing is `research-needed`. Direct manager destruction was removed from the harness after it proved unsafe as a generic strategy.

[Quick Building](../../quick/buildings/) · [Parameterized atlas](../runtime-parameterized-queries/) · [Lifecycle atlas](../runtime-entity-lifecycle/)
