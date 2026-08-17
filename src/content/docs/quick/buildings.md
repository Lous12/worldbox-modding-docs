---
title: Building — Quick Docs
description: Verified Building reads and the bounded post-kill registration window.
---

**Status:** Verified read surface. `Building.kill()` is **not** verified as immediate manager/owner removal.

WBML 0.3.0 verified examples on `BuildingManager.dict{value}`:

```csharp
int residents = building.countResidents();
City city = building.getCity();
float existence = building.getExistenceTime();
bool hasResidents = building.hasResidents();
bool abandoned = building.isAbandoned();
```

### `kill()` does not mean “gone now”

In WBML 0.6.0-fix5:

```text
Building.kill()
→ 30 frames observed
→ still present in BuildingManager F:dict
→ still present in City F:buildings
→ registry key still present
→ no game exception
```

Status: `VERIFIED-NONTERMINAL-WINDOW`.

This proves only the bounded window. It does not prove permanent registration or define the later cleanup trigger. Therefore code that needs “definitely removed from registries” must not assume `kill()` provides that immediately.

Do not replace it with direct `BuildingManager.destroyObject()` because an earlier generic manager-destruction harness produced corrupted runtime state.

[Full Building details](../../api/runtime-building/) · [Lifecycle details](../../api/runtime-entity-lifecycle/) · [WBML 0.6](../../research/wbml-0600-entity-lifecycle-atlas/)
