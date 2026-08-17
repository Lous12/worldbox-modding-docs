---
title: WBML 1.0 — Frozen WorldBox Modding Knowledge Baseline
description: Publication/freeze policy завершённой кампании WorldBox 0.51.2 / NML 1.2.0.1.
---

WBML 1.0 — **не новый runtime suite**. Это milestone консолидации и публикации после PASS версии 0.9.

**Frozen stack:** WorldBox `0.51.2` build `719` · Unity `2022.3.60f1` · NeoModLoader `1.2.0.1` · Political World `1.7.0` / PoliticalWorldAPI `1.14.0` где применимо.

## Что значит «закрыт»

Практическая current-runtime поверхность классифицирована как `VERIFIED`, `OBSERVED`, `UNSAFE` или явный `UNKNOWN`. Это **не** означает, что все 18 625 методов были вызваны или безопасны.

Systematic research открывается снова только если:

1. изменился WorldBox version/build;
2. изменился NeoModLoader version;
3. найдено прямое противоречие frozen baseline.

Обычный баг мода сам по себе не повод перезапускать WBML — сначала используем существующий baseline.

Machine consolidation: `/worldbox-modding-docs/data/wbml/1000-practical-modding-baseline.json`.
