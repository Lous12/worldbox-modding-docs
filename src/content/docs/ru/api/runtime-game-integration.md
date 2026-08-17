---
title: Runtime game integration
description: UI/input, NML и Harmony integration boundaries из WBML 0.8 и 0.9.
---

Canonical sources: WBML `0.8.0-fix1` и `0.9.0`.

## UI и input

Manual Escape reception напрямую observed. WBML-owned UI object удалось attach к active canvas и cleanly destroy. После integrated reload 0.9 UI восстановился до 44 canvases и 1 EventSystem в этом run.

## Harmony

Несколько Harmony owners могут coexist на tested read-like getter. Observed priority sequence: `HIGH-PRE → LOW-PRE → HIGH-POST → LOW-POST`. WBML test owners снимались без удаления foreign owners. Через reload 0.9 foreign owner set сохранился 3 → 3.

## NML surface

UI/event/listener/reload/service types обнаружены. Discovery не даёт права mass-instantiate listeners или force-reload live mods без dedicated evidence.

[0.8 research](../../research/wbml-0800-world-game-integration/) · [0.9 closure](../../research/wbml-0900-coverage-closure/)
