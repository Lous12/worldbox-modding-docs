---
title: WBML-0003 — proving persistence without trusting old process memory
description: Why restart evidence must persist its own gates and counters, plus the party lifecycle findings that followed.
---

<span class="doc-status">✅ Verified lesson</span>
<span class="doc-status">WBML-0003</span>

A persistence test can accidentally test the data correctly while reporting the experiment incorrectly.

That happened in the first WBML-0003 harness: after a full process restart, the old in-memory assertion counters were gone. The new process could verify current values, but its final totals no longer represented the earlier phases.

## The fix

`0.0.3-fix1` persisted not only test values, but also **proof state**:

```text
phase gates
PASS / FAIL / SKIP before restart
run marker
resume phase
```

After restart it reconstructed the earlier matrix before continuing.

That produced a trustworthy chain:

```text
pre-restart proof
→ process dies
→ new process loads save
→ proof state restored
→ restart assertions run
→ final gate includes every phase
```

## The practical party finding

Once the harness was trustworthy, the suite showed that the tested party-private int/string/bool/float values remained readable after full restart and while a safe non-ruling party was inactive.

Deactivation did not erase those values; reactivation restored the active state.

## Beginner lesson

If a test crosses a process boundary, ask two questions:

1. did the **feature state** survive?
2. did the **evidence needed to judge the test** survive?

Both matter.
