---
title: Event-driven addons instead of permanent polling
description: When to use Political World's Event Bus and Rare Event registry instead of creating another Update loop.
---

<span class="doc-status">✅ Source-backed architecture pattern</span>
<span class="doc-status">⚡ Performance</span>

One of Political World's public-API goals is explicit in its source:

> common addon logic should be possible without polling or internal APIs.

There are two different public patterns for that.

## Pattern A — react to something that already happened

Use the Event Bus.

Example:

```text
Government changes
        ↓
Political World emits kingdom.government.changed
        ↓
Your addon callback runs once
```

You do **not** need:

```csharp
void Update()
{
    foreach (Kingdom kingdom in everyKingdom)
    {
        // Did its government change since last frame?
    }
}
```

## Pattern B — occasionally test a condition

Use the Rare Political Event registry when the mechanic fits kingdom-level, year-scale checks.

The inspected registry is evaluated from Political World's **existing** political pipeline.

Addon code registers:

```text
event ID
check interval in years
cooldown in years
chance per 1000
optional Condition callback
Handler callback
```

The addon does not need its own world-wide `Update()`.

## Rare Event evaluation is bounded by world year

The registry refuses to perform its full evaluation more than once for the same world year.

For every registered event/kingdom it additionally respects:

- first-check behavior;
- `CheckIntervalYears`;
- `CooldownYears`;
- optional condition;
- `ChancePermille`.

## Callback failures are isolated

Both the rare-event condition and handler are wrapped.

A failing addon callback is recorded through diagnostics rather than being allowed to unwind through the entire core pipeline.

## Record failure attempts before invoking addon code

Before running a rare-event handler, the registry stores the current year as the last-fire year.

Why?

Without that order:

```text
handler throws
↓
last-fire never recorded
↓
event is immediately eligible again
↓
same broken callback can spam repeatedly
```

By recording the attempt first, a broken callback still respects cooldown.

This is a useful general scheduler pattern.

## Manual execution is separate

The public API also provides explicit rare-event execution for scenario/director tools.

Manual execution intentionally bypasses random chance, check interval and existing cooldown, but still respects the event's condition.

After a successful/manual attempt, the current year is recorded so the normal pipeline does not immediately fire the same event again.

## Decision table

| Need | Better tool |
| --- | --- |
| React when government/ideology/party state changes | Event Bus |
| Run a rare kingdom event every N years | Rare Event registry |
| UI animation / frame interaction | Your own UI/runtime logic |
| Truly frame-dependent mechanic | Possibly `Update()` |
| Re-scan every kingdom every frame just to detect a transition | Usually avoid |

## The goal is not “never use Update”

`Update()` is not forbidden.

The rule is:

> Do not create permanent polling when the framework can already tell you when something changed or can schedule the rare check for you.

Every addon adding one innocent world scan can become expensive when ten or twenty addons do the same thing.

Framework-level shared scheduling reduces duplicated work.
