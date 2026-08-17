---
title: WBML evidence model
description: Source-of-truth rules for signatures, provenance, runtime results, lifecycle windows and rejected methodology.
---

This page is the interpretation contract for the new WBML 0.2–0.9 + frozen 1.0 baseline reference pages.

## Source-of-truth order

For a runtime claim:

```text
canonical WBML export + final matrix
→ Detailed API/reference
→ Quick Docs
→ examples/recipes
```

A convenient layer may shorten the explanation, but it may not widen the claim.

## What a method record can prove

A `VERIFIED` query record proves that the exact method was structurally accepted by the read-only verifier, a non-stale runtime owner was resolved when needed, the call completed in that runtime state, and the exported result/stability were observed. It does **not** prove that every input or every future WorldBox version behaves the same.

A parameterized record additionally depends on **argument provenance**. `0.4.0-fix2` distinguishes collection keys/elements, semantically related fields, runtime objects and synthetic values. Same CLR type alone is not enough.

## Access

Detailed pages preserve access because it changes the integration cost:

- `public` — directly callable from normal C# if the type/member is accessible in the mod compilation context;
- `internal` / `protected` / `private` — WBML may verify the runtime behavior through reflection, but that is not equivalent to a stable public modding contract.

`reflection_verified` in the atlas means successful evidence, not “recommended public API”.

## New status families

- `VERIFIED-REVERSIBLE`: one controlled scalar transaction changed the expected field and restored the exact original value with zero residual/collateral fields.
- `VERIFIED-LIFECYCLE`: natural lifecycle entry point removed the entity from pinned manager/owner/registry evidence and stale reads passed.
- `VERIFIED-NONTERMINAL-WINDOW`: same object remained registered for the exported bounded window after the lifecycle call.
- `VERIFIED-EMPTY-REGISTERED-WINDOW`: Kingdom had zero cities but remained registered for the bounded window.
- `OBSERVED-THREW`: exact exported invocation/arguments threw. Never simplify this to “broken method”.

## Rejected methodology

Superseded WBML fixes remain valuable negative knowledge. They are not mixed into the canonical machine atlases. Examples:

- stale/dead sample selection in the first 0.3 run;
- type-compatible but semantically irrelevant parameter values in early 0.4 runs;
- generic manager `destroyObject/removeObject` + `Dispose` fallback corruption in 0.6-fix1;
- floating collection provenance that caused a false City reintroduction in 0.6-fix4.

If a page needs one of those stories, link the Research page and call it a failed assumption/harness issue.

[Quick status glossary](../../quick/evidence-statuses/) · [Machine-data contract](../../ai/wbml-machine-data/) · [Research archive](../../research/)
