---
title: WBML 0.8.0-fix1 — World, Game & Integration Mega Atlas
description: Canonical evidence по UI/input, world/map, NML surface, Harmony ownership/order и cross-mod coexistence.
---

**Canonical probe:** `0.8.0-fix1` · **run:** `8ee7367799c0` · **результат:** `CLOSED PASS` — 46/0/0.

## Что доказано

- Escape keydown пойман в controlled manual window.
- В tested state: 20 active canvases, 1 EventSystem, 73 NML UI-related types.
- WBML-owned UI object создался, прикрепился и удалился чисто.
- World/map census: 50 manager types, 38 runtime manager samples, 410 worldgen-like methods; 40 primitive reads / 0 failures.
- Два WBML Harmony owner патчили read-like Actor getter, callbacks реально вызвались, затем оба WBML owner были сняты.
- Foreign Harmony owners Political World, Custom Worldsize и NML остались чужими owners.
- NML event/listener/reload/service surface найден без массового создания listeners и без force-reload живых модов.

Observed order для каждого из трёх вызовов: `HIGH-PRE → LOW-PRE → HIGH-POST → LOW-POST`. Это version-bound evidence.

## Отклонённый initial run

В исходном `0.8.0` был один ложный `A.UI.NML-surface` FAIL: assertion запускался раньше static census. Тот же run позже находил 73 NML UI types. fix1 переставил порядок и является canonical.

Machine data: `/worldbox-modding-docs/data/wbml/0800-world-game-integration-atlas.json`.
