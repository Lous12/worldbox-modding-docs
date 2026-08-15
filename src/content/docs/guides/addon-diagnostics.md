---
title: Diagnostics for addon authors
description: How Political World's public diagnostics turn registrations, warnings and callback failures into a support report.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🛠 Supportability pattern</span>

A public API becomes much easier to support when an addon author can produce one compact diagnostic report instead of manually describing internal state.

Political World's inspected API contains a lightweight diagnostics subsystem with **no separate Update loop**.

## Public report methods

The source exposes:

```csharp
PoliticalWorldAPI.GetAddonDiagnostics(addonId)
PoliticalWorldAPI.GetDiagnosticsReport(addonId)
PoliticalWorldAPI.GetAllDiagnosticsReports()
PoliticalWorldAPI.LogDiagnosticsReport(addonId)
```

## What the report tracks

Per addon:

```text
registered ideologies
registered governments
registered actions
registered rare political events
event subscriptions
callback errors
warnings
errors
recent diagnostic entries
```

The recent-entry buffer is capped at:

```text
32 entries
```

Older entries are dropped from that small history.

## Why counters and recent entries are both useful

A counter answers:

> “Has this addon had callback failures?”

Recent entries answer:

> “What failed most recently?”

You need both.

A huge unbounded log stored in memory is unnecessary. A tiny recent ring-like history plus counters gives useful support information at low cost.

## Example runtime report

A real development runtime report for Scenario Tools included:

```text
[Political World API]
API: 1.14.0
Addon: Scenario Tools [Lous12.ScenarioTools]
Registered ideologies: 0
Registered governments: 0
Registered actions: 0
Registered rare political events: 0
Event subscriptions: 0
Callback errors: 0
Warnings: 0
Errors: 0
Recent diagnostics:
- INFO PWDIAG001: Addon registered: Scenario Tools
```

That runtime belongs to a newer local build than the GitHub API 1.9 source snapshot documented elsewhere.

## Structured diagnostic codes

Examples verified in the source include:

```text
PWDIAG001  addon registered
PWDIAG010  ideology registered
PWDIAG015  government registered
PWDIAG016  rare political event registered
PWDIAG020  action registered
PWDIAG030  event subscription added
PWDIAG040  callback failed
```

Validation and registration code also records specific warning/error codes.

Stable codes are useful because users, documentation and AI can search for:

```text
PWDIAG040
```

instead of matching translated or changing prose.

## Callback errors are attributed to the addon

When an Event Bus callback throws, the diagnostics system increments:

```text
CallbackErrors
Errors
```

for the subscriber addon and records the event involved.

This is much more actionable than one generic core-mod exception.

## Diagnostics should be copy-pasteable

`GetDiagnosticsReport()` formats a plain-text support report.

This has several advantages:

- easy to paste into GitHub Issues or Discord;
- easy for AI to parse;
- survives without a custom UI;
- useful in `Player.log`;
- independent of localization.

## Minimal support button/action

An addon developer can expose a debug action that simply calls:

```csharp
PoliticalWorldAPI.LogDiagnosticsReport(AddonId);
```

Then a bug report can request:

```text
1. reproduce the problem;
2. run the diagnostic action;
3. attach Player.log.
```

## General lesson

When building a public mod API, include observability as a feature.

Do not wait until users report:

> “It doesn't work.”

A good framework can already answer:

```text
Was the addon registered?
How much content registered?
How many subscriptions exist?
Did callbacks throw?
What were the latest warnings/errors?
Which API version generated the report?
```
