---
title: Frozen roadmap WBML
description: Freeze policy после завершённого 1.0 current-runtime baseline.
---

## Текущий статус

`WBML 1.0 — FROZEN` для WorldBox 0.51.2 build 719 / NML 1.2.0.1.

Финальный сжатый штурм завершён:

| Version | Result |
|---|---|
| 0.7.0 | Persistence & Identity — CLOSED PASS |
| 0.8.0-fix1 | World, Game & Integration — CLOSED PASS |
| 0.9.0 | Coverage Closure & Architecture Torture — CLOSED PASS |
| 1.0.0 | Consolidation/publication — FROZEN |

## Когда открывать снова

Не создаём новую systematic WBML version ради обычной разработки модов. Открываем лабораторию снова только после изменения WorldBox/NML или прямого противоречия frozen baseline. Тогда сначала baseline diff и targeted re-test изменившихся областей, а не слепой повтор всех suites.

Capability recipes, shared WorldBox Modding API и Mod Studio — tooling/product work **на основе** evidence; они не требуют держать research campaign открытой.
