---
title: "WBML: ошибочные предположения — negative knowledge"
description: "Правдоподобные lifecycle/worldgen/reload/compatibility assumptions, которые runtime evidence опроверг."
---

<span class="doc-status">❌ Failed assumptions</span>
<span class="doc-status">✅ Сохраняем как evidence</span>


Это ошибки **предположений harness**, а не автоматические «ошибки WorldBox».

1. Worldgen обязан заменить `WorldTile` ref — **ложь**.
2. Старый tile обязан исчезнуть — **ложь**.
3. Reload обязан вернуть `WorldTile.Height` byte-for-byte — **ложь**.
4. Общий AppDomain assembly count обязан быть постоянным — **ложь**.
5. World-owned coroutine гарантированно переживёт replacement мира — **ложь**.
6. `on_world_loaded` является authoritative completion для `generateNewMap` — **ложь** на этом path.
7. Full 65k scan можно делать каждый wait frame — **практически опасно**, оригинальный harness уронил FPS примерно до 6.
8. Destroyed Unity wrapper можно проверять только обычным CLR null — **неверная модель**.

Мы публикуем negative knowledge, чтобы моддеры и ИИ не повторяли те же ошибки.

[Sanitized rejected-run excerpts](/worldbox-modding-docs/evidence/wbml-rejected-harness-assumptions.txt)
