---
title: Actor — быстрый справочник
description: Проверенные Actor reads, parameterized queries, безопасный scalar mutation scope и lifecycle.
---

**Статус:** Verified query surface + verified natural death lifecycle на протестированном baseline 0.51.2.

WBML 0.3.0 подтвердил, например:

```csharp
int age = actor.getAge();
int traitCount = actor.countTraits();
float cooldown = actor.getAttackCooldown();
ActorAsset asset = actor.getActorAsset();
bool canSocialize = actor.canSocialize();
```

Canonical live sample был взят из `City._professions_dict{value}[]`; повторные чтения этих примеров прошли stability window.

WBML 0.4.0 подтвердил parameterized-примеры:

```csharp
bool hasTrait = actor.hasTrait(actorTrait);
bool hasTag = actor.hasTag(tagId);
bool sameCity = actor.hasSameCity(otherActor);
float distance = actor.distanceToActorTile(otherActor);
bool visibleByDirection = actor.canSeeTileBasedOnDirection(tile);
```

Нельзя подставлять случайное значение только потому, что тип совпадает. В 0.4.0-fix2 вызов повышался до Verified только при приемлемом semantic provenance аргумента.

### Mutation и lifecycle

WBML 0.5.0 проверил обратимые scalar-транзакции для восьми `ActorData`: `money`, `experience`, `renown`, `kills`, `food_consumed`, `births`, `pollen`, `loot`.

WBML 0.6.0-fix5 подтвердил:

```text
Actor.dieSimpleNone()
→ удаление из ActorManager F:units_only_alive
→ удаление из City P:units
→ registry key очищен
→ 50/50 stale reads
→ reintroduction не наблюдался
```

Это `VERIFIED-LIFECYCLE` для конкретного natural path, а не разрешение заменять его generic `ActorManager.destroyObject()`.

[Полные детали Actor](../../api/runtime-actor/) · [WBML 0.3](../../research/wbml-0300-capability-verification-atlas/) · [WBML 0.4](../../research/wbml-0400-parameterized-query-atlas/) · [WBML 0.6](../../research/wbml-0600-entity-lifecycle-atlas/)
