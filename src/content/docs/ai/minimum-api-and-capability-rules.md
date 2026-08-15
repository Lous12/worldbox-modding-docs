---
title: Minimum API and capability rules for AI
description: How AI assistants should select compatibility requirements without confusing minimum version, current version, and optional capabilities.
---

<span class="doc-status">🤖 AI-critical</span>
<span class="doc-status">✅ Source-backed</span>

AI-generated addon code commonly makes one of two opposite mistakes:

```text
require an API version newer than necessary
```

or:

```text
use a newer feature while checking an older minimum version
```

Political World's compatibility model lets an assistant avoid both.

## Rule 1 — determine the required public members first

Do not start by copying the current API version.

First list what the generated addon actually uses.

Example:

```text
RegisterAddon
Subscribe
GetDiagnosticsReport
```

Then determine the oldest documented API minor that supports that set.

That becomes the `IsCompatible(...)` minimum.

## Rule 2 — current version is not the minimum version

These are different statements:

```text
Installed/source API: 1.9
Addon requires: API 1.6+
```

Both can be true.

Do not "correct" this:

```csharp
IsCompatible(1, 6)
```

to:

```csharp
IsCompatible(1, 9)
```

just because the source constant currently says 1.9.0.

## Rule 3 — optional feature → capability check

If a feature is not required for the whole addon:

```csharp
if (PoliticalWorldAPI.HasCapability("political-event.rare"))
{
    // enable optional rare-event integration
}
```

Do not make the entire addon fail to load if only one optional feature is unavailable.

## Rule 4 — capability names must be verified

Do not invent:

```text
government.super-advanced-api
```

because it sounds plausible.

Use:

```csharp
PoliticalWorldAPI.GetCapabilities()
```

or verified documentation/source.

## Rule 5 — stale docs are evidence, not authority

In the inspected Political World snapshot:

```text
source API constant → 1.9.0
some AI/versioning docs → 1.6.0
```

A model should preserve the distinction and determine whether `1.6` is:

- a stale "current version" claim;
- or a valid minimum compatibility example.

Those are different semantic roles.

## Rule 6 — never target the union of multiple snapshots

If one runtime log mentions API 1.14 and an older source snapshot contains API 1.9, do not generate code using all methods ever observed unless the user's installed target is known to support them.

## Recommended generated-code pattern

```csharp
if (!PoliticalWorldAPI.IsCompatible(REQUIRED_MAJOR, REQUIRED_MINOR))
{
    // disable addon / log clear requirement
    return;
}

if (!PoliticalWorldAPI.RegisterAddon(...))
{
    return;
}

if (PoliticalWorldAPI.HasCapability("optional.feature"))
{
    // enable only the optional integration
}
```

## Best AI behavior when introduction version is unknown

Say:

```text
This member is verified to exist in the inspected API 1.9 source,
but its exact introduction minor is not established by the current evidence.
Do not lower the minimum compatibility requirement without checking version history.
```

That is better than guessing.
