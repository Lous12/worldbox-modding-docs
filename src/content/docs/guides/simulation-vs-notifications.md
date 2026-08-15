---
title: Separate simulation events from notifications
description: A design pattern for event-heavy WorldBox mods based on Political World's Quiet Feed work.
---

<span class="doc-status">🧪 Design pattern</span>
<span class="doc-status">Derived from Political World</span>

Event-heavy simulation mods should avoid treating every internal event as a mandatory player-facing notification.

## Separate the layers

A useful model is:

```text
Simulation
    ↓
Domain event
    ↓
Notification policy
    ↓
UI feed
```

This lets the simulation remain detailed while the UI remains readable.

## Notification policy options

For each event category, choose one of four policies:

- **Immediate** — important and rare enough to show every time.
- **Rate-limited** — useful, but too frequent to show continuously.
- **Suppressed** — internal detail that does not need a visible message.
- **Aggregated** — many events summarized into one periodic report.

## Why a deferred queue is not always the answer

If a feed is already noisy, rate-limiting plus queueing every skipped notification may only move the spam into the future.

Political World's Quiet Feed deliberately dropped some extra messages instead of replaying them later.

For higher-value information, aggregation is usually better:

```text
Bad:
  17 individual ideology-change messages

Better:
  "17 ideology changes occurred this year."
```

## Debugging pause behavior

Do not mix two questions:

1. Is the simulation still generating new events?
2. Is the UI still displaying already-generated events?

A notification appearing shortly after pausing can be presentation tail.

To prove the simulation ignores pause, log event **creation timestamps/counters**, not only visible UI messages.
