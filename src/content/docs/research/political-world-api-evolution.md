---
title: Political World API evolution model
description: Source-backed notes on how Political World separates core version, public contract, capabilities and deprecation.
---

<span class="doc-status">✅ Source + repository policy verified</span>
<span class="doc-status">📈 Framework evolution</span>

Political World contains a useful distinction that many small mods postpone until too late:

```text
mod version ≠ public API version
```

The inspected package metadata identifies the core as 1.7.0 while the inspected API source declares 1.9.0.

A separate newer development runtime has also been observed with API 1.14.0.

These facts belong to different evidence scopes and should remain separate.

## Four layers of evolution

A maintainable addon framework needs to track at least:

### 1. Core version

The product/mod release.

Example:

```text
Political World 1.7.0
```

### 2. Public API contract

The versioned surface other addons compile against.

Example in inspected source:

```text
PoliticalWorldAPI 1.9.0
```

### 3. Capabilities

Fine-grained runtime feature discovery.

Example:

```text
event.subscribe
localization.register
content.batch-register
diagnostics
```

### 4. Internal implementation

Refactorable code not covered by the public compatibility promise.

Example:

```text
Main.ScenarioBridge
folder structure
private partial methods
internal registries
```

## Why independent versions help

The core can release gameplay fixes without changing the API contract.

The API can gain creator features without requiring a major gameplay release.

An addon can ask for the minimum public contract it needs instead of matching the full mod version.

## Capability growth without hard dependency

A new API minor can add:

```text
new optional capability
```

Older addons remain compatible because they never request it.

Newer addons can probe:

```csharp
HasCapability(...)
```

and degrade only the optional feature.

## Documentation must move with source

The current repository itself demonstrates the risk: source and README reached API 1.9 while several AI/versioning entry documents still described 1.6.

The architecture is sound; the documentation pipeline needs consistency checks.

## Future CI opportunity

WorldBox Modding Docs should eventually demonstrate a check that compares:

```text
source ApiVersion
README API badge/text
AI_START_HERE
llms.txt
API_VERSIONING
reference index
```

A mismatch should produce a build warning or failure.

## Deprecation is part of compatibility

A stable API is not one that never changes.

It is one that tells consumers:

- what changed;
- when it changed;
- what replaces the old member;
- how long the migration window lasts;
- which major release may remove it.

## General lesson

The moment another mod depends on your code, versioning becomes architecture.

Do not wait for the first breaking update to invent the rules.
