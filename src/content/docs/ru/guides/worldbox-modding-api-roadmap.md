---
title: WorldBox Modding API — план архитектуры
description: План общего dependency-mod API после WBML 1.0; сейчас такого released runtime API ещё нет.
---

> **PLANNED / NOT RELEASED.** Эта страница фиксирует согласованную архитектуру, чтобы позже не смешать WBML research с runtime SDK, которого пока нет.

## Почему отдельно от WBML

WBML — лаборатория: сканирует, ломает assumptions, проверяет runtime и хранит evidence. Dependency mod должен делать противоположное: быть стабильным «скучным» слоем, который поглощает internals/version drift для downstream mods.

```text
WorldBox internals
        ↓
      WBML
research / evidence
        ↓
WorldBox Modding Docs
quick + detailed + machine truth
        ↓
WorldBox Modding API   [future dependency mod]
        ↓
Fog of War Overhaul / Political World / third-party mods
```

API **не должен** зеркалить 38k+ members один-к-одному. Нужны high-level domains: `Actors`, `Cities`, `Kingdoms`, `Diplomacy`, `Wars`, `Alliances`, `World`, `Tiles`, `Map`, `Assets`, `Save`, `Lifecycle`, `Events`, `UI`, `Input`, `Harmony`, `Compatibility`.

## Design goals из WBML

- Безопасно resolve live entities вместо stale cached refs.
- Спрятать public/reflection разницу за version adapters.
- Явно capability/version-gate изменившиеся internals.
- Lifecycle first-class: `Building.kill()` и zero-city Kingdom уже показали, почему «method returned» недостаточно.
- High-level intent wrapper лучше raw internal name.
- Unsupported behavior должен быть видимым; никакого скрытого fallback в unsafe manager removal.

### Design sketches — не текущий API

```csharp
// Планируемая форма, СЕЙЧАС такого API нет.
var city = WBAPI.Actors.GetCity(actor);
var kingdom = WBAPI.Cities.GetKingdom(city);

if (WBAPI.Actors.TryResolve(actorId, out var liveActor)) {
    // validated live reference
}

if (WBAPI.Capabilities.Has("Kingdom.Visibility")) {
    // version/capability-gated feature
}
```

Не вставляй этот код в текущий mod — он не обязан компилироваться.

## Первый большой consumer: Fog of War Overhaul

Fog of War Overhaul планируется первым серьёзным stress test общего API. Ему нужны Kingdom, City, Actor, WorldTile, map coordinates, movement, save/load, UI/render overlays, lifecycle и performance.

Exploration architecture:

```text
Unknown     = никогда не открыто; terrain/cities/units/resources скрыты
Discovered  = видели раньше; terrain/history + stale last-known dynamic info
Visible     = current live vision
```

с per-kingdom knowledge, vision sources (residents/scouts/armies/ships/cities/allies/merchants), contact-gated diplomacy и kingdom-view mode.

Если WorldBox раньше выпустит native kingdom exploration, проект должен **исследовать и расширить native data/render/hooks**, а не слепо переписывать систему.

## Political World позже

Political World API должен оставить у себя политические concepts, а common WorldBox plumbing постепенно уйдёт вниз:

```text
WorldBox Modding API
        ↑
Political World API
        ↑
Political World / political addons
```

Это future refactor после проверки shared layer, не current dependency.

## Порядок

1. Закончить WBML к 1.0.
2. Сделать минимальный shared API на уже verified common operations.
3. Писать Fog of War Overhaul через него, где practical.
4. Новый wrapper — только после docs/evidence или focused WBML probe.
5. При update WorldBox обновлять version adapter в одном месте.
6. Позже аудит Political World API и перенос common plumbing вниз.

[Machine-data rules](../../ai/wbml-machine-data/) · [Lifecycle evidence](../../api/runtime-entity-lifecycle/) · [Quick Docs](../../quick/)
