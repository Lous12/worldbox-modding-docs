---
title: Kingdom.data custom value helpers
description: How Political World wraps custom kingdom integer and string data, and what still requires save/load verification.
---

<span class="doc-status">✅ Source verified access pattern</span>
<span class="doc-status">🧪 Save/load semantics require targeted tests</span>

Political World uses `Kingdom.data` to read and write custom values associated with a kingdom.

Its shared helper module is:

```text
Core/Persistence/KingdomData.Helpers.cs
```

## Integer helper pattern

The source uses:

```csharp
kingdom.data.get(key, out value, fallback);
kingdom.data.set(key, value);
```

inside wrappers that first check:

```csharp
kingdom == null || kingdom.data == null
```

and fall back safely if access throws.

A simplified version:

```csharp
static int GetKingdomInt(
    Kingdom kingdom,
    string key,
    int fallback)
{
    if (kingdom == null || kingdom.data == null)
        return fallback;

    int value = fallback;

    try
    {
        kingdom.data.get(key, out value, fallback);
    }
    catch
    {
        value = fallback;
    }

    return value;
}
```

## String helper pattern

The same design is used for strings:

```csharp
kingdom.data.get(key, out value, fallback);
kingdom.data.set(key, value ?? "");
```

## Why centralize this

A helper layer gives the project one place to define:

- null handling;
- fallback behavior;
- exception behavior;
- key naming;
- future migration logic;
- logging policy.

It also reduces hundreds of repeated raw `kingdom.data` calls.

## Namespace your keys

For addon/private data, avoid generic keys such as:

```text
level
state
enabled
```

Prefer stable namespaced identifiers, for example:

```text
com.example.myaddon.level
com.example.myaddon.enabled
```

The exact naming convention is your choice; the important part is preventing accidental collisions with other mods.

## What this page does NOT prove yet

The source location is named `Persistence`, and Political World architecture describes these as save helpers.

However, **this page does not claim that every arbitrary custom type/key has been freshly verified through a save → exit → reload round trip**.

For a new mod or a new data type, run a targeted persistence probe:

```text
1. write a known value;
2. save world;
3. fully leave/restart as needed;
4. load the save;
5. read the same key;
6. verify value and type;
7. repeat after kingdom destruction/recreation if relevant.
```

This distinction is intentional:

- **Verified:** Political World source uses `Kingdom.data.get/set` through these helpers.
- **Not yet universally verified:** every save/load edge case for every possible custom value.

## Migration matters

Once a key ships in public saves, changing its name is not merely refactoring.

Treat data keys like a compatibility surface. If a key must change, define a migration path.
