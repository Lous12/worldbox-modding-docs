---
title: StackOverflow during initialization
description: How to recognize and isolate recursive initialization loops in WorldBox mods.
---

<span class="doc-status">✅ Pattern reproduced in Political World</span>
<span class="doc-status">💥 Troubleshooting</span>

A `StackOverflow` during startup, world initialization, kingdom creation, or another first-time setup step often means that a small group of methods is calling itself indirectly.

## Typical shape

```text
A()
 ↓
B()
 ↓
C()
 ↓
A()
 ↓
B()
 ↓
C()
 ...
```

The source does not need to contain an obvious direct call such as `A() { A(); }`.

Indirect recursion is more common in real mod code.

## Common sources

### Getter initializes missing state

```csharp
Thing GetThing()
{
    if (thing == null)
        SetThing(CreateThing());

    return thing;
}
```

If `SetThing()` eventually calls `GetThing()`, the loop is complete.

### Setter emits a callback

```text
SetState()
  → event/callback
  → listener reads State
  → getter tries to initialize
  → SetState()
```

### Harmony re-entry

A Prefix or Postfix may call a method that eventually reaches the patched method again.

The fix is not always "remove Harmony". First prove where the cycle occurs.

## How to debug

1. Find the smallest repeating sequence of methods in the stack/log.
2. Draw arrows between them on paper or in a note.
3. Mark which functions **read** state and which **mutate** state.
4. Look for a read function that secretly mutates or initializes.
5. Create a one-shot initialization function with a guard.
6. Make getters return data instead of trying to repair the entire object graph.
7. Re-test the exact first-time scenario that originally failed.

## Guard example

A guard can prevent accidental re-entry:

```csharp
private bool _initializing;

void EnsureInitialized()
{
    if (_initialized || _initializing)
        return;

    _initializing = true;
    try
    {
        // initialize without calling getters that can enter this method again
        _initialized = true;
    }
    finally
    {
        _initializing = false;
    }
}
```

A guard is **not** a substitute for understanding the cycle. It is a safety layer after the initialization dependencies are made sane.

## Real case

Political World reproduced this pattern when government data was missing for a newly created kingdom.

See: [Political World — government initialization recursion](../case-studies/political-world-government-recursion/).
