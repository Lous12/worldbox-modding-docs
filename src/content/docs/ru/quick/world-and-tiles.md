---
title: World & WorldTile — Quick Docs
description: Current WorldBox world/map evidence с frozen WBML boundaries.
---

**Статус:** VERIFIED/OBSERVED в зависимости от exact operation.

Existing WorldTile/worldgen specialist suites остаются canonical для concrete terrain/world-generation behavior. WBML 0.8 добавил current runtime census без destructive regeneration: 50 manager types, 38 runtime manager samples, 410 worldgen-like methods и 40 primitive world/map reads / 0 failures.

WBML 0.9 затем сделал live-simulation stress: 19 200 reads / 0 failures в bounded window.

Не делай вывод, что каждый worldgen-like method безопасно вызывать. Surface census = `OBSERVED`; dedicated invocation evidence главнее для concrete recipes.

[WorldTile details](../../api/runtime-worldtile/) · [Game integration](../../api/runtime-game-integration/) · [WBML 0.9 closure](../../research/wbml-0900-coverage-closure/)
