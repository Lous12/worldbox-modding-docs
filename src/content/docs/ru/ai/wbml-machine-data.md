---
title: Machine data WBML
description: Canonical WBML 0.2–0.9 JSON resources и frozen 1.0 consolidation record.
---

Machine layer зеркалит frozen current-runtime evidence и не заставляет assistant восстанавливать факты по prose.

## Retrieval order

1. Читать `/worldbox-modding-docs/data/wbml/manifest.json`.
2. `quick-capabilities.json` использовать только для lightweight discovery 0.2–0.6.
3. Для exact behavior брать matching canonical raw atlas.
4. Для interpretation/caveats читать Detailed Docs.
5. Для rejected methodology/boundary — Research.
6. Для freeze policy/current campaign state — `1000-practical-modding-baseline.json`.

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

## Новые mandatory rules

- Same logical ID после load не гарантирует same CLR reference. Нужен re-resolve.
- Harmony ordering/owner observations version-bound.
- Method-family census не является safety classification.
- `WBML 1.0 FROZEN` = systematic research закрыт для current stack, а не «каждый метод verified».
- Broad research открывается снова только после game/NML change или direct contradiction.

[Evidence model](../../api/evidence-model/) · [Frozen baseline](../../research/wbml-1000-frozen-baseline/)
