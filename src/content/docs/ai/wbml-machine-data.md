---
title: WBML machine data
description: Canonical WBML 0.2–0.6 JSON resources, retrieval order and AI interpretation rules.
---

The v0.3.0 documentation release publishes the same canonical WBML results in a machine-facing layer instead of forcing an assistant to infer everything from prose.

## Retrieval order

When answering a WorldBox-internal question covered by these atlases:

1. Read `/worldbox-modding-docs/data/wbml/manifest.json` to identify the canonical run and exact tested stack.
2. Use `/worldbox-modding-docs/data/wbml/quick-capabilities.json` for lightweight discovery.
3. For a concrete method/result, retrieve the matching full canonical atlas.
4. Read Detailed Docs for human interpretation and caveats.
5. Read the Research page when the result depends on rejected methodology or a boundary.

Do not treat the compact index as exhaustive; the full atlas wins if they differ.

## Canonical raw exports

| Suite | Canonical probe | Raw data |
|---|---|---|
| WBML-0200 | `0.2.0-fix3` | `/worldbox-modding-docs/data/wbml/0200-automatic-api-atlas.json` |
| WBML-0300 | `0.3.0-fix1` | `/worldbox-modding-docs/data/wbml/0300-capability-verification-atlas.json` |
| WBML-0400 | `0.4.0-fix2` | `/worldbox-modding-docs/data/wbml/0400-parameterized-query-atlas.json` |
| WBML-0500 | `0.5.0` | `/worldbox-modding-docs/data/wbml/0500-safe-mutation-atlas.json` |
| WBML-0600 | `0.6.0-fix5` | `/worldbox-modding-docs/data/wbml/0600-entity-lifecycle-atlas.json` |

## Mandatory interpretation rules

- `VERIFIED` means exact tested call/read success, not universal semantics.
- Keep `visibility`/access. Reflection success does not convert an internal/private member into a stable public API.
- Keep `owner_source` and, for parameterized queries, exact argument provenance.
- If `argument_status` is unresolved, do not manufacture an argument.
- `OBSERVED-THREW` describes one exported argument set and exception only.
- `VERIFIED-REVERSIBLE` applies only to the exact 19 scalar transactions exported by 0.5.0.
- `VERIFIED-NONTERMINAL-WINDOW` / `VERIFIED-EMPTY-REGISTERED-WINDOW` are bounded windows. Never turn them into “persists forever”.
- `same_id_new_reference=0` is an observation inside the tested window, not proof that IDs are never reused.
- Superseded fix runs listed in Research are negative methodology knowledge; they are intentionally absent from the canonical raw-data directory.
- If a question is outside the exported evidence, answer `research-needed` and propose a focused WBML test rather than inventing an API.

## Human/machine synchronization rule

A WBML batch is considered integrated only after canonical evidence → Detailed Docs → Quick Docs → machine/AI data. This release is the first full batch under that rule for 0.2–0.6.

[Evidence model](../../api/evidence-model/) · [Research archive](../../research/) · [Quick Docs](../../quick/)
