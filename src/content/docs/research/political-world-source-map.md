---
title: Political World source map
description: A source-backed map of Political World's modules and responsibility boundaries.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">Political World 1.7.0</span>
<span class="doc-status">GitHub snapshot ce0c917</span>

This page describes the **actual repository structure** inspected in the Political World source tree, not a planned architecture.

The inspected GitHub `main` snapshot used here has tree SHA:

```text
ce0c91754722dd1e88e8eaf116c4c667ae020204
```

## Public boundary

Political World's supported third-party boundary is:

```csharp
Lous12.PoliticalWorld.PoliticalWorldAPI
```

The repository architecture explicitly treats `Main`, `ScenarioBridge`, private partial-class methods, and reflection into internal modules as implementation details rather than supported addon API.

The dependency direction is intended to be:

```text
WorldBox / NeoModLoader
        ↓
Political World runtime modules
        ↓
PoliticalWorldAPI
        ↓
Third-party addons
```

## Runtime module map

| Path | Responsibility |
| --- | --- |
| `API/` | Public facade, Event Bus, diagnostics, government registry, rare political events. |
| `Core/Configuration/` | Legacy identifiers, tuning, shared runtime state. |
| `Core/Runtime/` | NeoModLoader bootstrap and staggered simulation pipeline. |
| `Core/Integration/WorldBox/` | WorldBox/Harmony integration that is especially version-sensitive. |
| `Core/Persistence/` | Shared helpers around kingdom data. |
| `Core/Events/` | Political World → WorldLog bridge. |
| `Politics/` | Governments, ideologies, parties, elections, leadership, councils, crises and stability. |
| `International/` | Blocs, vanilla Alliance synchronization and summits. |
| `Warfare/` | War and diplomacy integration. |
| `Map/` | Political Map state, rendering and patches. |
| `UI/` | Kingdom politics UI, windows and sandbox powers. |

## The entry type is intentionally tiny

`src/PoliticalWorld/Main.cs` contains only the NeoModLoader entry partial class:

```csharp
public partial class Main : BasicMod<Main>
{
}
```

The actual runtime implementation is split across focused partial-class modules.

This is deliberate. A large mod does not require one giant `Main.cs`.

## Important source areas

### Runtime

```text
Core/Runtime/PoliticalWorld.BootstrapAndPipeline.cs
```

Contains `OnModLoad()`, compatibility checks, the central `Update()`, timed subsystems, and the staged political simulation pipeline.

### WorldBox / Harmony integration

```text
Core/Integration/WorldBox/PoliticalWorld.HarmonyPatches.cs
```

Contains compatibility-sensitive patch installation, method-name fallbacks, overload filtering and patch diagnostics.

### Persistent/domain data helpers

```text
Core/Persistence/KingdomData.Helpers.cs
```

Wraps `kingdom.data.get(...)` and `kingdom.data.set(...)` behind null-safe typed helpers.

### API

```text
API/PoliticalWorldAPI.cs
API/PoliticalWorldAPI.Creator.cs
API/Events/
API/Governments/
API/Diagnostics/
```

The public API is designed as a boundary between the large internal simulation and third-party addons.

### Political systems

```text
Politics/Governments/
Politics/Ideologies/
Politics/Parties/
Politics/Elections/
Politics/Leadership/
Politics/Councils/
Politics/Crises/
Politics/Stability/
```

### International and warfare

```text
International/Blocs/
International/Summits/
Warfare/
```

### UI and Political Map

```text
UI/KingdomPolitics/
UI/Windows/
UI/Sandbox/
Map/PoliticalMap/
```

## Performance philosophy visible in the source

Political World does not try to turn every system into its own permanent `Update()` loop.

The architecture documentation recommends aggregate/event-driven state, rare checks and staggered work. The current source has one central mod `Update()` and schedules different jobs at different intervals.

The heavyweight political cycle is additionally split across successive rendered frames instead of running all major political systems in one frame.

See: [Stagger heavy simulation work across frames](../../guides/staggered-simulation-pipeline/).

## Compatibility-sensitive legacy IDs

The project GUID is:

```text
Lous12.PoliticalWorld
```

but old gameplay/save identifiers using `ukiol_*` are intentionally kept for compatibility.

A mass rename that makes the source look cleaner can silently become a save migration problem.

## Documentation rule extracted from this project

When documenting a large mod, never flatten the whole codebase into one statement such as:

> “Political World is one class that updates politics.”

Document the layers separately:

1. entry/bootstrap;
2. domain systems;
3. WorldBox integration;
4. persistence/data;
5. public API;
6. UI;
7. performance/lifecycle;
8. compatibility-sensitive identifiers.

That structure makes the documentation much easier for both humans and AI systems to reason about.
