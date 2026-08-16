---
title: Live entities baseline — Kingdom, City, Actor and destruction
description: Русская версия: WBML 0.0.16–0.0.20 runtime findings for live political entities, relationships, liveness and destruction.
---

<span class="doc-status">✅ Verified — WorldBox 0.51.2 build 719</span>

## Kingdom — WBML-0016

**24 / 0 / 0 PASS.** Проиндексированы identity/data/city/capital/ruler surface, найдены live Kingdom и выполнены повторные read-only identity/name reads. World singleton — `MapBox`; отдельный static `KingdomManager` singleton не обязателен, manager может принадлежать миру.

## City — WBML-0017

**29 / 0 / 0 PASS.** Research Engine v2 проиндексировал `City`/`CityManager`, нашёл live City и safe-read её data. Runtime surface содержит реальные owner/leader/population/building/territory/lifecycle группы.

## Actor — WBML-0018-fix1

**35 / 0 / 0 PASS.** Найден live Actor, safe-reader прочитал 128 fields с нулём read errors. Подтверждены кандидаты id/name/city/kingdom/ActorAsset/age/traits/stats/profession/equipment/current_tile. 1000 rediscovery + identity/name reads завершились. Три FAIL оригинального 0.0.18 оказались ошибкой classifier, а не Actor API.

## Relationships — WBML-0019

**26 / 0 / 0 PASS.** Проверены Kingdom↔City и City↔Actor↔Kingdom в обе стороны, manager membership и `exists` liveness flags. 1000 relationship reads прошли без mutation.

## Destruction — WBML-0020

**35 / 0 / 0 PASS.** Disposable Actor удалён через `ActorManager.destroyObject(Actor)`, disposable City — через `City.destroyCity()`. После этого manager/owner collections перестали считать их live. Сохранённые stale refs читались безопасно; authoritative live lookup — membership в manager, а не сам факт существования managed wrapper.

Правило: после lifecycle changes лучше хранить stable ID и заново спрашивать owning manager.
