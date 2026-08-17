---
title: WBML 0.3.0 — Capability Verification Atlas
description: Canonical zero-argument non-void call verification and the stale-sample/classifier correction in 0.3.0-fix1.
---

**Final status:** `CLOSED PASS`  
**Canonical probe:** `0.3.0-fix1`  
**Run:** `82c23a7c8916`  
**Final matrix:** `28 PASS / 0 FAIL / 0 SKIP`, P–F PASS.

## Research question

From the 0.2 structural surface, which zero-argument non-void methods can be structurally proved read-like and successfully invoked on a live, non-stale runtime owner?

## Canonical result

```text
methods scanned           18,625
zero-arg non-void          4,411
capability records         3,021
blocked                    16,874
  dangerous                   69
  unsupported              15,535
IL-safe                     1,751
IL-rejected                 1,270
owner resolved              1,505
no runtime owner              246
invoked                     1,505
VERIFIED                    1,462
OBSERVED-THREW                 43
public VERIFIED             1,116
reflection VERIFIED           346
unsafe invoked                  0
stale invoked                   0
stability            1429 same / 33 changed / 0 failed
engine exceptions               0
```

## Why the initial green run was rejected

The first 0.3 run was structurally green but the first available Actor sample often came from `ActorManager._dead_objects[]`. That produced false `OBSERVED-THREW`/false-useful results for methods requiring a live actor. A second bug treated any method name containing `attack` as dangerous before considering that a method could still be a read-only query.

`fix1` added sample-quality ranking and stale prevention; the canonical Actor sample moved to `City._professions_dict{value}[]` with quality 110. It also made read intent precede the broad dangerous-name heuristic.

## Evidence semantics

`VERIFIED` means successful call on the exact non-stale runtime sample after structural read-only proof. It does **not** mean a semantic guarantee for all possible world states.

Representative verified records now documented in detail include Actor, City, Kingdom, Building, WorldTile, MapBox and SaveManager.

Machine data: `/worldbox-modding-docs/data/wbml/0300-capability-verification-atlas.json`  
Evidence: `/worldbox-modding-docs/evidence/wbml-0300-result.txt`

[Detailed capability atlas](../../api/runtime-capability-atlas/) · [Actor reference](../../api/runtime-actor/) · [Next: WBML 0.4](../wbml-0400-parameterized-query-atlas/)
