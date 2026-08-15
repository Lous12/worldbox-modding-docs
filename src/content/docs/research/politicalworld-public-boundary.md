---
title: PoliticalWorldAPI as a public boundary
description: Why Political World's public facade exists and why addons should not bypass it through Main, ScenarioBridge or reflection.
---

<span class="doc-status">✅ Source verified architecture</span>
<span class="doc-status">🧩 Framework design</span>

Political World's repository makes a strong architectural distinction between:

```text
public addon API
```

and:

```text
internal implementation
```

The supported third-party facade is:

```csharp
Lous12.PoliticalWorld.PoliticalWorldAPI
```

## Internal code may use internal bridges

Inside the core source, `PoliticalWorldAPI` itself delegates many operations to internal systems such as `Main.ScenarioBridge`.

That is expected.

The important direction is:

```text
third-party addon
    ↓
PoliticalWorldAPI
    ↓
internal Political World implementation
```

not:

```text
third-party addon
    ↓
Main.ScenarioBridge
```

## Why the facade matters

Internal code is free to be reorganized.

A stable facade can preserve:

- method names;
- validation;
- capability checks;
- ownership rules;
- diagnostics;
- compatibility guarantees;

even if the internal implementation changes.

If every addon reflects into internal classes, an internal refactor becomes an ecosystem-breaking API change.

## Register before using owned content

The API validates addon identity before subscriptions and owned-content registration.

`RegisterAddon(...)` validates:

- non-empty ID;
- allowed characters;
- length and start/end rules;
- reserved core ID;
- duplicates;
- addon name.

A missing namespace separator is currently a warning rather than a hard error.

## Content ownership

Ideology/action/event registration validates that an owned content ID belongs to the addon namespace.

The exact accepted ownership separators in the inspected source include:

```text
.
:
_
```

after the addon ID.

The general purpose is preventing one addon from registering content under another addon's identity.

## Capabilities instead of guessing version features

The API exposes:

```csharp
GetCapabilities()
HasCapability(...)
IsCompatible(requiredMajor, requiredMinor)
```

The inspected source advertises capabilities for areas such as:

- addon registry;
- ideology/government/action registration;
- kingdom reads/writes and addon-private data;
- localization;
- party operations;
- event publish/subscribe;
- rare events;
- diagnostics;
- validation.

An addon that depends on an optional/newer feature should test the capability rather than assuming every API 1.x build has it.

## When the facade is missing something

The repository architecture states the intended response:

> Add a safe capability to the public API instead of teaching consumers to bypass it.

This is an important framework rule.

A first-party addon needing internal reflection is also a signal that the public facade may be incomplete.

## General lesson for other mods

If you expect an addon ecosystem, define the boundary early.

A public API is not merely a collection of helper functions.

It is the compatibility contract between:

```text
your refactorable internals
```

and:

```text
other people's code that you do not control
```
