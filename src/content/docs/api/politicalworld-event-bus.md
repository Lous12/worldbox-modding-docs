---
title: PoliticalWorldAPI Event Bus
description: Beginner-oriented Political World event subscriptions with WBML-0004 runtime evidence and source/runtime drift boundaries.
---

<span class="doc-status">✅ Runtime verified — API 1.14.0</span>
<span class="doc-status">WBML-0004</span>
<span class="doc-status">⚠️ Older inspected source: API 1.9.0</span>

The PoliticalWorldAPI Event Bus lets your addon react to political changes **when they happen** instead of scanning every kingdom every frame.

For a beginner, think of it as:

```text
Political World changes something
        ↓
publishes event ID + payload
        ↓
your subscribed callback runs
```

## Public surface

The inspected creator API exposes the following event-facing methods:

```csharp
PoliticalWorldAPI.GetEventIds()
PoliticalWorldAPI.Subscribe(addonId, eventId, handler)
PoliticalWorldAPI.Unsubscribe(addonId, eventId, handler)
PoliticalWorldAPI.UnsubscribeAll(addonId)
```

and a wildcard event selector:

```csharp
PoliticalWorldAPI.Events.All
```

Your addon must be registered before subscribing.

## Minimal example

```csharp
private const string AddonId = "Example.EventAddon";

protected override void OnModLoad()
{
    // Register the addon first.

    PoliticalWorldAPI.Subscribe(
        AddonId,
        "party.renamed",
        OnPartyRenamed
    );
}

private static void OnPartyRenamed(
    PoliticalWorldAPI.PoliticalEventData data)
{
    if (data == null)
        return;

    // For the tested API 1.14.0 rename payload,
    // old/new party names were in OldValue/NewValue.
    string oldName = data.OldValue;
    string newName = data.NewValue;
}
```

Do not assume every event uses the same fields. Inspect or document the payload contract for the specific event you consume.

## Runtime discovery: 23 event IDs

The older inspected API 1.9 source snapshot contained a known-event list of 20 IDs.

WBML-0004 called `GetEventIds()` on the installed API 1.14.0 runtime and received:

```text
23 event IDs
```

It also verified that the returned array/list was defensive: mutating one retrieved collection did not corrupt a subsequent result.

Practical lesson:

> When runtime discovery exists, prefer it over hard-coding an old source snapshot's event count.

## Source/runtime drift: custom or unknown event ID

The inspected API 1.9 source suggested an unknown event subscription should be rejected.

The tested API 1.14.0 runtime instead accepted a unique WBML custom/unknown event ID. The Lab then removed that subscription successfully.

Status:

```text
✅ Verified for runtime 1.14.0: unique custom/unknown subscription was accepted and removable
⚠️ Source 1.9 behavior differs
```

This is exactly why this documentation keeps source version and runtime version separate.

## Null handlers and duplicate subscriptions

WBML-0004 verified:

```text
Subscribe(..., null) → rejected
same addon + same event + same handler subscribed twice → duplicate rejected/ignored
```

The duplicate path was also reflected in diagnostics.

## Exact and wildcard subscribers

The Lab subscribed both:

```text
party.renamed
*
```

and verified that both received the tested rename event exactly once in the basic dispatch phase.

Use wildcard subscriptions only when you really need a broad stream. An exact event ID is easier to reason about and produces less addon-side filtering work.

## `party.renamed` payload mapping on API 1.14.0

This was one of the most useful runtime discoveries.

The first harness expected:

```text
OldName / NewName
```

but runtime API 1.14.0 produced the tested party rename values in:

```text
OldValue / NewValue
```

while `OldName` and `NewName` were empty.

The corrected probe treated the actual runtime mapping as evidence rather than forcing the older assumption.

Do not generalize this mapping to unrelated event IDs without testing them.

## Payload isolation between subscribers

WBML-0004 installed a mutating subscriber before an observing subscriber.

The first callback changed fields in **its own** `PoliticalEventData` payload. The observer did not see the mutation.

Result:

```text
subscriber A payload mutation
≠ subscriber B payload object
```

This verifies per-subscriber payload-object isolation for the tested dispatch path.

Important limit:

> `PoliticalEventData` may still contain references to live WorldBox objects such as a `Kingdom`. Payload cloning does not make those referenced game objects immutable.

## Callback exception isolation

A Lab subscriber intentionally threw:

```text
WBML_INTENTIONAL_CALLBACK_EXCEPTION
```

The Event Bus recorded the callback error, but the healthy subscriber still ran for the same event.

WBML also verified that the addon diagnostics `CallbackErrors` count increased.

Practical rule:

> One broken callback should not be relied upon to stop the rest of the Event Bus. Handle your own errors and do not use exceptions as control flow.

## Unsubscribe while dispatching

WBML-0004 tested a callback that unsubscribed itself during dispatch.

The peer observer still received the current dispatch, and later dispatches reflected the removal.

This matches snapshot-style dispatch behavior and avoids collection-modified iteration failures.

The suite also verified `UnsubscribeAll(addonId)` cleanup.

## Recursive dispatch guard

The Lab asked a callback to recursively cause up to 64 rename events.

Runtime result:

```text
requested: 64
recursive callbacks observed: 16
tail subscriber callbacks: 16
```

The guard stopped recursion before 64, and the independent tail subscriber still received the accepted dispatches.

For this exact runtime, the observed limit matches the older inspected source constant of 16.

Do not write addon logic that depends on reaching the guard. Avoid recursion in the first place.

## 100-dispatch stress probe

WBML-0004 then performed 100 sequential test writes that generated the targeted event.

Result:

```text
writes accepted: 100/100
callbacks:       100
observed time:   33 ms
```

The callback count is part of the verified behavior of that run.

The 33 ms number is **not** a benchmark guarantee. Hardware, world state, other mods, logging and future versions can all change it.

## What WBML-0004 proved

For the tested stack:

```text
✅ runtime event discovery works
✅ returned event-ID collection is defensively copied
✅ tested custom/unknown subscription accepted
✅ null handler rejected
✅ duplicate exact subscription rejected/ignored
✅ exact + wildcard delivery works
✅ party.renamed tested mapping is OldValue/NewValue
✅ subscriber payload-object mutations are isolated
✅ callback exception does not stop later healthy callback
✅ diagnostics records callback failure
✅ self-unsubscribe during dispatch works
✅ UnsubscribeAll removes the tested subscriptions
✅ recursive dispatch is bounded; observed depth 16
✅ 100 accepted test dispatches produced 100 callbacks
✅ final subscription cleanup reached zero
```

## What it did not prove

WBML-0004 did not exhaustively verify the payload schema of every one of the 23 runtime event IDs.

It also did not establish a stable performance budget from the one 33 ms observation.

## Harness mistakes worth preserving

The first Event Bus harness made two important mistakes:

1. it treated unknown-event rejection from the older source as a required runtime assertion;
2. after learning that rename values lived in `NewValue`, one fix still filtered recursive/stress events using only `NewName`.

That second mistake produced zero callbacks in Phase C. The result was rejected as a **harness bug**, not misreported as an Event Bus failure.

The final fix used runtime-aware rename value resolution and passed 68/68 assertions.

```text
PASS=68 FAIL=0 SKIP=0
```

## Evidence

- [WBML-0004 Event Bus Runtime Suite](../research/event-bus-runtime-suite/)
- [Sanitized WBML-0004 result](/worldbox-modding-docs/evidence/wbml-0004-result.txt)
