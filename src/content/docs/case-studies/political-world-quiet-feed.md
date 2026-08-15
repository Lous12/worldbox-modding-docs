---
title: Political World — controlling event-feed spam
description: How the Quiet Feed pass reduced repetitive political notifications without introducing a deferred queue.
---

<span class="doc-status">✅ Tested in Political World</span>
<span class="doc-status">🧪 Design case study</span>

A political simulation can generate far more internal events than a player can reasonably read.

Political World reached this problem with ideology evolution, summits, and repeated political messages.

The solution was not to stop simulating those systems. It was to **separate simulation events from player-facing notifications**.

## Problem

Repeated events could flood the visible feed:

- ideology evolution messages;
- summit calls;
- summit opened messages;
- summit cancellations;
- repeated vote-related messages.

The player-facing problem was noise, not necessarily the underlying simulation.

## Quiet Feed approach

The tested Quiet Feed pass intentionally suppressed several high-frequency categories:

```text
ideology_evolution_*
summit_called
summit_opened
summit_cancelled
```

Vote notifications remained visible, but with a global cooldown.

## Important design choice

There was **no deferred notification queue** in this pass.

If several suppressed/limited messages happened during the cooldown window, extra messages were simply dropped instead of being stored and dumped later.

That prevents a second failure mode:

> solving notification spam by creating delayed notification spam.

## Simulation vs presentation

A useful architecture is:

```text
simulation event
    ↓
event data
    ↓
notification policy
    ├─ show now
    ├─ suppress
    ├─ rate-limit
    └─ summarize
```

The simulation should not require every event to become a UI message.

## Pause note

During testing, notifications visible immediately after pausing could be UI/feed tail from events already produced before the pause.

Do not diagnose "simulation still running while paused" from one late notification alone. Confirm whether **new events continue to be generated** over time.

## Future improvement

For a larger system, suppression could evolve into aggregation:

```text
12 ideology changes occurred this year.
3 alliance summits were held.
```

That preserves information without turning the event feed into a log console.

## Scope

This page documents Political World's own notification design. Exact event identifiers are project-specific.
