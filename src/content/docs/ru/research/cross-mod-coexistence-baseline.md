---
title: Cross-mod coexistence — Political World, Custom Worldsize and Scenario Tools
description: Русская версия: WBML 0.0.28 evidence for assembly discovery, Harmony patch ownership and cross-mod runtime stability.
---

<span class="doc-status">✅ Verified — 0.0.28-fix1: 45 / 0 / 0</span>

Первый run дал один ложный FAIL: assemblies `180 → 183`. Это был не конфликт модов — broad reflection самого WBML lazy-loaded:

```text
System.Net.Http
System.ServiceModel.Internals
System.Transactions
```

`fix1` заменил бессмысленный raw-count contract на реальные conflict checks.

Подтверждено: PW, Custom Worldsize и Scenario Tools остались загружены; core types не задублировались; Harmony state сохранился; `startWar` имел только PW owner; 5000 `GetTile` совпали; map/managers/registries не drift-нули.

Правило: рост общего assembly count сам по себе не является конфликтом.
