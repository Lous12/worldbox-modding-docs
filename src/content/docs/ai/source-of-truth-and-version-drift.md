---
title: Source of truth and version drift for AI
description: How AI assistants should resolve conflicting WorldBox mod versions, source code, runtime logs, README files and llms.txt.
---

<span class="doc-status">🤖 AI-critical</span>
<span class="doc-status">✅ Real drift reproduced</span>

Documentation can become stale.

AI documentation can become stale too.

Political World currently provides a useful real example of why an AI assistant must not read one version string and assume the entire repository/runtime matches it.

## The reproduced mismatch

In the inspected Political World GitHub snapshot:

### Actual API source

`src/PoliticalWorld/API/PoliticalWorldAPI.cs` declares:

```csharp
public const string ApiVersion = "1.9.0";
public const int ApiMajor = 1;
public const int ApiMinor = 9;
```

### README

The root README also describes Public API **1.9.0**.

### mod.json

The mod package metadata is Political World **1.7.0** and its description refers to an internal API 1.9 candidate.

### AI_START_HERE.md

The root AI guide still says Public API **1.6** and tells assistants to use:

```text
IsCompatible(1, 6)
```

### llms.txt

The root `llms.txt` also still identifies the Public API as **1.6.0** and points readers toward the 1.6 reference.

### Separate local runtime evidence

A separate development `Player-prev.log` records a newer local runtime where:

```text
API: 1.14.0
Scenario Tools 0.3.0 loaded with PoliticalWorldAPI 1.14.0
```

That runtime evidence is newer than the inspected GitHub source snapshot.

## Correct conclusion

There is no single version number that can safely replace all of these observations.

The correct statements are:

```text
Inspected GitHub source snapshot:
  Political World 1.7.0
  PoliticalWorldAPI source constant 1.9.0

Stale AI entry files in that snapshot:
  still describe API 1.6.0

Separately observed local runtime:
  PoliticalWorldAPI 1.14.0
```

Do **not** rewrite that as:

```text
"Political World on GitHub is API 1.14."
```

That would combine different evidence sets into a false claim.

## Recommended source-of-truth order

For a question about what is actually compiled in a specific source snapshot:

1. **source constants / package metadata**;
2. build output if available;
3. README/reference generated for that same snapshot;
4. helper AI files such as `llms.txt`.

For a question about what was actually loaded in a real test:

1. **runtime log / runtime diagnostic output**;
2. exact installed package contents;
3. source commit or archive known to produce that package;
4. documentation.

## Runtime beats intention

A README can say “API 1.9”.

If `Player.log` from the tested installation says `API: 1.14.0`, then the runtime observation for **that installed test environment** is 1.14.0.

But that does not retroactively change an older GitHub commit.

## Always bind facts to an evidence scope

Good:

```text
Verified in WorldBox 0.51.2 build 719 using Political World 1.7.0,
local runtime reporting PoliticalWorldAPI 1.14.0.
```

Good:

```text
In GitHub tree ce0c917..., PoliticalWorldAPI.cs declares 1.9.0.
```

Bad:

```text
PoliticalWorldAPI is 1.14.0 everywhere.
```

## AI decision procedure

When two files disagree:

```text
1. Identify what each file describes.
2. Identify its snapshot/build/runtime.
3. Prefer executable/source evidence for compile-time facts.
4. Prefer runtime evidence for loaded-runtime facts.
5. Keep both facts if they belong to different snapshots.
6. Mark stale documentation instead of silently "fixing" history.
7. Never merge planned, source, and runtime versions into one guessed state.
```

## Why this belongs in the general WorldBox docs

WorldBox mods are often distributed through ZIPs, Steam Workshop, GitHub, Discord test builds and local development folders at the same time.

Version drift is normal.

An AI assistant that ignores evidence scope can generate code against an API that exists in one copy of a mod but not another.

The solution is not “trust AI less”.

The solution is to make **version provenance part of the documentation format**.
