---
title: WBML-0005 — Actions / Conditions / Effects Suite
description: Runtime validation, same-ID replacement, conditions, action execution, operation codes, effect helpers and cleanup safety.
---

<span class="doc-status">✅ Verified — executed branches</span>
<span class="doc-status">WBML-0005</span>
<span class="doc-status">PARTIAL PASS: 90 / 0 / 3</span>

## Research question

Can PoliticalWorldAPI 1.14.0's creator-facing action stack be used coherently from registration through condition evaluation, execution, effects and unregister cleanup?

## Environment

```text
WorldBox:          0.51.2 build 719
Git:               build-719@5dec
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
Lab:               0.0.5-fix4
```

## Phase A — registration and metadata

The suite verified validation codes PW303/PW304 and warning PW305, registered three Lab-owned actions, queried their metadata, and discovered an important runtime rule:

```text
RegisterAction(same ID) → accepted / replaced
```

The replacement became visible through `GetAction`. The Lab immediately re-registered the canonical definition before continuing.

Phase A:

```text
22 PASS / 0 FAIL / 0 SKIP
```

## Phase B — conditions

Verified combinators included:

```text
All
Any
Not
```

including runtime edge semantics `Any(empty) == true` and `Not(null) == true`.

The suite also passed live government/ideology/current/system/stability checks, addon-private int/bool/tag checks, dynamic `ActionInfo.Enabled`, and the executed party conditions.

A correction in this phase stopped treating an earlier `PartyInfo.Support` value as immutable. The final harness re-read the same party by stable ID before support-boundary assertions.

Phase B ended with no failures.

## Phase C — execution and operation results

Verified:

```text
disabled action does not execute handler
action-condition-failed
successful ExecuteAction
successful TryExecuteAction with code ok
handler side effects
missing action → action-not-found
null kingdom → invalid-kingdom
Effects.Sequence integration
```

Phase C reached 68 cumulative PASS / 0 FAIL / 0 SKIP.

## Phase D — effects and unregister

Executed effect branches passed for addon int/bool/tags, stability mutation/restoration and party radicalism mutation/restoration.

Unregister semantics also passed.

### Party support safety branch

The target world had only one active party in the selected kingdom.

Earlier experiment history had already shown that the single-active-party support path normalized a requested lower value to 100 and did not restore the lower value through the same setter.

The final harness therefore skipped exact support mutation rather than repeating a destructive test.

Phase D:

```text
PASS=87 FAIL=0 SKIP=2
```

## Why `fix4` was necessary

`fix3` correctly skipped the dangerous Phase D support mutation, but its old final cleanup still compared live support with a Phase A snapshot and attempted to "restore" the old value.

That cleanup call itself hit the single-party normalization path and produced 100.

The run was rejected as a **finalizer/harness bug**.

`fix4` made the safety rule global:

```text
if Phase D did not mutate support
→ FINAL does not call the support setter
→ FINAL marks support restoration SKIP
```

## Final result

```text
PASS=90
FAIL=0
SKIP=3
A=PASS B=PASS C=PASS D=PASS
SUITE RESULT: PARTIAL PASS
```

All three SKIPs belong to the exact party-support mutation/restoration branch in the single-party environment.

## Additional observation: diagnostics bookkeeping

The live action query after unregister returned zero, but the diagnostics report displayed `Registered actions: 2` after repeated same-ID replacement history.

This is preserved as **Observed**, not promoted to a general rule.

## Evidence boundary

Executed action/condition/effect/unregister branches are verified for this stack.

Exact multi-party support mutation/restoration remains open.

[Sanitized runtime excerpt](/worldbox-modding-docs/evidence/wbml-0005-result.txt)
