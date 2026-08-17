---
title: WBML 0.2.0 — Automatic API Atlas
description: Canonical read-only Assembly-CSharp type/member/runtime/relationship atlas from 0.2.0-fix3.
---

**Final status:** `CLOSED PASS`  
**Canonical probe:** `0.2.0-fix3`  
**Run:** `0fa6e20674fc`  
**Final matrix:** `26 PASS / 0 FAIL / 0 SKIP`, P–E PASS.

## Research question

Can WBML turn the earlier hand-written probes into a broad, machine-readable atlas of WorldBox's managed surface without auto-invoking discovered gameplay methods?

## Safety policy

0.2 is a **mass read-only discovery** pass. It scans the game assembly, resolves runtime objects, reads safe fields, builds relationships and creates a research queue. Discovered methods/properties/constructors are not automatically called.

## Canonical result

| Metric | Value |
|---|---:|
| Types | 2,905 |
| Members / declared members | 38,553 / 38,553 |
| Type-ID collisions | 0 |
| Specialized base signatures | 376 |
| Runtime concrete / specialized types | 697 / 29 |
| Runtime type records / unmapped | 676 / 0 |
| Runtime safe reads | 8,488 OK / 0 failed |
| Relations | 19,150 |
| Interface relations | 607 |
| Specialized relation signatures | 920 |
| Unresolved relation endpoints | 0 |
| Research queue | 15,079 |
| Redacted runtime strings | 1 |
| Unsafe runtime snapshots | 0 |
| Loader/static exceptions | 0 / 0 |
| Stability | 4,988 same / 12 changed / 0 failed |

## Methodology corrections before the canonical run

The earlier 0.2 iterations were superseded while the atlas schema was hardened. The final `fix3` is the only public capability source. It corrected generic signatures to keep concrete/canonical type IDs, exported runtime closed-generic specialization, fixed a false privacy hit on FMOD-style `event:/...` strings, and removed category substring false positives.

These earlier runs remain useful as harness history, not parallel truth.

## What 0.2 does not prove

A queue entry or member record does not prove safe callability. 0.2 maps the surface; 0.3+ verifies selected call behavior.

Machine data: `/worldbox-modding-docs/data/wbml/0200-automatic-api-atlas.json`  
Sanitized evidence: `/worldbox-modding-docs/evidence/wbml-0200-result.txt`

[Detailed capability atlas](../../api/runtime-capability-atlas/) · [Quick Docs](../../quick/) · [Next: WBML 0.3](../wbml-0300-capability-verification-atlas/)
