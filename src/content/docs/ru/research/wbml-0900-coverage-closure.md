---
title: WBML 0.9.0 — Coverage Closure & Full Architecture Torture
description: Финальный current-runtime closure census, live stress, Harmony coexistence и integrated rollback save/reload.
---

**Canonical probe:** `0.9.0` · **run:** `dd7179d925a4` · **результат:** `CLOSED PASS` — 40/0/0.

## Closure census

- 15/15 required core types.
- 18 625 methods; 9 434 public.
- Heuristic families: 6 722 query-like, 5 151 mutation-like, 460 lifecycle-like, 869 persistence-like, 279 worldgen-like, 3 428 UI/input-like, 307 event/hook-like.
- Atlas closure: 2 905 types, 38 553 members, 10 087 safe reads / 0 failures, 19 446 relations / 0 unresolved, 0 type collisions.

Это **coverage census**, а не утверждение, что каждый matching method безопасен.

## Full architecture torture

Live test: 656 frames / около 12 секунд, 12 stress passes, 19 200 reads / 0 failures. Political World, Scenario Tools и Custom Worldsize сохранились. WBML Harmony test owners были убраны; foreign owner set сохранился `3 → 3`.

Integrated rollback-only save/reload: save=1, load=1, reload proof=1, четыре identities classified, три owner relation сохранены, все три temporary scalar marker очищены. После reload: 44 canvases, 1 EventSystem. WBML-captured engine/game exceptions и operational abort — 0.

## Freeze decision

Для WorldBox 0.51.2 build 719 / NML 1.2.0.1 systematic WBML research закрыт. Remaining UNKNOWN — только явные environment/platform/future-version или intentionally unrecoverable/unsafe boundaries.

Machine data: `/worldbox-modding-docs/data/wbml/0900-coverage-closure-atlas.json`.
