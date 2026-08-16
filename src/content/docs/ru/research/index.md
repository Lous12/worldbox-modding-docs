---
title: Исследования
description: Runtime-probe, гипотезы, эксперименты и evidence с явными version/reliability boundaries.
---

Здесь находятся эксперименты для фактов, которые нельзя безопасно вывести только из названий методов или структуры source.

```text
вопрос → controlled probe → raw observation → отбраковка harness ошибок → final matrix → version-bound docs
```

## Первый сводный baseline

- [WBML 0.1.0 — First Research Baseline](./wbml-0100-first-research-baseline/)
- [Runtime tooling — 0.0.6–0.0.15](./runtime-tooling-baseline/)
- [Live entities — 0.0.16–0.0.20](./live-entities-baseline/)
- [World map — 0.0.21–0.0.23](./world-map-baseline/)
- [Worldgen lifecycle — 0.0.24–0.0.25](./worldgen-lifecycle-baseline/)
- [Performance & mass stress — 0.0.26–0.0.27](./performance-stress-baseline/)
- [Cross-mod coexistence — 0.0.28](./cross-mod-coexistence-baseline/)
- [Save/reload lifecycle — 0.0.29](./save-reload-lifecycle-baseline/)
- [WBML-0030 — Full Integration Torture](./full-integration-torture/)
- [Research Engine v2.1.1](./research-engine-status/)

## Ранние исследования PoliticalWorldAPI

- [WBML-0001 — Addon Data Save/Load Probe](./addon-data-save-load-probe/)
- [WBML-0002 — World Isolation Probe](./world-isolation-probe/)
- [WBML-0003 — Persistence & Party Lifecycle Suite](./persistence-lifecycle-suite/)
- [WBML-0004 — Event Bus Runtime Suite](./event-bus-runtime-suite/)
- [WBML-0005 — Actions / Conditions / Effects Suite](./actions-conditions-effects-suite/)

`PARTIAL PASS` сохраняется, если все executed assertions прошли, а SKIP названы. SKIP не превращается в Verified. Failed harness runs сохраняются как negative knowledge.
