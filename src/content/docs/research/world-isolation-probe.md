---
title: World Isolation Probe
description: WBML-0002 runtime test for PoliticalWorldAPI kingdom state across two different WorldBox saves.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">WBML-0002</span>
<span class="doc-status">WorldBox 0.51.2 build 719</span>

## Research question

When the same addon uses the same logical storage keys in two different world saves, does current-run kingdom state remain attached to the correct world?

## Environment

```text
WorldBox:          0.51.2
build:             719
git:               build-719@5dec
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
WorldBox Modding Lab: 0.0.2-fix1
```

## Harness design

The corrected probe requires this exact order:

```text
A → B → C(return A) → D(return B)
```

Every step must pass before the next step is accepted. The final verdict requires:

```text
A=PASS B=PASS C=PASS D=PASS
```

A unique run token prevents old probe data from accidentally satisfying the current run.

## Runtime result

Run token:

```text
af599151c6da
```

Observed sequence:

```text
STEP A RESULT: PASS
WORLD B CLEAN CHECK: PASS
STEP B RESULT: PASS
RETURN A: current-run WORLD B signature absent => PASS
STEP C RESULT: PASS
RETURN B: current-run WORLD A signature absent => PASS
STEP D RESULT: PASS
FINAL GATE: A=PASS B=PASS C=PASS D=PASS
FINAL RESULT: WORLD ISOLATION VERIFIED FOR THIS RUN.
```

The A and B round trips each returned:

```text
int
Unicode string
bool
float
addon-private kingdom tag
shared kingdom tag
```

with the correct current-run marker.

## Result

✅ **Verified for this environment:** the tested PoliticalWorldAPI kingdom state did not leak between the two tested saves during the A → B → A → B sequence, and each save recovered its own current-run state when loaded again.

## Scope limit

This result is specifically a two-save, same-process world-isolation probe.

Do not silently rewrite it as:

```text
all addon data is globally isolated under every load/restart condition
```

Party-private state, full-restart isolation, legacy migration behavior and future versions still require their own evidence.

Sanitized runtime excerpt: [`/evidence/wbml-0002-result.txt`](/worldbox-modding-docs/evidence/wbml-0002-result.txt)
