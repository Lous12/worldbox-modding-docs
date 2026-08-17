---
title: Actor runtime reference
description: Representative verified Actor signatures, owner provenance, parameter semantics, reversible data и lifecycle evidence.
---

Evidence scope: WorldBox 0.51.2 build 719 / NML 1.2.0.1. Это curated entity page; exhaustive данные лежат в machine atlas.

## Zero-argument reads — WBML 0.3.0-fix1

Pinned sample source: `City._professions_dict{value}[]`, sample quality 110.

| Signature | Access | Sample result | Stability |
|---|---|---|---|
| `getAge()->System.Int32` | public | `76` | same |
| `countTraits()->System.Int32` | public | `5` | same |
| `getAttackCooldown()->System.Single` | public | `2` | same |
| `getActorAsset()->ActorAsset` | public | reference | same |
| `canSocialize()->System.Boolean` | public | `True` | same |
| `canBreed()->System.Boolean` | public | `True` | same |
| `canEditEquipment()->System.Boolean` | public | `True` | same |

Sample values относятся к одному live actor, а не к global invariants.

## Parameterized reads — WBML 0.4.0-fix2

| Signature | Access | Canonical argument provenance | Result |
|---|---|---|---|
| `hasTrait(ActorTrait)->Boolean` | public | runtime element `Actor.traits[]` | `True` |
| `hasTag(String)->Boolean` | public | dictionary key `Actor._traits_cache` (`weightless`) | `False` |
| `hasSameCity(Actor)->Boolean` | public | live `ActorManager.units_only_alive[]` | `False` |
| `distanceToActorTile(Actor)->Single` | public | live Actor | `295.3811` |
| `canSeeTileBasedOnDirection(WorldTile)->Boolean` | public | `MapBox.tiles_map[]` | `True` |
| `isSameSpecies(Actor)->Boolean` | internal | live Actor | `True` |

String overload `isSameSpecies(String)` остался argument-unresolved вместо слабой случайной строки. Это правильный evidence result.

## Reversible ActorData — WBML 0.5.0

`money`, `experience`, `renown`, `kills`, `food_consumed`, `births`, `pollen`, `loot` individually `VERIFIED-REVERSIBLE` по snapshot→one-write→restore proof.

## Lifecycle — WBML 0.6.0-fix5

`Actor.dieSimpleNone()` дал полный `VERIFIED-LIFECYCLE` через `ActorManager F:units_only_alive` + `City P:units`, включая registry cleanup и 50/50 stale reads.

## Access и будущий wrapper

Public methods — самый простой текущий integration surface, но это не обещание stable SDK. Будущий WorldBox Modding API должен version-adapt полезные internals, чтобы downstream mods не тащили собственный reflection/stale-reference код.

[Quick Actor](../../quick/actors/) · [Capability atlas](../runtime-capability-atlas/) · [Parameterized atlas](../runtime-parameterized-queries/) · [Lifecycle atlas](../runtime-entity-lifecycle/)
