---
title: Для ИИ
description: Машиночитаемые правила reliability, provenance и evidence scope для coding assistants.
---

Этот раздел объясняет ИИ, **что разрешено считать фактом**, а где нужен новый probe.

Начать с:

- [Правила verification](./verification-rules/)
- [Source of truth и version drift](./source-of-truth-and-version-drift/)
- [Machine data WBML](./wbml-machine-data/)
- [Runtime-правила Political World](./politicalworld-runtime-rules/)
- [Persistence и migration rules](./persistence-and-migration-rules/)
- [Public API boundary rules](./public-api-boundary-rules/)

Machine entry points: `/worldbox-modding-docs/llms.txt`, `/worldbox-modding-docs/llms-full.txt` и `/worldbox-modding-docs/data/wbml/manifest.json`.

Главное правило: нельзя заполнять пробел правдоподобно выдуманным API. Нужно назвать evidence scope и использовать `research-needed`, если требуется focused probe.
