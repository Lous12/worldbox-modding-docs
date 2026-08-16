---
title: NeoModLoader listener construction failures
description: What a “Failed to construct listener instance” line proves and what it does not prove.
---

# NeoModLoader listener construction failures

A line like:

```text
[NML]: Failed to construct listener instance of ...
```

means NeoModLoader attempted to construct a listener type and that construction failed.

## What to do

- Capture the full listener type name.
- Check whether the listener belongs to your mod, NeoModLoader itself, or another mod.
- Look for an exception immediately around the same part of the log.
- Do not automatically blame your mod if the type belongs to another assembly.
- Re-test with the smallest mod set only when isolation is necessary.

The line alone does not prove that every NML event is broken. Treat it as a scoped construction failure until surrounding evidence says more.
