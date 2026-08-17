---
title: Building runtime reference
description: Verified Building read signatures и non-terminal registration window после Building.kill().
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

Canonical parameterized examples включают `isAnimationState(Normal)` и `isState(Normal)` как Verified. Два resource-related calls в том же atlas — `OBSERVED-THREW`; exact failures нельзя обобщать.

## Lifecycle

`Building.kill()` вернулся, но тот же Building оставался в обоих pinned evidence sources 30 frames:

```text
manager_source = F:dict
owner_source = F:buildings
manager_removed = false
owner_removed = false
registry_removed = false
status = VERIFIED-NONTERMINAL-WINDOW
```

Later cleanup trigger/timing пока `research-needed`. Direct manager destruction удалён из harness после того, как показал unsafe generic strategy.

[Quick Building](../../quick/buildings/) · [Parameterized atlas](../runtime-parameterized-queries/) · [Lifecycle atlas](../runtime-entity-lifecycle/)
