---
title: C# compile errors in NeoModLoader
description: Read CSxxxx errors from Player.log without guessing at runtime problems.
---

# C# compile errors in NeoModLoader

If `Player.log` contains a compiler code such as:

```text
error CS0103
error CS0117
error CS0246
```

the mod has a **compile-time** problem. Fix that before debugging runtime behavior.

## First checks

1. Read the **first compiler error** in the mod's compile block.
2. Note the `CSxxxx` code and the file/line if present.
3. Fix missing names/types/members before chasing later errors; one early syntax/type failure can create many secondary messages.
4. Confirm that the API/member you are calling exists on the version actually loaded by the game.
5. Run again and make sure the compiler-error group disappears.

## Common categories

- `CS0103` — a name is not available in the current context.
- `CS0117` / `CS1061` — a type/object does not expose the member you tried to call.
- `CS0246` — a type or namespace could not be resolved.
- syntax codes — often produce a cascade; start with the earliest one.

These descriptions are navigation hints, not a substitute for the full compiler message.

## Version-sensitive API

When a missing member belongs to NeoModLoader, WorldBox internals or PoliticalWorldAPI, compare your code with the **runtime/version** shown in the log. Do not silently replace a missing member with one remembered from another version.

Use the [API Explorer](../../workbench/api-explorer/) for the currently verified PoliticalWorldAPI baseline.
