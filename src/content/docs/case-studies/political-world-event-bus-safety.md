---
title: Political World — hardening a public Event Bus
description: What Political World does so one addon cannot easily break every other Event Bus subscriber.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🧯 Failure containment</span>

A naive mod Event Bus can be written in a few lines:

```csharp
foreach (var callback in subscribers)
    callback(data);
```

For a private project, that may be enough.

For a public addon framework, it creates several failure modes.

Political World's Event Bus contains defenses for four of them.

## Failure 1 — one callback throws

Naive result:

```text
subscriber A throws
→ dispatch stops
→ B and C never run
→ exception escapes into core
```

Political World invokes every subscriber separately inside `try/catch`.

The failure is attributed to the addon through diagnostics and dispatch continues.

## Failure 2 — callback mutates subscriptions

Naive result:

```text
foreach live List
→ callback unsubscribes
→ collection changes during iteration
```

Political World creates a list snapshot before dispatch.

Changes affect future dispatches rather than corrupting the current loop.

## Failure 3 — subscriber mutates shared event payload

If every subscriber receives the exact same mutable payload object:

```text
A changes data.NewValue
→ B sees modified payload
```

Political World clones `PoliticalEventData` for each callback.

Important limitation: embedded `Kingdom` and `Actor` references still point to live WorldBox objects.

## Failure 4 — callback causes an event recursion loop

Example:

```text
government changed event
→ addon writes government
→ government changed event
→ addon writes government
→ ...
```

Political World tracks nested event dispatch depth and stops after depth 16.

The exact number is an implementation detail of the inspected snapshot, but the general protection is the important part.

## Additional defense — known event IDs

A subscriber cannot silently subscribe to an arbitrary typo.

Unknown IDs are rejected and a diagnostic error is recorded.

## What this does not solve

An event framework cannot automatically make arbitrary addon code safe.

A callback can still:

- do expensive work;
- mutate live game objects;
- create logical loops below the depth limit;
- hold references longer than intended;
- cause side effects unrelated to the event.

The Event Bus is failure containment, not a sandbox.

## Documentation lesson

When documenting an extension API, document not only:

> “Call Subscribe.”

Also document:

- callback failure behavior;
- mutation behavior;
- ordering assumptions;
- recursion limits;
- ownership/registration rules;
- payload lifetime and mutability.

Those details determine whether multiple community addons can coexist.
