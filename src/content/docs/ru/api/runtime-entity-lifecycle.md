---
title: Entity Lifecycle Atlas
description: Canonical Building, Actor, City и Kingdom removal/non-terminal lifecycle evidence из WBML 0.6.0-fix5.
---

Canonical probe: **`0.6.0-fix5`**, run `d3e2a6ed626f`, schema 4.

## Pinned evidence sources

`fix5` замораживает exact collections до destructive observation:

```text
ActorManager    F:units_only_alive
CityManager     F:dict
KingdomManager  F:dict
BuildingManager F:dict
Kingdom→Cities  F:cities
City→Actors     P:units
City→Buildings  F:buildings
```

Harness больше не может молча перейти на другую collection посреди window.

## Canonical outcomes

| Domain | Natural path | Outcome | Window / stale proof |
|---|---|---|---|
| Building | `Building.kill()` | `VERIFIED-NONTERMINAL-WINDOW` | тот же object в pinned manager+owner 30 frames |
| Actor | `Actor.dieSimpleNone()` | `VERIFIED-LIFECYCLE` | manager/owner/registry removed; 50/50 stale reads |
| City | `City.destroyCity()` | `VERIFIED-LIFECYCLE` | manager/owner/registry removed; 50/50 stale reads |
| Kingdom | уничтожить все remaining cities через `City.destroyCity()` | `VERIFIED-EMPTY-REGISTERED-WINDOW` | city count 5→0, Kingdom registered ещё 120 frames |

Summary: 4 ready / 4 attempted / 4 classified; 2 full removals, 2 non-terminal windows; reintroduction=0, same-ID-new-ref=0, stale/control/cleanup failures=0, engine/game exceptions=0.

## Чего мы намеренно не утверждаем

- Building registration после 30 frames не объявляется permanent.
- Empty Kingdom registration после 120 frames не объявляется permanent.
- `same_id_new_reference=0` — только отсутствие immediate reuse в наблюдаемом window.
- Creation semantics и long-horizon ID reuse этот suite не тестировал.

## Почему direct manager removal исключён

Ранний harness (`0.6.0-fix1`) использовал direct manager `destroyObject/removeObject` и `Kingdom.Dispose()` fallback. Он повредил runtime relations и вызвал repeated game-loop `NullReferenceException`; в corrupted session перестал работать даже Escape. Это **failed/unsafe methodology lesson**, а не lifecycle recipe.

`fix2–fix4` затем исправляли evidence model: immediate-removal assumption, настоящее исчерпание “last city” и pinned collection provenance. Canonical только `fix5`.

Machine data: `/worldbox-modding-docs/data/wbml/0600-entity-lifecycle-atlas.json`.

[Quick Building](../../quick/buildings/) · [Quick Actor](../../quick/actors/) · [Quick City](../../quick/cities/) · [Quick Kingdom](../../quick/kingdoms/) · [WBML 0.6](../../research/wbml-0600-entity-lifecycle-atlas/)
