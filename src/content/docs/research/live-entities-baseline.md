---
title: Live entities baseline — Kingdom, City, Actor and destruction
description: WBML 0.0.16–0.0.20 runtime findings for live political entities, relationships, liveness and destruction.
---

<span class="doc-status">✅ Verified — WorldBox 0.51.2 build 719</span>

## Kingdom — WBML-0016

**24 / 0 / 0 PASS.** Runtime reflection indexed `Kingdom` identity/data/city/capital/ruler surface, discovered live kingdoms and repeatedly read identity/name without mutation. `MapBox` was the world singleton; a separate static `KingdomManager` singleton was not required because the live manager is world-owned. Method-name discovery is only a map of possible surface, not behavioral verification.

## City — WBML-0017

**29 / 0 / 0 PASS.** Research Engine v2 indexed `City`/`CityManager`, then resolved a live City and safe-read its data. The runtime surface exposed concrete owner/leader/population/building/territory/lifecycle families. This is the first suite where generic type research and live-object discovery were used together at scale.

## Actor — WBML-0018-fix1

**35 / 0 / 0 PASS.** A live Actor was found, 128 safe fields were emitted with zero read errors, and stable candidates included id, name, city, kingdom, `ActorAsset`, age, traits, stats, profession, equipment and `current_tile`. 1000 rediscovery + identity/name reads completed. The original run's three FAILs were a classifier problem, not an Actor API failure; fix1 narrowed the classifier.

## Relationships — WBML-0019

**26 / 0 / 0 PASS.** Kingdom↔City and City↔Actor↔Kingdom relationships were checked in both directions, along with manager membership and `exists` liveness flags. 1000 relationship reads completed without mutation. Actual destructive stale-reference checks were intentionally deferred to 0.0.20.

## Destruction — WBML-0020

**35 / 0 / 0 PASS.** A disposable Actor was removed through `ActorManager.destroyObject(Actor)` and a disposable City through `City.destroyCity()`. Manager/owner collections no longer treated them as live. Retained stale-reference candidates were handled safely; authoritative live lookup was manager membership, not the existence of a managed wrapper. Ownership/control integrity passed after both destructive branches.

## Safety rule

For live WorldBox entities, store stable IDs when possible and re-query the owning manager after lifecycle changes. A managed reference existing in your field is not by itself proof that the entity is still current.

Evidence: `/evidence/wbml-0016-result.txt` … `/evidence/wbml-0020-result.txt`.
