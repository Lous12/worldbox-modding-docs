---
title: Cross-mod coexistence — Political World, Custom Worldsize and Scenario Tools
description: WBML 0.0.28 evidence for assembly discovery, Harmony patch ownership and cross-mod runtime stability.
---

<span class="doc-status">✅ Verified — 0.0.28-fix1: 45 / 0 / 0</span>

The first run produced one apparent failure: loaded assemblies grew `180 → 183`. That was **not a mod conflict**. The Lab itself performed broad reflection/type inspection and lazily caused three framework assemblies to load:

```text
System.Net.Http
System.ServiceModel.Internals
System.Transactions
```

`fix1` changed the criterion from “raw assembly count must never change” to meaningful conflict checks.

Verified in the accepted run:

- Political World, Custom Worldsize and Scenario Tools each remained present;
- core `MapBox`, `WorldTile`, `Kingdom`, `City`, `Actor` definitions were not duplicated;
- Harmony patched-method state remained stable (`24 → 24` in the investigated run);
- `DiplomacyManager.startWar` had exactly the Political World owner used by the current build;
- 5000 `GetTile` comparisons returned the same references;
- map, managers and registries did not drift.

## Rule

Do not declare a conflict merely because reflection caused the AppDomain assembly count to increase. Compare **which assemblies appeared**, core type uniqueness, patch owners and runtime state.

Evidence: `/evidence/wbml-0028-result.txt` and the rejected-harness file.
