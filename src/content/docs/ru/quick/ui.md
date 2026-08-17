---
title: UI / Input — Quick Docs
description: Практический UI, input и Harmony integration guidance из WBML 0.8/0.9.
---

**Статус:** VERIFIED для tested current runtime.

- Manual Escape keydown получен WBML input probe.
- WBML-owned UI object создан, attached к active canvas и cleanly destroyed.
- В 0.8 observed 20 active canvases / 1 EventSystem; после integrated reload 0.9 — 44 canvases / 1 EventSystem. Это observations, не constants.
- Обнаружено 73 NML UI-related types.
- Harmony test owners можно было установить, вызвать и снять, не удалив три observed foreign owners.

Discovery NML reload/listener type не доказывает, что безопасно mass-instantiate или force-reload live mods.

[Полные integration details](../../api/runtime-game-integration/) · [WBML 0.8 evidence](../../research/wbml-0800-world-game-integration/)
