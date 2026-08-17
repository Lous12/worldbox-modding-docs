---
title: Actor runtime reference
description: Representative verified Actor signatures, owner provenance, parameter semantics, reversible data and lifecycle evidence.
---

Evidence scope: WorldBox 0.51.2 build 719 / NML 1.2.0.1. This is a curated entity page; the full machine atlas is exhaustive.

## Zero-argument reads — WBML 0.3.0-fix1

Pinned sample source for these records: `City._professions_dict{value}[]`, sample quality 110.

| Signature | Access | Sample result | Stability |
|---|---|---|---|
| `getAge()->System.Int32` | public | `76` | same |
| `countTraits()->System.Int32` | public | `5` | same |
| `getAttackCooldown()->System.Single` | public | `2` | same |
| `getActorAsset()->ActorAsset` | public | reference | same |
| `canSocialize()->System.Boolean` | public | `True` | same |
| `canBreed()->System.Boolean` | public | `True` | same |
| `canEditEquipment()->System.Boolean` | public | `True` | same |

Sample values describe one live actor, not global invariants.

## Parameterized reads — WBML 0.4.0-fix2

| Signature | Access | Canonical argument provenance | Result |
|---|---|---|---|
| `hasTrait(ActorTrait)->Boolean` | public | `Actor.traits[]` runtime element | `True` |
| `hasTag(String)->Boolean` | public | `Actor._traits_cache` dictionary key (`weightless`) | `False` |
| `hasSameCity(Actor)->Boolean` | public | live `ActorManager.units_only_alive[]` Actor | `False` |
| `distanceToActorTile(Actor)->Single` | public | live Actor | `295.3811` |
| `canSeeTileBasedOnDirection(WorldTile)->Boolean` | public | `MapBox.tiles_map[]` tile | `True` |
| `isSameSpecies(Actor)->Boolean` | internal | live Actor | `True` |

The String overload `isSameSpecies(String)` stayed argument-unresolved instead of receiving a weak arbitrary string. That unresolved record is the correct result.

## Reversible ActorData fields — WBML 0.5.0

`money`, `experience`, `renown`, `kills`, `food_consumed`, `births`, `pollen`, `loot` are individually `VERIFIED-REVERSIBLE` under the exact snapshot→one-write→restore transaction proof.

## Lifecycle — WBML 0.6.0-fix5

`Actor.dieSimpleNone()` produced full `VERIFIED-LIFECYCLE` evidence using `ActorManager F:units_only_alive` and `City P:units`, including registry cleanup and 50/50 stale reads.

## Access and wrapper design

Public methods are the easiest current integration surface, but this page does **not** declare them a future stable SDK. The planned WorldBox Modding API should eventually wrap/version-adapt useful internals rather than force downstream mods to own reflection and stale-reference rules.

[Quick Actor](../../quick/actors/) · [Capability atlas](../runtime-capability-atlas/) · [Parameterized atlas](../runtime-parameterized-queries/) · [Lifecycle atlas](../runtime-entity-lifecycle/)
