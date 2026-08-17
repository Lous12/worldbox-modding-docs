---
title: Frozen current-runtime baseline
description: Что закрывает WBML 1.0, какие boundaries остаются и когда нужен re-test.
---

Systematic research campaign заморожена для WorldBox 0.51.2 build 719 / NML 1.2.0.1.

Closure не превращает heuristic counts в safe API. Это значит: практическая кампания имеет explicit evidence или explicit boundaries, а final integrated stress/reload run завершён PASS.

Re-test нужен после изменения game/loader или если конкретный runtime факт прямо противоречит baseline. Иначе используем существующий evidence для разработки модов, а не открываем broad research заново.

[WBML 1.0 freeze record](../../research/wbml-1000-frozen-baseline/)
