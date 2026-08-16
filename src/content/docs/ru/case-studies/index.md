---
title: Разборы проектов
description: Технические уроки из реальных модов WorldBox и воспроизводимых Lab failures/successes.
---

Case studies показывают то, чего не видно в коротком API entry: **что сломалось, почему, какая ошибка была первопричиной и что в итоге стало доказательством**.

## WorldBox Modding Lab

- [WBML-0001 — addon data переживает полный restart](./wbml-0001-addon-data-persistence/)
- [WBML-0002 — addon state изолирован между world save](./wbml-0002-world-isolation/)
- [WBML-0003 — persistence без доверия памяти старого процесса](./wbml-0003-persistence-lifecycle/)
- [WBML-0004 — runtime расходится с картой из source](./wbml-0004-event-bus-runtime/)
- [WBML-0005 — replacement semantics и опасный cleanup](./wbml-0005-actions-runtime/)

Здесь также остаются production incidents из Political World и TerraForge: воспроизводимая ошибка часто учит больше, чем идеальный happy path.
