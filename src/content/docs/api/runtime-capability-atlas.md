---
title: Runtime capability atlases
description: How to read the canonical WBML 0.2 structural atlas and 0.3 zero-argument capability verification export.
---

## WBML 0.2.0 — structural atlas

Canonical probe: `0.2.0-fix3`, run `0fa6e20674fc`.

| Metric | Canonical value |
|---|---:|
| Types | 2,905 |
| Members | 38,553 |
| Type ID collisions | 0 |
| Runtime concrete types | 697 |
| Runtime specialized types | 29 |
| Safe runtime reads | 8,488 |
| Runtime read failures | 0 |
| Relations | 19,150 |
| Unresolved relation endpoints | 0 |
| Research queue | 15,079 |
| Stability | 4,988 same / 12 changed / 0 failed |

0.2 is a **read-only census and relationship map**. Discovered methods/properties/constructors were not automatically invoked. The queue is research prioritization, not a safety verdict.

## WBML 0.3.0 — zero-argument capability verification

Canonical probe: `0.3.0-fix1`, run `82c23a7c8916`.

| Metric | Canonical value |
|---|---:|
| Methods scanned | 18,625 |
| Zero-arg non-void | 4,411 |
| Capability records | 3,021 |
| IL-safe | 1,751 |
| Owner resolved | 1,505 |
| Invoked | 1,505 |
| `VERIFIED` | 1,462 |
| `OBSERVED-THREW` | 43 |
| Public Verified | 1,116 |
| Reflection Verified | 346 |
| Unsafe invoked | 0 |
| Stale invoked | 0 |
| Stability | 1,429 same / 33 changed / 0 failed |

The initial 0.3 run was structurally green but sampled dead/stale Actor objects and treated read-like names containing `attack` as dangerous. `fix1` corrected owner-sample quality and moved read intent before the broad name heuristic.

### Reading one record

Example canonical Actor record:

```text
signature: getAge()->System.Int32
visibility: public
owner_source: City._professions_dict{value}[]
invocation_status: VERIFIED
result_kind: scalar
result_type: System.Int32
snapshot: 76
stability: same
```

`76` is the value on that sample, not a property invariant.

Machine data: `/worldbox-modding-docs/data/wbml/0200-automatic-api-atlas.json` and `/worldbox-modding-docs/data/wbml/0300-capability-verification-atlas.json`.

[Quick Docs](../../quick/) · [Actor details](../runtime-actor/) · [WBML 0.2 research](../../research/wbml-0200-automatic-api-atlas/) · [WBML 0.3 research](../../research/wbml-0300-capability-verification-atlas/)
