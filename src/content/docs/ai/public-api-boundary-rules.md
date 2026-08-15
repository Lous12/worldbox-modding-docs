---
title: Public API boundary rules for AI
description: Rules for AI coding assistants working with a parent mod that exposes a supported addon API.
---

<span class="doc-status">🤖 AI-critical</span>
<span class="doc-status">✅ Political World source-backed</span>

When a mod exposes a documented public addon facade, an AI assistant should treat that facade as a hard architectural boundary unless the user explicitly asks to modify the parent mod itself.

For Political World the supported facade is:

```csharp
Lous12.PoliticalWorld.PoliticalWorldAPI
```

## If creating a third-party addon

Do:

```text
RegisterAddon
IsCompatible
HasCapability
public Event Bus
public registries
public data helpers
public diagnostics
```

Do not reach for:

```text
Main
Main.ScenarioBridge
private partial methods
reflection into Political World internals
Harmony patches against Political World implementation
```

just because those internals are visible on GitHub.

Visible source is not the same as supported API.

## Why AI is especially likely to violate this

Coding models are good at finding a method that appears to solve the immediate task.

If both exist:

```text
PoliticalWorldAPI.SetKingdomGovernment(...)
Main.ScenarioBridge.SetKingdomGovernment(...)
```

the internal method may look shorter or expose more parameters.

That does not make it the correct dependency for an addon.

## Decision procedure

Before generating addon code:

```text
1. Identify the parent mod's supported public namespace/facade.
2. Check API compatibility.
3. Check capability for optional/newer functionality.
4. Search public API/reference/examples.
5. If the required operation is missing, state the missing capability.
6. Propose an API extension request.
7. Do not silently bypass the boundary.
```

## Exception — modifying the parent mod itself

If the task is explicitly:

> “Change Political World core.”

then internal modules are the correct target.

The same method can therefore be:

```text
wrong dependency for an addon
correct implementation detail for the parent mod
```

Context matters.

## Keep evidence scopes separate

The current Political World ecosystem also demonstrates version drift.

Before using a method, identify whether it exists in:

- the user's installed runtime;
- the exact source snapshot;
- an older API reference;
- a newer development build.

Do not generate code against the union of all observed versions.

## Best failure mode

If the public API cannot perform the requested feature, the best answer is:

```text
The current verified public API does not expose this operation.
Here is the capability that would need to be added.
```

That is better than producing brittle reflection code that works today and breaks the next time the parent mod is reorganized.
