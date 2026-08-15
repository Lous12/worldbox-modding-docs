---
title: PoliticalWorldAPI Event Bus
description: Source-backed reference for Political World's addon event subscriptions and callback safety.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">Political World GitHub snapshot ce0c917</span>
<span class="doc-status">API source generation 1.9.0</span>

Political World exposes an event-driven extension surface through:

```csharp
Lous12.PoliticalWorld.PoliticalWorldAPI
```

The Event Bus exists so an addon can react to political transitions without maintaining its own permanent world scan.

## Public subscription surface

The relevant public methods are:

```csharp
PoliticalWorldAPI.GetEventIds()
PoliticalWorldAPI.Subscribe(addonId, eventId, handler)
PoliticalWorldAPI.Unsubscribe(addonId, eventId, handler)
PoliticalWorldAPI.UnsubscribeAll(addonId)
```

The addon must already be registered with `RegisterAddon(...)`.

A wildcard event ID is available through:

```csharp
PoliticalWorldAPI.Events.All
```

Use the wildcard when you intentionally want every Political World event. Do not use it by default when only one or two event types are relevant.

## Event IDs verified in the inspected source

The Event Bus defines IDs for these transition families:

```text
kingdom.ideology.changed
kingdom.current.changed
kingdom.government.changed

party.created
party.activated
party.deactivated
party.renamed
party.ideology.changed
party.leader.changed
party.radicalism.changed
party.support.changed

kingdom.ruling-party.changed
kingdom.ruler.changed
kingdom.election.finished

kingdom.crisis.started
kingdom.crisis.ended
kingdom.leadership-crisis.started
kingdom.leadership-crisis.resolved

kingdom.rare-political-event.fired
political.event.published
```

Call `GetEventIds()` instead of copying this list into compatibility-sensitive code.

## Event payload

`PoliticalEventData` can carry:

- event ID;
- `Kingdom` reference and display name;
- old/new string values;
- old/new integer values;
- party ID;
- actor reference, identity and name;
- old/new names;
- source addon ID;
- category;
- year;
- text and event key.

Not every event fills every field.

Treat unused fields as optional.

## Subscription validation

The inspected source rejects a subscription when:

- the addon is not registered;
- the handler is null;
- the event ID is unknown and is not the wildcard;
- the exact same addon + handler subscription already exists.

Unknown event IDs and duplicate subscriptions are recorded through diagnostics.

## Callback isolation

Each subscriber callback is invoked inside its own `try/catch`.

If addon A throws an exception:

```text
addon A callback → exception
```

Political World records a callback error and continues dispatching other subscribers.

A broken addon callback should therefore not prevent addon B from receiving the same event.

## Snapshot before dispatch

Before iterating subscribers, the Event Bus copies the current subscription list.

This is important because a callback may subscribe or unsubscribe while an event is being dispatched.

Iterating a snapshot avoids mutating the active collection during the loop.

## Payload cloning

Each callback receives a new `PoliticalEventData` object.

The object contains the same referenced `Kingdom`/`Actor` objects, but scalar/string event fields are copied into a fresh payload object.

This prevents one subscriber from changing the payload object seen by later subscribers.

It does **not** make the referenced WorldBox objects immutable.

## Recursive dispatch protection

The Event Bus tracks nested dispatch depth.

The inspected source caps nested dispatch at:

```text
16
```

If a callback causes events that cause more events recursively beyond that limit, dispatch is stopped and an error is logged.

This protects the API from an event recursion loop similar in shape to ordinary recursive call bugs.

## Fast no-subscriber exit

Core event emission first checks whether anyone subscribes to:

- that exact event; or
- the wildcard.

If nobody is listening, the Event Bus returns before constructing and dispatching the full event payload.

## Minimal addon example

```csharp
using NeoModLoader.api;
using Lous12.PoliticalWorld;

public class Main : BasicMod<Main>
{
    private const string AddonId = "Example.EventAddon";

    protected override void OnModLoad()
    {
        if (!PoliticalWorldAPI.IsCompatible(1, 6))
            return;

        if (!PoliticalWorldAPI.RegisterAddon(
            new PoliticalWorldAPI.AddonDefinition
            {
                Id = AddonId,
                Name = "Event Addon",
                Version = "1.0.0",
                Author = "Example"
            }))
            return;

        PoliticalWorldAPI.Subscribe(
            AddonId,
            PoliticalWorldAPI.Events.GovernmentChanged,
            OnGovernmentChanged
        );
    }

    private static void OnGovernmentChanged(
        PoliticalWorldAPI.PoliticalEventData data)
    {
        if (data == null)
            return;

        // React only to the transition.
    }
}
```

The `IsCompatible(1, 6)` value above mirrors the repository's current example and therefore represents a **minimum compatibility requirement**, not the source's current API version.

See [Source of truth and version drift for AI](../ai/source-of-truth-and-version-drift/).

## General design lesson

An event API is more than a delegate list.

A robust public bus should define:

1. stable event IDs;
2. ownership/registration rules;
3. callback isolation;
4. mutation-safe dispatch;
5. recursion protection;
6. diagnostics;
7. a way to discover supported events.
