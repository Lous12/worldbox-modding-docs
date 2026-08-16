---
title: PoliticalWorldAPI Actions, Conditions and Effects
description: Runtime-tested creator-facing action stack from registration through conditions, execution, effects and unregister behavior.
---

<span class="doc-status">✅ Runtime verified — executed branches</span>
<span class="doc-status">WBML-0005</span>
<span class="doc-status">PoliticalWorldAPI 1.14.0</span>

PoliticalWorldAPI exposes a creator-facing action system so addons can define reusable political actions with:

```text
metadata
+ optional condition
+ handler/effect
```

For a beginner, the flow is:

```text
register action
→ ask whether it can run
→ execute it
→ condition decides whether handler is allowed
→ handler/effects change state
```

WBML-0005 tested this stack as one subsystem instead of checking a single method in isolation.

## `ActionDefinition`

The inspected creator source contains fields conceptually equivalent to:

```csharp
Id
Category
NameKey
DescriptionKey
DisplayName
Description
Icon
SortOrder
KingdomCondition Condition
KingdomAction Handler
```

The runtime package tested by WBML was API 1.14.0; the inspected source snapshot is older. Use the source for shape and the runtime evidence for the tested behavior.

## Minimal action

```csharp
private const string AddonId = "Example.Actions";
private const string ActionId = AddonId + ".increase_counter";

PoliticalWorldAPI.RegisterAction(
    AddonId,
    new PoliticalWorldAPI.ActionDefinition
    {
        Id = ActionId,
        Category = "example",
        DisplayName = "Increase counter",
        Condition = kingdom => kingdom != null,
        Handler = kingdom =>
        {
            int current = PoliticalWorldAPI.GetKingdomInt(
                kingdom,
                AddonId,
                "counter",
                0
            );

            PoliticalWorldAPI.SetKingdomInt(
                kingdom,
                AddonId,
                "counter",
                current + 1
            );
        }
    }
);
```

Use an action ID owned by your addon namespace.

## Validation behavior tested by WBML-0005

The suite called the public validation path with deliberately bad definitions.

Runtime API 1.14.0 produced:

```text
PW303 — action ID not owned by addon → invalid
PW304 — Handler missing             → invalid
PW305 — no DisplayName/NameKey      → warning, definition still valid
```

Practical lesson:

> A readable label warning is not the same as a registration-blocking validation error.

## Important runtime rule: same-ID registration replaces

The first WBML-0005 harness assumed a second `RegisterAction` with the same ID would be rejected as a duplicate.

Runtime API 1.14.0 instead did this:

```text
first definition registered
→ second RegisterAction with same ID returned true
→ GetAction exposed second definition
→ previous metadata/condition were replaced
```

The Lab then registered the canonical definition again and verified it was restored.

Treat this as **replacement/upsert behavior for the tested runtime**.

Why a modder should care:

- reusing an ID can overwrite your previous handler;
- omitted fields in the replacement can disappear from the effective definition;
- accidental ID collisions inside your own addon can silently change behavior instead of producing the duplicate failure you expected.

Do not generalize the rule to future API versions without versioned evidence.

## Query and metadata API

WBML verified the tested action through:

```csharp
GetAction(...)
GetActionsByAddon(...)
GetActionsByCategory(...)
GetAddonContentSummary(...)
```

The canonical test set returned three live actions in the owner/category queries before cleanup.

`ActionInfo.Enabled` also changed dynamically when the condition state changed.

## Conditions: combinators

WBML-0005 verified these runtime semantics:

```text
All(true, null, true)   → true
All(true, false, true)  → false
Any(false, null, true)  → true
Any(empty)              → true
Not(false)              → true
Not(null)               → true
```

`Any(empty) == true` and `Not(null) == true` are worth documenting explicitly because they are easy to guess incorrectly.

When these semantics are important to your design, keep the API/runtime version in mind.

## Conditions: political state

The suite successfully evaluated helpers against the target kingdom's live state:

```text
GovernmentIs(current government)
IdeologyIs(current ideology)
CurrentIs(current current)
PoliticalSystemIs(current system)
StabilityAtLeast(current stability)
StabilityAtMost(current stability)
```

The exact IDs belong to the tested world and are not universal constants for every mod.

## Conditions: addon-private state

WBML seeded its own private test state and verified:

```text
AddonIntAtLeast
AddonIntAtMost
AddonBoolIs
KingdomHasAddonTag
```

This is a useful pattern for building actions whose availability depends on your addon's own progression or flags.

## Conditions: party state

The suite also verified executed branches of:

```text
PartySupportAtLeast
HasRulingParty
HasActivePartyIdeology
```

A methodology lesson came from this phase: `PartyInfo` was re-read immediately before support boundary checks. Do not assume an earlier info snapshot is still current if the simulation may have changed political values.

## `CanExecuteAction`, `ExecuteAction`, `TryExecuteAction`

WBML verified both disabled and enabled paths.

### Disabled condition

```text
CanExecuteAction → false
ExecuteAction    → false
handler calls    → 0
TryExecuteAction → Success=false
Code             → action-condition-failed
```

### Enabled condition

```text
CanExecuteAction → true
ExecuteAction    → true
handler side effect occurred
TryExecuteAction → Success=true
Code             → ok
second side effect occurred
```

### Error results

The tested operation-result codes were:

```text
missing action → action-not-found
null kingdom   → invalid-kingdom
disabled       → action-condition-failed
success        → ok
```

These codes are runtime evidence for API 1.14.0, not a promise that every future API will never add or rename operation codes.

## `Effects.Sequence`

WBML composed multiple effects, including a `null` entry, then executed them through an action handler.

The tested sequence:

```text
SetAddonInt(counter, 10)
null
ChangeAddonInt(counter, +7)
SetAddonBool(flag, true)
AddAddonTag(tag)
```

produced:

```text
counter = 17
flag = true
tag present
```

This verified the integration path used in the suite.

## Effect helpers verified in WBML-0005

Executed and passed:

```text
SetAddonInt
ChangeAddonInt
SetAddonBool
AddAddonTag
RemoveAddonTag
ChangeStability
SetStability
SetPartyRadicalism
```

The stability probe changed the value by only ±1 and restored it immediately.

The party radicalism probe also changed by ±1 and restored the original value.

## Party support: do not treat it as a simple setter in every state

This is the most important safety warning from WBML-0005.

An earlier run tested support when the target kingdom had only one active party. Requesting a lower support value caused the runtime path to normalize the lone active party to:

```text
100
```

Trying to restore the old lower value through the same setter also produced 100.

The final `fix4` suite therefore does **not** perform the exact support-mutation assertion unless a kingdom with at least two active parties is available.

Final status:

```text
👁 Observed: single-active-party support path normalized the lone party to 100
🧪 Not verified: exact support mutation/restoration with >=2 active parties
```

Do not write:

```text
SetPartySupport always assigns exactly the requested percentage
```

Our evidence does not support that statement.

## Unregister behavior

WBML-0005 verified:

```text
UnregisterAction(existing) → true
GetAction(after removal)   → null
CanExecuteAction           → false
ExecuteAction              → false
second UnregisterAction    → false
TryExecuteAction            → action-not-found
```

The live owner query reached `count=0` after cleanup.

## Diagnostics bookkeeping caveat

Immediately after the live action query returned zero, the diagnostics report still displayed:

```text
Registered actions: 2
```

following repeated same-ID replacement history.

Status:

```text
👁 Observed bookkeeping mismatch
```

Do **not** reinterpret that diagnostics count as proof that two live actions still existed; `GetActionsByAddon` returned zero.

This mismatch deserves a dedicated diagnostics suite later.

## Final WBML-0005 result

```text
PASS=90
FAIL=0
SKIP=3
FINAL GATES: A=PASS B=PASS C=PASS D=PASS
SUITE RESULT: PARTIAL PASS
```

The three SKIPs were all the intentionally unexecuted exact party-support mutation/restoration branch for a world with only one active party.

Every executed assertion passed.

## Beginner checklist

Before registering an action:

1. register your addon;
2. use an action ID inside your addon namespace;
3. provide a handler;
4. give the action readable text;
5. decide whether a condition is actually needed;
6. do not assume same-ID registration will fail;
7. check execution/operation results when failure matters;
8. re-query live political state for condition decisions;
9. restore any temporary test mutation safely;
10. be especially careful with party support in single-party states.

## Evidence

- [WBML-0005 research page](../../research/actions-conditions-effects-suite/)
- [Sanitized WBML-0005 result](/worldbox-modding-docs/evidence/wbml-0005-result.txt)
