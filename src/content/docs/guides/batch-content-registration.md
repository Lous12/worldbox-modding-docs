---
title: Batch-register addon content safely
description: How Political World's creator API reports partial success when registering multiple definitions.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🧰 Creator helper</span>

Registering twenty pieces of addon content one by one creates repetitive code and makes partial failure easy to miss.

Political World's creator API provides batch helpers for:

```csharp
RegisterIdeologies(...)
RegisterGovernments(...)
RegisterActions(...)
RegisterRarePoliticalEvents(...)
```

## Result object

The inspected source returns:

```csharp
public sealed class BatchRegistrationResult
{
    public int Requested;
    public int Registered;
    public List<string> FailedIds;

    public bool AllSucceeded { get; }
}
```

## Example

```csharp
var result = PoliticalWorldAPI.RegisterIdeologies(
    AddonId,
    new[]
    {
        ideologyA,
        ideologyB,
        ideologyC
    }
);

if (!result.AllSucceeded)
{
    foreach (string failedId in result.FailedIds)
    {
        LogWarning("Failed ideology: " + failedId);
    }
}
```

## Partial success is preserved

The helper does not turn one failed item into an exception that discards every earlier success.

For every definition:

```text
Requested++
try registration
    success → Registered++
    failure → FailedIds.Add(id)
```

A thrown registration exception is treated as failure for that item.

## Why this matters

A creator needs to distinguish:

```text
requested 20
registered 19
failed 1
```

from:

```text
register everything returned false
```

The first contains enough information for useful diagnostics.

## Batch registration is not a transaction

The inspected helper does **not** roll back already-registered content when a later definition fails.

Therefore:

```text
AllSucceeded == false
```

can still mean several definitions successfully entered the registry.

If your addon requires all-or-nothing semantics, pre-validate the whole set or implement explicit rollback logic using supported APIs where possible.

## Use stable IDs in FailedIds

A failed content ID is much easier to investigate than an array index:

```text
YourName.MyAddon.technocracy
```

instead of:

```text
item 17
```

Stable IDs make logs searchable by humans and AI.

## General framework lesson

Bulk creator APIs should report **structured partial results**.

Useful fields are:

- attempted/requested count;
- successful count;
- failed stable IDs;
- optionally diagnostic codes/reasons.

This makes large content packs much easier to maintain.
