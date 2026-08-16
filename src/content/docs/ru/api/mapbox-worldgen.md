---
title: "MapBox world-generation lifecycle"
description: "Русская версия: Verified generateNewMap and completion behavior on WorldBox 0.51.2."
---

<span class="doc-status">✅ Verified</span>

Проверенный entry point: `MapBox.generateNewMap() -> void`. На 0.51.2 completion signal для WBML — `MapBox.finishMakingWorld()`. `on_world_loaded` не был обязательным. Нельзя ждать `oldTile != newTile`: arrays/tile refs реально переиспользовались. Используйте persistent runner + cheap polling + stable window + один heavy validation pass.
