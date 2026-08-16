---
title: WBML-0002 — addon state stays isolated between world saves
description: Runtime evidence that current-run PoliticalWorldAPI kingdom state stayed attached to the correct world during an A → B → A → B save-switch sequence.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">🧪 WorldBox Modding Lab</span>
<span class="doc-status">WBML-0002</span>

WBML-0002 asked a different question from WBML-0001:

> If two world saves use the same addon and the same logical data keys, does one world's addon state appear in the other world?

## Why this needed a separate probe

WBML-0001 verified:

```text
same save + full process restart → values return
```

That did **not** prove that the values were isolated from other worlds. A bad implementation could still have appeared persistent while actually leaking through static/runtime state.

WBML-0002 therefore used two different saves and two different current-run signatures.

## Harness correction before the valid run

The first 0.0.2 harness had a methodological bug: a failed Step C did not prevent Step D from printing a final success line.

That run was rejected.

`0.0.2-fix1` added:

```text
strict A → B → C → D state machine
unique run token
step flags
final gate requiring A=PASS B=PASS C=PASS D=PASS
failure lockout
```

This matters because a probe is only evidence if its own verdict logic is trustworthy.

## Verified environment

```text
WorldBox:          0.51.2
build:             719
git:               build-719@5dec
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
Lab:               0.0.2-fix1
```

Current-run token:

```text
af599151c6da
```

## Sequence

```text
World A
→ write A signature
→ save
→ load World B
→ confirm A signature absent
→ write B signature
→ save
→ load World A
→ confirm B signature absent + A values return
→ load World B
→ confirm A signature absent + B values return
```

The probe tested:

```text
marker
int
Unicode string
bool
float
addon-private kingdom tag
shared kingdom tag
```

## Step results

### A — write World A

```text
A-IMMEDIATE RESULT: 6/6 DATA PASS | marker=PASS => PASS
STEP A RESULT: PASS
```

### B — verify clean World B and write B

Before writing B, the probe scanned 21 kingdoms:

```text
WORLD B CLEAN CHECK: PASS
no current-run WORLD A signature found across 21 kingdoms
```

Then:

```text
B-IMMEDIATE RESULT: 6/6 DATA PASS | marker=PASS => PASS
STEP B RESULT: PASS
```

### C — return to World A

```text
RETURN A: current-run WORLD B signature absent => PASS
A-RETURN RESULT: 6/6 DATA PASS | marker=PASS => PASS
STEP C RESULT: PASS
```

### D — return to World B

```text
RETURN B: current-run WORLD A signature absent => PASS
B-RETURN RESULT: 6/6 DATA PASS | marker=PASS => PASS
STEP D RESULT: PASS
```

The corrected final gate then required every step:

```text
FINAL GATE: A=PASS B=PASS C=PASS D=PASS
FINAL RESULT: WORLD ISOLATION VERIFIED FOR THIS RUN.
```

## Verified claim

For the tested environment, PoliticalWorldAPI kingdom state used by the probe stayed isolated between the two tested world saves during the same WorldBox process.

The current-run A signature did not appear in B, the current-run B signature did not appear in A, and each world's own values returned when that save was loaded again.

## Evidence boundary

This result does **not** by itself prove:

- party-private data isolation;
- the exact physical save file/database used by each value;
- isolation for every possible PoliticalWorldAPI data type;
- behavior across future WorldBox/NML/Political World versions;
- a full-process-restart isolation sequence.

Full-process persistence is a separate verified result from [WBML-0001](../wbml-0001-addon-data-persistence/).

## Methodology lesson

A failed probe harness is still valuable research material if the bad verdict is rejected rather than promoted.

The corrected rule is simple:

```text
final result = conjunction of every required step
```

not:

```text
last step passed → whole experiment passed
```

This rule now belongs to the Lab's evidence methodology, not just this one test.
