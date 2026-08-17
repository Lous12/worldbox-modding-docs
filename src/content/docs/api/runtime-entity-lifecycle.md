---
title: Entity Lifecycle Atlas
description: Canonical Building, Actor, City and Kingdom removal/non-terminal lifecycle evidence from WBML 0.6.0-fix5.
---

Canonical probe: **`0.6.0-fix5`**, run `d3e2a6ed626f`, schema 4.

## Pinned evidence sources

`fix5` freezes the exact collections discovered before destructive observation:

```text
ActorManager    F:units_only_alive
CityManager     F:dict
KingdomManager  F:dict
BuildingManager F:dict
Kingdom→Cities  F:cities
City→Actors     P:units
City→Buildings  F:buildings
```

This prevents the harness from silently switching to a different collection mid-window.

## Canonical outcomes

| Domain | Natural path | Outcome | Window / stale proof |
|---|---|---|---|
| Building | `Building.kill()` | `VERIFIED-NONTERMINAL-WINDOW` | same object remained in pinned manager+owner for 30 frames |
| Actor | `Actor.dieSimpleNone()` | `VERIFIED-LIFECYCLE` | manager/owner/registry removed; 50/50 stale reads |
| City | `City.destroyCity()` | `VERIFIED-LIFECYCLE` | manager/owner/registry removed; 50/50 stale reads |
| Kingdom | destroy all remaining cities through `City.destroyCity()` | `VERIFIED-EMPTY-REGISTERED-WINDOW` | city count 5→0, Kingdom stayed registered for 120 frames |

Summary: 4 ready / 4 attempted / 4 classified; 2 full removals, 2 non-terminal windows; no reintroduction, no same-ID new reference, no stale/control/cleanup failures, no engine/game exceptions.

## What is deliberately not claimed

- Building registration after 30 frames is not claimed to be permanent.
- Empty Kingdom registration after 120 frames is not claimed to be permanent.
- `same_id_new_reference=0` only says immediate same-ID/different-reference reuse was not observed in these windows.
- Creation semantics and long-horizon ID reuse were not tested by this suite.

## Why direct manager removal is excluded

An earlier harness (`0.6.0-fix1`) used direct manager `destroyObject/removeObject` and `Kingdom.Dispose()` fallbacks. It corrupted runtime relationships and produced repeated game-loop `NullReferenceException`s; even Escape stopped working in that corrupted session. That path is a **failed/unsafe methodology lesson**, not a recommended lifecycle recipe.

`fix2–fix4` then corrected the evidence model: immediate-removal assumption, true “last city” exhaustion and finally pinned collection provenance. Only `fix5` is canonical.

Machine data: `/worldbox-modding-docs/data/wbml/0600-entity-lifecycle-atlas.json`.

[Quick Building](../../quick/buildings/) · [Quick Actor](../../quick/actors/) · [Quick City](../../quick/cities/) · [Quick Kingdom](../../quick/kingdoms/) · [WBML 0.6 research](../../research/wbml-0600-entity-lifecycle-atlas/)
