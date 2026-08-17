---
title: UI — быстрый справочник
description: Текущая граница UI evidence и что ещё требует отдельного исследования.
---

**Статус:** Partial baseline; UI нельзя считать полностью картированным.

Ранний WBML UI Infrastructure suite (`0.0.9-fix3`) дошёл до автоматических `126 PASS / 0 FAIL / 0 SKIP`, но **manual Escape behavior остаётся открытым gate** в сводном baseline. Atlases 0.2–0.6 не превращают это в универсальную UI/input гарантию.

Практическое правило:

- используй уже документированные UI recipes, где реально проверен конкретный path;
- не предполагай одинаковый lifetime у каждого `Window`, input lock или клонированного объекта;
- не называй Escape/input integration полностью Verified, пока manual gate открыт;
- глубокий UI/input/game integration будет отдельным последующим WBML этапом.

Для Fog of War Overhaul kingdom-view overlays, map modes, input override и camera integration пока **research-needed**, а не готовая подтверждённая архитектура.

[Safe UI clone](../../recipes/safe-ui-clone/) · [Runtime tooling baseline](../../research/runtime-tooling-baseline/) · [Статусы evidence](../evidence-statuses/)
