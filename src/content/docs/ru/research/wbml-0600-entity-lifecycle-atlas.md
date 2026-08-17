---
title: WBML 0.6.0 — Entity Lifecycle Atlas
description: Canonical four-domain natural lifecycle evidence и история rejected destructive/floating-provenance harness.
---

**Финальный статус:** `CLOSED PASS`  
**Canonical probe:** `0.6.0-fix5`  
**Run:** `d3e2a6ed626f`  
**Final matrix:** `34 PASS / 0 FAIL / 0 SKIP`, P–F PASS.

## Вопрос исследования

Что происходит с Building, Actor, City и Kingdom после их **natural high-level lifecycle path**, и как ведут себя manager/owner/registry references во время cleanup?

## Canonical scenario и pinned sources

Выбраны victim kingdom и независимый control kingdom. `fix5` закрепил provenance до destructive observation:

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

- Building: `Building.kill()` → `VERIFIED-NONTERMINAL-WINDOW`, в pinned manager+owner 30 frames.
- Actor: `Actor.dieSimpleNone()` → `VERIFIED-LIFECYCLE`, manager+owner+registry removed, 50/50 stale reads.
- City: `City.destroyCity()` → `VERIFIED-LIFECYCLE`, manager+owner+registry removed, 50/50 stale reads.
- Kingdom: все пять remaining cities уничтожены `City.destroyCity()` → `5→0`; Kingdom ещё 120 frames в `KingdomManager F:dict` → `VERIFIED-EMPTY-REGISTERED-WINDOW`.

## Methodology history — почему fix5 важен

### Initial source

Первый package не компилировался (`ModDeclare` namespace и `yield` внутри `try/catch`) — это не research run.

### fix1 — rejected unsafe strategy

Direct `BuildingManager.destroyObject`, manager removal и `Kingdom.Dispose()` fallback повредили runtime. Repeated `NullReferenceException` прошли через `KingdomManager.removeObject → WorldLog.logKingdomDestroyed → Kingdom.get_name`, Clan/BuildingZone/SimObject-zone paths. В corrupted session перестал работать Escape. Мир был discarded.

Lesson: generic manager destruction/removal и `Dispose()` — **не safe universal lifecycle fallbacks**.

### fix2 — safe calls, wrong success assumption

Natural entry points убрали corruption, game exceptions мониторились, но harness всё ещё требовал immediate manager removal для каждого valid lifecycle. Building/Kingdom это опровергли.

### fix3 — “last city” не был последним

Уничтожен один city, но owner count показал `5→4`. Kingdom conclusion invalid.

### fix4 — floating provenance false reintroduction

Membership helper мог между frames переключить collection и ложно увидеть City «removed then returned». Этот result отвергнут.

### fix5 — canonical

Manager/owner sources pin один раз. City вернулся к чистому `VERIFIED-LIFECYCLE`, remaining cities реально исчерпаны, Kingdom дал валидный bounded empty-registered window.

Machine data: `/worldbox-modding-docs/data/wbml/0600-entity-lifecycle-atlas.json`  
Evidence: `/worldbox-modding-docs/evidence/wbml-0600-result.txt`

[Detailed lifecycle](../../api/runtime-entity-lifecycle/) · [Quick Kingdom](../../quick/kingdoms/) · [Quick Building](../../quick/buildings/)
