---
title: WBML machine data
description: Canonical WBML 0.2–0.9 JSON resources plus the frozen 1.0 consolidation record.
---

The machine layer mirrors the frozen current-runtime evidence instead of forcing an assistant to reconstruct facts from prose.

## Retrieval order

1. Read `/worldbox-modding-docs/data/wbml/manifest.json`.
2. Use `quick-capabilities.json` only for lightweight 0.2–0.6 discovery.
3. Retrieve the matching canonical raw atlas for exact behavior.
4. Read Detailed Docs for interpretation and caveats.
5. Read Research when rejected methodology or a boundary matters.
6. Use `1000-practical-modding-baseline.json` for the freeze policy and current campaign state.

## Canonical raw exports

| Suite | Probe | Raw data |
|---|---|---|
| WBML-0200 | `0.2.0-fix3` | `0200-automatic-api-atlas.json` |
| WBML-0300 | `0.3.0-fix1` | `0300-capability-verification-atlas.json` |
| WBML-0400 | `0.4.0-fix2` | `0400-parameterized-query-atlas.json` |
| WBML-0500 | `0.5.0` | `0500-safe-mutation-atlas.json` |
| WBML-0600 | `0.6.0-fix5` | `0600-entity-lifecycle-atlas.json` |
| WBML-0700 | `0.7.0` | `0700-persistence-identity-atlas.json` |
| WBML-0800 | `0.8.0-fix1` | `0800-world-game-integration-atlas.json` |
| WBML-0900 | `0.9.0` | `0900-coverage-closure-atlas.json` |

## New mandatory rules

- Same logical ID after load does not guarantee the same CLR reference. Prefer re-resolution.
- Harmony ordering/owner observations are version-bound.
- A method-family census is not a safety classification.
- `WBML 1.0 FROZEN` means systematic research is closed for the current stack, not that every method is verified.
- Re-open broad research only on a game/NML change or a direct contradiction.

[Evidence model](../../api/evidence-model/) · [Frozen baseline](../../research/wbml-1000-frozen-baseline/)
