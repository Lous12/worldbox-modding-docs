---
title: Evidence statuses — Quick Docs
description: How to read WBML and documentation reliability labels without widening their meaning.
---

Use the strongest status that the **canonical evidence actually supports**, not the status you wish it had.

| Status | Meaning |
|---|---|
| `VERIFIED` | Exact tested read/call completed under the exported runtime sample/proof. Not universal semantics. |
| `OBSERVED` | Seen, but not promoted to a stronger guarantee. |
| `OBSERVED-THREW` | That exact exported argument set threw. It does **not** mean “method is broken”. |
| `VERIFIED-REVERSIBLE` | One controlled scalar mutation changed exactly as expected and restored with zero residual/collateral fields. |
| `VERIFIED-LIFECYCLE` | Natural lifecycle path removed the entity from pinned manager/owner/registry evidence; stale checks passed. |
| `VERIFIED-NONTERMINAL-WINDOW` | Entity remained registered for a bounded observation window after the lifecycle call. No permanent-persistence claim. |
| `VERIFIED-EMPTY-REGISTERED-WINDOW` | Kingdom reached zero cities but stayed registered for a bounded window. No permanent-persistence claim. |
| `SKIP` | Branch/precondition not executed; never convert to Verified. |
| `FAILED-ASSUMPTION` | Harness/source assumption proved wrong; useful negative knowledge only. |
| `UNSAFE` | Excluded or demonstrated unsafe under the tested policy. |
| `UNKNOWN` | Baseline does not resolve it. |
| `research-needed` | Docs routing label: create a focused probe rather than inventing an answer. |

Source-of-truth order for runtime behavior:

```text
canonical machine export / detailed WBML result
→ Detailed Docs
→ Quick Docs
```

A rejected fix may be extremely valuable in the Research archive while still being forbidden as public capability truth.

[Detailed evidence model](../../api/evidence-model/) · [Machine-data rules](../../ai/wbml-machine-data/) · [Research archive](../../research/)
