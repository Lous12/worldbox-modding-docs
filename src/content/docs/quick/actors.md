---
title: Actor — Quick Docs
description: Verified Actor reads, parameterized queries, safe scalar mutation scope and lifecycle behavior.
---

**Status:** Verified query surface + verified natural death lifecycle on the tested 0.51.2 baseline.

Useful zero-argument calls verified by WBML 0.3.0 include:

```csharp
int age = actor.getAge();
int traitCount = actor.countTraits();
float cooldown = actor.getAttackCooldown();
ActorAsset asset = actor.getActorAsset();
bool canSocialize = actor.canSocialize();
```

The canonical live sample came from `City._professions_dict{value}[]`; these calls were stable in the repeated-read window of that run.

WBML 0.4.0 also verified parameterized examples such as:

```csharp
bool hasTrait = actor.hasTrait(actorTrait);
bool hasTag = actor.hasTag(tagId);
bool sameCity = actor.hasSameCity(otherActor);
float distance = actor.distanceToActorTile(otherActor);
bool visibleByDirection = actor.canSeeTileBasedOnDirection(tile);
```

Do **not** turn “parameter type matches” into arbitrary arguments. 0.4.0-fix2 only promoted calls when argument provenance was semantically acceptable.

### Mutation and lifecycle

WBML 0.5.0 verified reversible scalar transactions for eight `ActorData` members: `money`, `experience`, `renown`, `kills`, `food_consumed`, `births`, `pollen`, `loot`.

WBML 0.6.0-fix5 verified:

```text
Actor.dieSimpleNone()
→ removed from ActorManager F:units_only_alive
→ removed from City P:units
→ registry key cleaned
→ 50/50 stale reads completed
→ no reintroduction observed
```

That is `VERIFIED-LIFECYCLE` for the tested path. It is not permission to call generic `ActorManager.destroyObject()` as a substitute.

[Full Actor details](../../api/runtime-actor/) · [WBML 0.3](../../research/wbml-0300-capability-verification-atlas/) · [WBML 0.4](../../research/wbml-0400-parameterized-query-atlas/) · [WBML 0.6](../../research/wbml-0600-entity-lifecycle-atlas/)
