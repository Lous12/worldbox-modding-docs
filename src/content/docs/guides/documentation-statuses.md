---
title: Documentation status system
description: How the project distinguishes verified facts, observations, experiments, inferences, failures, unsafe patterns, unknowns, and outdated information.
---

<span class="doc-status">✅ Project methodology</span>

Every technical claim should say **how certain it is** and **which runtime version was tested**.

## Public documentation statuses

| Status | Meaning |
| --- | --- |
| ✅ **Verified** | Reproduced in a real game build and confirmed by runtime evidence. |
| 👁 **Observed** | Seen at runtime, but not promoted to a universal contract. |
| 🧪 **Experimental** | A current working path or defined experiment awaiting stronger verification. |
| ⚠️ **Inferred** | Evidence-backed conclusion without direct runtime proof. |
| ❌ **Failed** | A tested approach/harness assumption known to be wrong or broken. |
| 🕒 **Outdated** | Previously verified on an older baseline and not re-tested. |

## WBML baseline-only classifications

The machine-readable WBML 0.1.0 catalog additionally uses:

- **FAILED ASSUMPTION** — the Lab disproved a rule that looked reasonable (for example, requiring a new WorldTile reference after worldgen);
- **UNSAFE** — a pattern can damage a test world, destabilize performance or produce unreliable results;
- **UNKNOWN** — evidence is intentionally insufficient. It is not a hidden PASS or FAIL.

These map into the public docs rather than replacing the public status vocabulary.

## Current baseline

**WorldBox 0.51.2 build 719 · NML 1.2.0.1 · Unity 2022.3.60f1 · ResearchEngine v2.1.1**

See [WBML 0.1.0 First Research Baseline](../../research/wbml-0100-first-research-baseline/).

## Evidence rule

A source member existing in an assembly does not prove its runtime semantics. Prefer a controlled runtime probe. Preserve failed harnesses when they teach a reusable rule. Never promote `SKIP`/`UNKNOWN` because an answer would be convenient.
