---
title: WorldBox Modding API — planned architecture
description: Planned shared dependency-mod API after WBML 1.0; not a currently released runtime API.
---

> **PLANNED / NOT RELEASED.** This page records the agreed architecture so future work does not blur WBML research with a runtime SDK that does not exist yet.

## Why it is separate from WBML

WBML is a laboratory: it scans, breaks assumptions, verifies runtime behavior and records evidence. A dependency mod should be the opposite: a stable, boring layer that absorbs WorldBox internals and version drift for downstream mods.

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

The API should **not** mirror 38,000+ members one-to-one. It should expose high-level domains such as:

`Actors`, `Cities`, `Kingdoms`, `Diplomacy`, `Wars`, `Alliances`, `World`, `Tiles`, `Map`, `Assets`, `Save`, `Lifecycle`, `Events`, `UI`, `Input`, `Harmony`, `Compatibility`.

## Design goals learned from WBML

- Resolve live entities safely instead of handing mods stale cached references.
- Encapsulate public/reflection differences behind version adapters.
- Keep capabilities/version checks explicit when a WorldBox update changes internals.
- Treat lifecycle as a first-class concern: `Building.kill()` and zero-city Kingdoms already show why “method returned” is not enough.
- Prefer high-level intent wrappers over raw internal method names.
- Keep unsupported behavior visible rather than silently falling back to dangerous manager removal.

### Design sketches — not current API

The following names are **illustrative only**:

```csharp
// Planned shape, NOT a currently available API.
var city = WBAPI.Actors.GetCity(actor);
var kingdom = WBAPI.Cities.GetKingdom(city);

if (WBAPI.Actors.TryResolve(actorId, out var liveActor)) {
    // use a validated live reference
}

if (WBAPI.Capabilities.Has("Kingdom.Visibility")) {
    // version/capability-gated feature
}
```

Do not paste these into a current mod expecting them to compile.

## First major consumer: Fog of War Overhaul

Fog of War Overhaul is intended to be the first big real-world stress test of the shared API. Its needs span Kingdom, City, Actor, WorldTile, map coordinates, movement, save/load, UI/render overlays, lifecycle and performance.

The target architecture for exploration remains:

```text
Unknown     = never discovered; hide terrain/cities/units/resources
Discovered  = previously seen; show terrain/history + stale last-known dynamic info
Visible     = current live vision
```

with per-kingdom knowledge, vision sources (residents/scouts/armies/ships/cities/allies/merchants), contact-gated diplomacy and a kingdom-view mode.

If WorldBox ships a native kingdom exploration system before this mod, the project should **research and extend the native data/rendering/hooks**, not reimplement it blindly.

## Political World later

Political World API should eventually keep political concepts at its own layer while common WorldBox plumbing moves downward:

```text
WorldBox Modding API
        ↑
Political World API
        ↑
Political World / political addons
```

This is a future refactor after the shared layer proves itself, not a current dependency requirement.

## Build order

1. Finish WBML toward 1.0 and the stable knowledge baseline.
2. Define the smallest shared API around already verified common operations.
3. Make Fog of War Overhaul consume it instead of bypassing it whenever practical.
4. Add wrappers only when backed by docs/evidence or a new focused WBML probe.
5. Version-adapt the shared API when WorldBox changes.
6. Later audit Political World API for common plumbing that belongs in the shared layer.

[WBML machine-data rules](../../ai/wbml-machine-data/) · [Entity lifecycle evidence](../../api/runtime-entity-lifecycle/) · [Quick Docs](../../quick/)
