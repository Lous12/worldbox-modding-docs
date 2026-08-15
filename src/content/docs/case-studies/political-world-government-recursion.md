---
title: Political World — government initialization recursion
description: How first-time government initialization entered a recursive getter/setter loop and caused a StackOverflow.
---

<span class="doc-status">✅ Reproduced</span>
<span class="doc-status">💥 StackOverflow</span>
<span class="doc-status">Political World 1.7.0</span>

Political World once crashed after a secession because first-time government initialization entered an infinite recursive call chain.

This is one of the clearest examples in the project of why **lazy initialization inside getters** can become dangerous.

## Symptom

A kingdom created through secession could trigger a hard crash shortly after its political state was initialized.

The important clue was not a normal handled exception. The call chain repeatedly re-entered the same government initialization path until the process reached a `StackOverflow`.

## The recursive chain

The failing logic followed this shape:

```text
UpdateGovernmentForms()
    ↓
SetGovernmentForm()
    ↓
GetGovernmentPublicId()
    ↓
GetGovernmentForm()
    ↓
government data is missing
    ↓
SetGovernmentForm()
    ↓
GetGovernmentPublicId()
    ↓
...
```

The key problem was that a getter path attempted to repair missing state by calling the setter that depended on that getter.

## Why it only appeared on first initialization

Existing kingdoms already had government state.

A newly created kingdom could reach `GetGovernmentForm()` with no government assigned yet. The getter tried to initialize the missing value automatically, but the initialization path itself needed information obtained through the same getter family.

That converted a harmless-looking convenience behavior into infinite recursion.

## Fix

Political World removed the recursive getter dependency from the first initialization route.

The important design change was:

> first-time initialization must be able to complete without asking a getter to initialize the same state again.

After the fix, secession no longer produced the hard crash in the tested scenario.

## General lesson

Avoid this pattern:

```csharp
public Government GetGovernment()
{
    if (government == null)
        SetGovernment(CreateDefaultGovernment());

    return government;
}
```

when `SetGovernment(...)` or any helper it calls can eventually call `GetGovernment()` again.

A safer design is to separate responsibilities:

```text
EnsureGovernmentInitialized()
GetGovernment()
SetGovernment()
```

and guarantee that the initialization function uses only data that does not recursively depend on the same getter.

## Debugging rule

When a crash happens during initialization and the visible call sequence keeps repeating the same few methods, search for:

- getter → setter → getter cycles;
- property access that performs mutation;
- "ensure default" logic hidden inside read methods;
- Harmony patches that re-enter the method they patch;
- callbacks fired from setters that read the same state again.

## Evidence scope

This page documents a bug reproduced and fixed inside Political World's own government system. It does **not** claim that the named methods are vanilla WorldBox APIs.
