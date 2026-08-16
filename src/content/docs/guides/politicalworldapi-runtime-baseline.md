---
title: PoliticalWorldAPI runtime baseline through WBML-0005
description: Beginner-friendly map of what WorldBox Modding Lab has actually verified in PoliticalWorldAPI 1.14.0.
---

<span class="doc-status">✅ Runtime evidence</span>
<span class="doc-status">WorldBox 0.51.2 build 719</span>
<span class="doc-status">PoliticalWorldAPI 1.14.0</span>

If you are new to Political World addon development, start here.

This page separates three different things that are easy to mix up:

```text
source code we inspected
runtime behavior we actually reproduced
behavior that still has not been tested
```

That distinction matters because the inspected Political World creator source identifies itself as API **1.9.0**, while the installed runtime used by the Lab identifies itself as **1.14.0**. They are related evidence, but they are not the same version.

## The tested environment

All WBML-0001 through WBML-0005 runtime claims below are bound to:

```text
WorldBox:          0.51.2
build:             719
git:               build-719@5dec
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
```

A result on this stack should not silently be presented as a promise for every future WorldBox or Political World version.

## What is already verified

### 1. Kingdom addon data survives a full process restart

WBML-0001 wrote data, saved the world, fully closed WorldBox, started a new process, loaded the same save, and read the data without rewriting it.

Verified types:

```text
int
Unicode string
bool
float
addon-private kingdom tag
shared kingdom tag
```

See [Addon Data Save/Load Probe](../research/addon-data-save-load-probe/).

### 2. Tested kingdom state stays isolated between two saves

WBML-0002 used a strict:

```text
World A → World B → World A → World B
```

sequence with a unique run token. Each save recovered its own current-run values and did not expose the other world's current-run signature.

This proves the tested same-process world-isolation path. It does **not** automatically prove every possible isolation path.

See [World Isolation Probe](../research/world-isolation-probe/).

### 3. Party-private typed data survives save/reload and full restart

WBML-0003 expanded the persistence tests to party-scoped values:

```text
Get/SetPartyInt
Get/SetPartyString
Get/SetPartyBool
Get/SetPartyFloat
```

The same party ID recovered all four typed values after a full WorldBox process restart.

The suite also verified that party data remains readable while the party is inactive and after reactivation.

See [Persistence & Party Lifecycle Suite](../research/persistence-lifecycle-suite/).

### 4. Event Bus behavior is runtime-tested

WBML-0004 verified the Event Bus rather than trusting the older source snapshot alone.

Important runtime findings include:

```text
GetEventIds() returned 23 IDs
custom/unknown event IDs could be subscribed to
party.renamed used OldValue/NewValue for the tested rename payload
subscriber payload objects were isolated from one another
one throwing callback did not stop a healthy callback
recursive dispatch stopped at depth 16
100 sequential test dispatches produced 100 callbacks
```

The 33 ms stress timing is only an observation from one run, not a performance guarantee.

See [Event Bus Runtime Suite](../research/event-bus-runtime-suite/).

### 5. Actions, Conditions and Effects work as one creator-facing stack

WBML-0005 verified registration, validation, queries, conditions, execution, operation results, selected effect helpers and unregister behavior.

A particularly important runtime difference from the first test assumption:

```text
RegisterAction(same ID)
→ accepted
→ previous definition replaced
```

The suite re-registered the canonical definition after the replacement probe and continued testing the rest of the stack.

See [Actions / Conditions / Effects Suite](../research/actions-conditions-effects-suite/).

## Important traps already discovered

### A DTO or info object is not guaranteed to remain current

During WBML-0005, a party support value changed between phases. The corrected probe re-read the party by stable party ID before testing support conditions.

Beginner rule:

> If correctness depends on the current political state, query the current state again instead of assuming an earlier `PartyInfo` or similar snapshot is still current.

### Single-active-party support is special

In an earlier WBML-0005 run, setting support on the only active party caused the runtime path to normalize that party to **100**. Trying to restore a lower snapshot through the same setter also produced 100.

The final suite therefore refuses to perform the exact support-mutation test unless the target kingdom has at least two active parties.

Status:

```text
👁 Observed: single-active-party normalization to 100
🧪 Not yet verified: exact support mutation/restoration with >=2 active parties
```

### Cleanup code can invalidate an experiment

WBML-0005-fix3 correctly skipped the dangerous single-party support mutation, but its old final cleanup code still tried to restore an earlier support snapshot. That cleanup call itself triggered normalization to 100.

The run was rejected. `fix4` changed the finalizer so a skipped mutation stays skipped all the way through cleanup.

Rule:

> Setup, test body, restoration and final cleanup are all part of the experiment and all require the same safety review.

## What a PARTIAL PASS means

A suite can finish with:

```text
FAIL=0
SKIP>0
SUITE RESULT: PARTIAL PASS
```

That does **not** mean the whole subsystem is uncertain.

It means:

- every executed assertion passed;
- one or more explicitly named branches were not executed;
- only those skipped branches remain unverified.

For example, WBML-0005 closed with 90 PASS / 0 FAIL / 3 SKIP because the world had no target kingdom with two active parties. The support-mutation branch stayed unverified; the executed action/condition/effect branches did not lose their evidence.

## What to read next

If you want to build an addon rather than read the research history, continue with:

- [Party-private addon data](../api/politicalworld-party-private-data/)
- [PoliticalWorldAPI Event Bus](../api/politicalworld-event-bus/)
- [Actions / Conditions / Effects](../api/politicalworld-actions-conditions-effects/)

If something in a future runtime contradicts these pages, record the new version and reproduce it with a focused probe instead of silently rewriting the old result.
