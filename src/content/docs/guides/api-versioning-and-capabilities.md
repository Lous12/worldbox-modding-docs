---
title: API versioning and capability checks
description: How to separate breaking API versions, minimum compatibility, and optional feature discovery.
---

<span class="doc-status">✅ Source + repository policy verified</span>
<span class="doc-status">⚠️ Version drift documented</span>

Political World versions the **core mod** and **public API** independently.

That distinction is essential for an addon ecosystem.

## Version policy

The repository's `API_VERSIONING.md` defines the intended API 1.x policy:

```text
major → breaking public contract
minor → backward-compatible public additions
patch → fixes that do not intentionally break documented public contracts
```

The same file's "current candidate" number is stale in the inspected snapshot, so use it for the **policy**, not as the source of truth for the current API number.

In the inspected source:

```csharp
ApiMajor = 1
ApiMinor = 9
ApiVersion = "1.9.0"
```

## Request the minimum API you need

The compatibility method is:

```csharp
PoliticalWorldAPI.IsCompatible(requiredMajor, requiredMinor)
```

Its inspected logic is:

```text
required major must equal current major
current minor must be >= required minor
```

Therefore an addon written against API 1.6 features can correctly request:

```csharp
if (!PoliticalWorldAPI.IsCompatible(1, 6))
    return;
```

even when running on API 1.9.

The argument is a **minimum requirement**, not a declaration of the installed API.

## Why not require the latest minor

Suppose your addon only needs features introduced in API 1.6.

This is unnecessarily strict:

```csharp
IsCompatible(1, 9)
```

It prevents users on 1.6–1.8 from running an addon that could otherwise work.

Choose the first minor version that introduced your required public contract.

## Optional features: use capabilities

For functionality that is optional or added in a later minor, prefer:

```csharp
PoliticalWorldAPI.HasCapability("political-event.rare")
```

instead of branching only on version numbers.

The inspected API also exposes:

```csharp
PoliticalWorldAPI.GetCapabilities()
```

## Why capabilities are useful

A version answers:

> “Which API generation is this?”

A capability answers:

> “Can this runtime perform the operation I need?”

The second question is often what addon code actually cares about.

Example:

```csharp
if (PoliticalWorldAPI.HasCapability("event.subscribe"))
{
    // install event-driven integration
}
else
{
    // disable only this optional feature
}
```

## Capability lookup cost

In the inspected source, capability checks use a lazily-created `HashSet<string>` with ordinal comparison.

That makes repeated `HasCapability(...)` checks effectively O(1) rather than scanning the array every time.

## Capabilities verified in source

The inspected API advertises capabilities covering areas including:

```text
addon.registry
action.registry
ideology.read
ideology.register
government.read
government.register
kingdom.read
kingdom.write
kingdom.addon-data
kingdom.addon-data.typed
localization.safe
localization.fallback
localization.register
content.batch-register
party.read
party.write
event.publish
event.subscribe
event.core-hooks
political-event.rare
diagnostics
validation
```

Use `GetCapabilities()` at runtime if exact availability matters.

## Deprecation policy

The repository versioning policy recommends, before removing a public 1.x member:

```text
1. add replacement
2. mark/document old member as deprecated
3. keep it functional during a migration window when practical
4. remove it only in a future breaking major API
   unless correctness/safety requires otherwise
```

That is how a framework can evolve without forcing every addon author to update on the same day.

## Internal code is not covered

API compatibility guarantees apply to the public contract.

They do not guarantee stability for:

```text
Main
ScenarioBridge
private methods
internal classes
folder layout
```

An addon depending on internals opts out of the public versioning contract.

## General rule

Use two checks for two different jobs:

```text
IsCompatible → minimum contract
HasCapability → optional feature
```

Do not use one as a substitute for the other.
