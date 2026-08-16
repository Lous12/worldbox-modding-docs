---
title: Исследования
description: Runtime-probe, гипотезы, эксперименты и evidence с явными version/reliability boundaries.
---

Здесь находятся эксперименты для фактов, которые нельзя безопасно вывести только из названий методов или структуры source.

Обычный путь:

```text
вопрос
→ controlled probe
→ raw runtime observation
→ отбраковка ошибок harness
→ final matrix
→ документация с точной версией
```

## Завершённые исследования WBML

- [WBML-0001 — Addon Data Save/Load Probe](./addon-data-save-load-probe/)
- [WBML-0002 — World Isolation Probe](./world-isolation-probe/)
- [WBML-0003 — Persistence & Party Lifecycle Suite](./persistence-lifecycle-suite/)
- [WBML-0004 — Event Bus Runtime Suite](./event-bus-runtime-suite/)
- [WBML-0005 — Actions / Conditions / Effects Suite](./actions-conditions-effects-suite/)

`PARTIAL PASS` допустим, если все выполненные assertions прошли, а SKIP-ветки названы явно. SKIP никогда не превращается в Verified автоматически.

Неудачные harness runs сохраняются, если они показывают методологическую ошибку или опасное предположение.
