---
title: World & WorldTile — Quick Docs
description: Current WorldBox world/map evidence with frozen WBML boundaries.
---

**Status:** VERIFIED/OBSERVED by exact operation.

The existing WorldTile and worldgen specialist suites remain canonical for concrete terrain/world-generation behavior. WBML 0.8 added a current runtime census without destructively regenerating the test world: 50 manager types, 38 runtime manager samples, 410 worldgen-like methods and 40 primitive world/map reads with 0 failures.

WBML 0.9 then stress-read the current world during live simulation: 19,200 reads / 0 failures in the bounded stress window.

Do not infer that every worldgen-like method is safe to call. Surface census is `OBSERVED`; dedicated invocation evidence wins for concrete recipes.

[WorldTile details](../../api/runtime-worldtile/) · [Game integration](../../api/runtime-game-integration/) · [WBML 0.9 closure](../../research/wbml-0900-coverage-closure/)
