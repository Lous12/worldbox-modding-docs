---
title: WBML 0.5.0 — Safe Mutation Atlas
description: Controlled reversible scalar mutation transactions and mutation/lifecycle census without mass-invoking unknown writes.
---

**Final status:** `CLOSED PASS`  
**Canonical probe:** `0.5.0`  
**Run:** `00d01039f05e`  
**Final matrix:** `34 PASS / 0 FAIL / 0 SKIP`, P–F PASS.

## Research question

Can WBML prove a narrow set of state mutations without turning “mutation atlas” into a dangerous mass-invoker?

## Transaction methodology

Only explicitly selected low-risk scalar members were eligible. Each transaction performed:

```text
snapshot → one write → exact readback/delta → immediate restore → residual check
```

A property setter also needed a safe read getter and trivial setter IL shape (one `stfld`, no calls) or an equivalent explicit low-risk proof.

## Canonical result

```text
mutation methods        5,943
destructive methods       729
lifecycle methods          377
setter methods             299
research queue           7,049
records                     19
attempted                   19
VERIFIED-REVERSIBLE         19
OBSERVED-THREW               0
restore failed               0
unexpected collateral        0
residual mutation            0
unsafe auto-invoked           0
engine exceptions             0
```

Domain coverage: ActorData 8, CityData 6, KingdomData 5.

## Important boundary

The 7,049 queued methods are not “safe mutation APIs”. Unknown `set/add/remove/create/spawn/destroy/kill/save/load` paths were intentionally **not** batch-invoked. Later lifecycle/disposable-world work decides how to research them.

## Reporting artifact

The canonical JSON's `timing_ms.export` is `0` because the file must serialize timing before its own write is complete. The final Player.log observed 59 ms. This is a self-measurement limitation, not a result failure.

Machine data: `/worldbox-modding-docs/data/wbml/0500-safe-mutation-atlas.json`  
Evidence: `/worldbox-modding-docs/evidence/wbml-0500-result.txt`

[Detailed safe mutations](../../api/runtime-safe-mutations/) · [Quick Actor](../../quick/actors/) · [Next: WBML 0.6](../wbml-0600-entity-lifecycle-atlas/)
