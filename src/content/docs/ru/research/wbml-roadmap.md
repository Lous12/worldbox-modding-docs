---
title: Roadmap WBML после 0.6.0
description: План исследовательских задач к 1.0 WorldBox Modding Knowledge Baseline.
---

Это research plan, а не обещание неизменных номеров. Одна numbered WBML version = один законченный research question; узкие исправления harness остаются `fixN` внутри версии.

## Следующие большие задачи

| Version | Research task | Главный вопрос |
|---|---|---|
| 0.7.0 | Save/Load/Persistence Integration | IDs, references, missing entities, migration/version change и non-empty registries через reload |
| 0.8.0 | World/Map/Worldgen Control Atlas | map/world control глубже раннего baseline, особенно для future exploration |
| 0.9.0 | UI/Input/Game Integration Atlas | windows, input, Escape/manual gates, overlays, map modes, camera/gameplay control |
| 0.10.0 | Events/Hooks/Harmony Integration Atlas | hooks, ordering, ownership и safe integration patterns |
| 0.11.0 | Cross-Mod Compatibility Atlas | coexistence/conflict contracts на большем масштабе |
| 0.12.0 | Performance & Scale Atlas | costs/scaling практических high-level surfaces |
| 0.13.0 | Capability Recipes / High-Level API | превратить verified low-level evidence в reusable safe recipes |
| 0.14.0 | Disposable World Automation | безопаснее автоматизировать destructive/create/remove experiments |
| 0.15.0 | Full Mod Architecture Torture | end-to-end stress накопленной архитектуры |

Дальше gaps при необходимости займут 0.16–0.20. Для release candidate лучше отдельный номер вроде `0.90.0`; цель — **`1.0.0 — WorldBox Modding Knowledge Baseline`**.

## Closed suites не повторяем без причины

0.2–0.6 заморожены на текущем WorldBox 0.51.2/NML 1.2.0.1 baseline. Повторяем closed suite, если изменился baseline или появился реально новый dependent research question, а не ради свежей даты в docs.

## Optional alternative-gameplay research

Если total-conversion-like проекты станут реальной целью, отдельное exploratory направление может покрыть camera control, input override, custom movement, Unity physics, sprite/Animator, scene/level overlays и vanilla simulation isolation. Эти темы пока **не** закреплены numbered versions.

[Research archive](./) · [План shared API](../../guides/worldbox-modding-api-roadmap/) · [Machine data](../../ai/wbml-machine-data/)
