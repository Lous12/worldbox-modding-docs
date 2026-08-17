---
title: WBML 0.6.0 — Entity Lifecycle Atlas
description: Canonical four-domain natural lifecycle evidence plus the rejected destructive/floating-provenance harness history.
---

**Final status:** `CLOSED PASS`  
**Canonical probe:** `0.6.0-fix5`  
**Run:** `d3e2a6ed626f`  
**Final matrix:** `34 PASS / 0 FAIL / 0 SKIP`, P–F PASS.

## Research question

What happens to Building, Actor, City and Kingdom objects when their **natural high-level lifecycle path** runs, and how do manager/owner/registry references behave during cleanup?

## Canonical scenario and pinned sources

One victim kingdom and a separate control kingdom were selected. `fix5` pinned collection provenance before destructive observation:

```text
actorManager:F:units_only_alive
cityManager:F:dict
kingdomManager:F:dict
buildingManager:F:dict
kingdomCities:F:cities
cityActors:P:units
cityBuildings:F:buildings
```

## Canonical result

```text
domains ready/classified     4 / 4
full removal verified        2
non-terminal windows         2
destroy invoked              4
manager removed              2
owner removed                2
still registered             2
reintroduced                 0
same-ID new reference        0
stale read failures          0
control failures             0
cleanup failures             0
engine exceptions            0
game exceptions              0
```

Outcomes:

- Building: `Building.kill()` → `VERIFIED-NONTERMINAL-WINDOW`, remained in pinned manager+owner for 30 frames.
- Actor: `Actor.dieSimpleNone()` → `VERIFIED-LIFECYCLE`, manager+owner+registry removed, 50/50 stale reads.
- City: `City.destroyCity()` → `VERIFIED-LIFECYCLE`, manager+owner+registry removed, 50/50 stale reads.
- Kingdom: all five remaining cities destroyed via `City.destroyCity()` → city count `5→0`; Kingdom remained in `KingdomManager F:dict` for 120 frames → `VERIFIED-EMPTY-REGISTERED-WINDOW`.

## Methodology history — why fix5 matters

### Initial source

The first 0.6 package did not compile (`ModDeclare` namespace and `yield` inside `try/catch`). It is not a research run.

### fix1 — rejected unsafe strategy

Direct `BuildingManager.destroyObject`, manager removal and `Kingdom.Dispose()` fallback corrupted the runtime. Repeated `NullReferenceException` chains reached `KingdomManager.removeObject → WorldLog.logKingdomDestroyed → Kingdom.get_name`, plus Clan/BuildingZone/SimObject-zone paths. Escape stopped responding in that corrupted session. The world was discarded.

Lesson: generic manager destruction/removal and entity `Dispose()` are **not safe universal lifecycle fallbacks**.

### fix2 — safe calls, wrong success assumption

Natural entry points stopped the corruption and game exceptions were monitored, but the harness still assumed every valid lifecycle must end in immediate manager removal. Building and Kingdom disproved that assumption.

### fix3 — “last city” was not last

The harness destroyed one city and described the next window as “last city”, while owner count showed `5→4`. That Kingdom conclusion was invalid.

### fix4 — floating provenance false reintroduction

The harness exhausted cities but its manager membership helper silently re-selected the “best” collection on later frames. It could see absence in `F:dict` and then presence in another collection and falsely report City reintroduction. That result was rejected.

### fix5 — canonical

Manager/owner sources are pinned once and reused for every frame. With provenance stable, City returned to clean `VERIFIED-LIFECYCLE`, all remaining cities were truly exhausted, and Kingdom produced a valid bounded empty-registered window.

Machine data: `/worldbox-modding-docs/data/wbml/0600-entity-lifecycle-atlas.json`  
Evidence: `/worldbox-modding-docs/evidence/wbml-0600-result.txt`

[Detailed lifecycle reference](../../api/runtime-entity-lifecycle/) · [Quick Kingdom](../../quick/kingdoms/) · [Quick Building](../../quick/buildings/)
