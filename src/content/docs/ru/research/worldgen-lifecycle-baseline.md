---
title: "World generation lifecycle — completion signals, reuse and repeated generation"
description: "Русская версия: WBML 0.0.24–0.0.25 evidence for generateNewMap, finishMakingWorld, persistent runners and reference reuse."
---

<span class="doc-status">✅ Verified — принятые fix6/fix1</span>

Это исследование дало проекту особенно ценное **negative knowledge**.

## Что работает

`MapBox.generateNewMap()` запускает настоящую генерацию. На WorldBox 0.51.2 надёжным explicit completion signal для WBML стал `MapBox.finishMakingWorld()`. После него проверяются live tile collections + короткое stability window, и только потом один раз идёт тяжёлая validation.

`0.0.24-fix6`: **36 / 0 / 0 PASS**. После генерации валидны 65 536 tiles, 256×256 coords, terrain/height variation и services; sample 100/100 и count 1000/1000 стабильны.

`0.0.25-fix1`: **44 / 0 / 0 PASS**. Три `generateNewMap()` подряд прошли; fingerprints менялись 3/3, но collection/sample refs переиспользовались. refs initial/cycle1/cycle2 после cycle3 оставались current (`3 stale=0`).

## Ошибочные подходы

- full-map 65k scan каждый wait frame → ~6 FPS;
- scene/world-owned coroutine умер при replacement мира;
- требование смены первого `WorldTile` оказалось ложным;
- `on_world_loaded` не оказался обязательным authoritative signal.

Safe pattern: persistent runner → cheap wait `finishMakingWorld` → live collections → stable polls → heavy validation once. Никогда не ждать `oldTile != newTile`.
