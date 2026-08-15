---
title: Political World — when AI documentation became stale
description: A case study where source, README, AI_START_HERE, llms.txt and a newer runtime represented different API generations.
---

<span class="doc-status">✅ Reproduced</span>
<span class="doc-status">🤖 AI failure prevention</span>

Political World already had unusually AI-friendly repository files:

```text
AI_START_HERE.md
llms.txt
API references
RU/EN documentation
examples/
templates/
```

That was good.

It still developed version drift.

## What drifted

In one inspected GitHub tree:

```text
PoliticalWorldAPI.cs → API 1.9.0
README.md            → API 1.9.0
AI_START_HERE.md     → API 1.6
llms.txt             → API 1.6.0
```

A separate newer runtime log from development later reported API 1.14.0.

## Why this is dangerous for coding assistants

An AI can follow instructions perfectly and still produce the wrong result if its entry file is stale.

For example, an assistant reading only `AI_START_HERE.md` could correctly obey:

```text
Check IsCompatible(1, 6)
Read API_REFERENCE_1_6.md
```

while ignoring capabilities already present in the inspected 1.9 source.

Conversely, an assistant given a newer runtime log might assume 1.14 APIs exist in the older public GitHub source.

Both errors come from missing **provenance**, not from syntax.

## Fix at the documentation-system level

AI entry files should carry machine-readable version metadata.

Example:

```yaml
project_version: 1.7.0
api_version: 1.9.0
source_commit: ce0c91754722dd1e88e8eaf116c4c667ae020204
verified_worldbox: 0.51.2-build-719
generated_from: source
last_verified: 2026-08-16
```

And CI should eventually compare the declared AI version against the actual code constant.

## Future automated check

For Political World, a simple verification script could extract:

```csharp
public const string ApiVersion = "..."
```

and compare it against:

```text
README
AI_START_HERE.md
llms.txt
API reference index
```

If they disagree, CI should fail or at least emit a documentation warning.

## Lesson

Creating `llms.txt` is not the finish line.

AI documentation needs the same maintenance discipline as public API documentation:

- version binding;
- automated consistency checks;
- explicit snapshot identity;
- stale markers;
- runtime evidence kept separate from source evidence.

The best AI-friendly documentation is not the one with the most text.

It is the one that makes it difficult for a model to combine incompatible facts.
