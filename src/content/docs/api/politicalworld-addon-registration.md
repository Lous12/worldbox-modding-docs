---
title: PoliticalWorldAPI addon registration
description: Source-backed rules for registering a Political World addon and owning public content IDs.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">Political World GitHub snapshot ce0c917</span>
<span class="doc-status">API source generation 1.9.0</span>

Before an addon can subscribe to Political World events or register owned content, it should register its identity through:

```csharp
PoliticalWorldAPI.RegisterAddon(...)
```

## Definition

The public definition contains:

```csharp
public sealed class AddonDefinition
{
    public string Id;
    public string Name;
    public string Version;
    public string Description;
    public string Author;
}
```

Minimal example:

```csharp
private const string AddonId = "YourName.MyAddon";

bool ok = PoliticalWorldAPI.RegisterAddon(
    new PoliticalWorldAPI.AddonDefinition
    {
        Id = AddonId,
        Name = "My Addon",
        Version = "0.1.0",
        Author = "YourName",
        Description = "Example addon"
    }
);
```

## Addon ID validation

The inspected source validates:

- ID is not empty;
- ID length is between 3 and 96 characters;
- only letters, numbers, `.`, `_` and `-` are allowed;
- ID begins and ends with a letter or number;
- the core ID `Lous12.PoliticalWorld` is reserved;
- duplicate addon IDs are rejected;
- Name is required.

A missing `.` namespace separator currently produces a warning rather than a hard registration failure.

Recommended:

```text
AuthorOrOrg.ProjectName
```

Example:

```text
YourName.MyPoliticalAddon
```

## Register once, then register content

The normal order is:

```text
1. Check API compatibility.
2. RegisterAddon.
3. Optionally check capabilities.
4. Register localization/content/events/actions.
5. Log diagnostics.
```

The repository's current getting-started example follows that order.

## Content ownership

Political World validates that addon-owned content IDs belong to the addon namespace.

Examples:

```text
YourName.MyAddon.technocracy
YourName.MyAddon:event_palace_crisis
YourName.MyAddon_action_example
```

The inspected validation accepts the addon ID followed by one of these ownership separators:

```text
.
:
_
```

The exact content-type validator may apply additional rules.

## Why ownership matters

Without ownership checks, addon A could accidentally or intentionally register:

```text
OtherAddon.some_content
```

That creates collisions and makes diagnostics/migration ambiguous.

A public registry should always be able to answer:

```text
Who owns this content ID?
```

## Registration is observable

Successful addon registration creates diagnostics state and records:

```text
PWDIAG001
```

with an addon-registered message.

That means registration is not merely a dictionary insert; it becomes visible to support tooling.

## Inspecting registered addons

The API exposes:

```csharp
PoliticalWorldAPI.IsAddonRegistered(addonId)
PoliticalWorldAPI.GetAddon(addonId)
PoliticalWorldAPI.GetRegisteredAddons()
```

Returned addon information is copied into public DTO objects rather than exposing the mutable internal registry entry directly.

## Stable IDs are compatibility data

An addon ID should not be treated as cosmetic text.

It can become part of:

- content IDs;
- localization keys;
- addon-private kingdom data namespaces;
- tags;
- diagnostics;
- save-compatible references.

Changing it later can require migration.

## General framework lesson

A public addon system should establish identity **before** content registration.

Identity gives the framework a stable unit for:

- ownership;
- diagnostics;
- collision prevention;
- permissions/rules;
- migrations;
- capability use;
- support reports.
