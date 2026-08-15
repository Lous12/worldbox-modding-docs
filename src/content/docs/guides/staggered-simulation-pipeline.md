---
title: Stagger heavy simulation work across frames
description: A source-backed performance pattern extracted from Political World's runtime pipeline.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🧭 Performance pattern</span>
<span class="doc-status">Political World 1.7.0</span>

Political World once ran many heavyweight political systems together on one periodic tick.

The current source preserves the order of those systems but spreads them across successive rendered frames.

## Why

If eleven expensive systems all execute on one frame every few seconds, the average FPS may look acceptable while the game still produces a visible periodic hitch.

The problem is **frame-time concentration**.

Instead of:

```text
every 12 seconds:
    ideology
    migrations
    movements
    parties
    crises
    governments
    political systems
    elections
    leadership
    war diplomacy
    international blocs
    rare events
```

Political World uses a pipeline stage.

## Current pipeline order

The inspected source advances one stage at a time:

```text
0  UpdateIdeologySystem()
1  UpdateIdeologyFrameworkMigrations()
2  UpdatePoliticalMovements()
3  UpdatePoliticalParties()
4  UpdatePoliticalCrises()
5  UpdateGovernmentForms()
6  UpdatePoliticalSystems()
7  UpdateElections()
8  UpdateGovernmentLeadership()
9  UpdateWarDiplomacyFoundation()
10 UpdateInternationalBlocs()
11 Evaluate rare political events
```

After stage 11, the pipeline returns to an idle state until the next ideology/political cycle begins.

## Simplified pattern

```csharp
private int _stage = -1;

void Update()
{
    if (ShouldStartHeavyCycle() && _stage < 0)
        _stage = 0;

    RunOneStage();
}

void RunOneStage()
{
    if (_stage < 0)
        return;

    switch (_stage)
    {
        case 0:
            UpdateSystemA();
            break;
        case 1:
            UpdateSystemB();
            break;
        case 2:
            UpdateSystemC();
            break;
    }

    _stage++;

    if (_stage > 2)
        _stage = -1;
}
```

## Different systems can use different clocks

The same Political World `Update()` also schedules other work independently.

Examples in the inspected source include:

- native UI scans using `Time.unscaledTime`;
- diplomacy sequences at a bounded interval;
- summit updates at their own interval;
- ruler checks;
- economy ticks;
- stability ticks;
- the staged political pipeline.

This matters because not every system needs the same frequency.

## 10 Hz can be enough

A source comment explains that some diplomacy sequences are measured in seconds rather than frames and are updated at approximately 10 Hz instead of every rendered frame.

For state that changes over seconds, 144 or 240 checks per second may add cost with no visible benefit.

## Pause/time caution

`Time.time` and `Time.unscaledTime` have different behavior and should be chosen intentionally.

Political World's source uses `unscaledTime` for UI scanning/caching cases where UI responsiveness should not depend on simulation timing, while simulation scheduling uses other time checks.

Do not copy one clock everywhere without understanding what should happen while the game is paused.

## When this pattern helps

Use a staged pipeline when:

- a group of systems must preserve a known order;
- each step can run one frame after the previous one;
- the total work causes periodic spikes when concentrated;
- the simulation does not require all results to become visible atomically in the exact same rendered frame.

## When not to use it

Do not split a calculation if later logic in the **same frame** requires all earlier stages to be complete.

A pipeline introduces a small temporal separation between stages. That is a design tradeoff, not a free optimization.

## General lesson

Optimize **frame-time distribution**, not only total CPU time.

A mod that performs 20 ms of work once every 10 seconds can feel worse than a mod that distributes the same work as several small steps across frames.
