---
title: WBML-0004 — Event Bus Runtime Suite
description: Runtime discovery, payload mapping, callback isolation, unsubscribe behavior, recursion guard and stress evidence for PoliticalWorldAPI 1.14.0.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">WBML-0004</span>
<span class="doc-status">68 PASS / 0 FAIL / 0 SKIP</span>

## Research question

Does the installed PoliticalWorldAPI Event Bus actually behave like the older creator source suggests, and where has runtime 1.14.0 drifted from that source?

## Environment

```text
WorldBox:          0.51.2 build 719
Git:               build-719@5dec
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
Lab:               0.0.4-fix2
```

## Phase A — discovery, payload and unsubscribe

Runtime discovery returned **23** event IDs.

The suite verified:

```text
non-null event list
known target IDs present
defensive copy behavior
custom/unknown event subscription accepted and removable
null handler rejected
duplicate exact subscription rejected/ignored
exact and wildcard delivery
party.renamed identity/kingdom/party fields
rename old/new values through OldValue/NewValue
per-subscriber payload mutation isolation
exact/wildcard unsubscribe
no callbacks after removal
subscriptions count returned to zero
```

The custom/unknown event result differs from the inspected API 1.9 source assumption and is preserved as versioned runtime evidence.

## Phase B — callback containment

One callback intentionally threw an exception. A healthy callback subscribed to the same event still executed.

Diagnostics recorded the callback error.

The suite also verified self-unsubscribe during dispatch and `UnsubscribeAll` cleanup.

## Phase C — recursion and stress

The recursive callback requested a chain of 64.

Runtime stopped at:

```text
recursive=16
tail=16
```

The tail subscriber receiving the same 16 accepted events is important: the recursion guard did not turn the dispatch into a completely broken stream.

Then 100 sequential test writes produced:

```text
100/100 accepted
100 callbacks
33 ms observed
```

Only the counts are part of the behavioral verification. The timing is not a universal benchmark.

## Harness corrections

### Initial harness

It required unknown-event rejection and required rename values in `OldName/NewName`. Runtime disagreed.

Those failures became evidence that the harness assumptions were stale.

### fix1

The payload mapping was corrected, but recursive/stress handlers still filtered only `NewName`. Runtime 1.14.0 placed the tested value in `NewValue`, so the **Lab itself** dropped every Phase C event.

Zero callbacks from that run were rejected as harness evidence.

### fix2

The filter resolved rename new value using runtime-aware mapping. The full suite then passed.

## Final result

```text
PASS=68 FAIL=0 SKIP=0
A=PASS B=PASS C=PASS
SUITE RESULT: PASS
```

Original party name restored and final subscriptions reached zero.

## Evidence boundary

This verifies the tested dispatch paths, not every payload field of all 23 event IDs.

[Sanitized runtime excerpt](/worldbox-modding-docs/evidence/wbml-0004-result.txt)
