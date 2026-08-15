---
title: WBML-0001 — addon data survives a full restart
description: The first WorldBox Modding Lab result promoted from source-backed expectation to runtime-verified behavior.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">🧪 WorldBox Modding Lab</span>
<span class="doc-status">WBML-0001</span>

WBML-0001 is the first finding produced specifically by **WorldBox Modding Lab** and promoted into WorldBox Modding Docs.

## Before the experiment

Political World source showed:

```text
addon-private int/string → Kingdom.data-backed path
bool → int
float → invariant string
private tags → addon-private namespace
shared tags → shared persistent key
```

That was strong source evidence.

But the docs deliberately stopped at:

```text
🧪 persistence runtime verification pending
```

because source intent is not the same as a completed save/load test.

## Experiment

The Lab wrote six state categories to kingdom `Iovalis` using only the public PoliticalWorldAPI.

Then:

```text
save
→ fully close WorldBox
→ new WorldBox process
→ load same save
→ F7 VERIFY
```

No second WRITE occurred before verification.

## Environment

```text
WorldBox          0.51.2
build             719
git               build-719@5dec
NeoModLoader      1.2.0.1
PoliticalWorldAPI 1.14.0
Lab               0.0.1
```

## Result

```text
int ............ PASS
Unicode string . PASS
bool ........... PASS
float .......... PASS
private tag .... PASS
shared tag ..... PASS

6/6 PASS
```

The Unicode payload:

```text
PW_SAVE_PROBE_Ж_ß_世界
```

returned unchanged.

## What changed in the documentation

Before:

```text
✅ source access pattern
🧪 runtime persistence pending
```

After:

```text
✅ runtime persistence verified
```

for the exact tested environment.

This is the core WorldBox Modding Lab workflow:

```text
question
→ minimal probe
→ Player.log
→ reproducible result
→ version-bound documentation
```

## Why the version binding matters

This result must not silently become:

> “PoliticalWorldAPI data always persists on every WorldBox version.”

The verified claim is narrower and stronger:

> It persisted on WorldBox 0.51.2 build 719 with NeoModLoader 1.2.0.1 and PoliticalWorldAPI 1.14.0 in WBML-0001.

Future compatibility runs can re-test the same claim after updates.

## Next question created by the success

Persistence in one save can still be implemented incorrectly if state leaks through static memory into another world.

Therefore WBML-0002 tests world isolation rather than repeating the same persistence test.
