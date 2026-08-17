---
title: Machine data WBML
description: Canonical WBML 0.2–0.6 JSON resources, retrieval order и правила интерпретации для ИИ.
---

В release v0.3.0 те же canonical WBML results публикуются отдельным machine-facing слоем, чтобы assistant не реконструировал факты из случайных кусков prose.

## Retrieval order

Для вопроса по WorldBox internals:

1. Прочитать `/worldbox-modding-docs/data/wbml/manifest.json` — canonical run и exact tested stack.
2. Для лёгкого discovery использовать `/worldbox-modding-docs/data/wbml/quick-capabilities.json`.
3. Для конкретного method/result открыть полный canonical atlas.
4. Прочитать Detailed Docs для caveats/interpretation.
5. Если важна rejected methodology или boundary — открыть Research page.

Compact index не exhaustive; при расхождении полный atlas главнее.

## Canonical raw exports

| Suite | Canonical probe | Raw data |
|---|---|---|
| WBML-0200 | `0.2.0-fix3` | `/worldbox-modding-docs/data/wbml/0200-automatic-api-atlas.json` |
| WBML-0300 | `0.3.0-fix1` | `/worldbox-modding-docs/data/wbml/0300-capability-verification-atlas.json` |
| WBML-0400 | `0.4.0-fix2` | `/worldbox-modding-docs/data/wbml/0400-parameterized-query-atlas.json` |
| WBML-0500 | `0.5.0` | `/worldbox-modding-docs/data/wbml/0500-safe-mutation-atlas.json` |
| WBML-0600 | `0.6.0-fix5` | `/worldbox-modding-docs/data/wbml/0600-entity-lifecycle-atlas.json` |

## Mandatory rules

- `VERIFIED` = exact tested success, не universal semantics.
- Сохранять `visibility`/access. Reflection success не делает internal/private member stable public API.
- Сохранять `owner_source` и exact argument provenance.
- Если argument unresolved — не изобретать значение.
- `OBSERVED-THREW` описывает один exported argument set и exception.
- `VERIFIED-REVERSIBLE` только для exact 19 transactions 0.5.
- `VERIFIED-NONTERMINAL-WINDOW` / `VERIFIED-EMPTY-REGISTERED-WINDOW` — bounded windows, не permanent persistence.
- `same_id_new_reference=0` — observation window, не proof «IDs никогда не reuse».
- Superseded fixes в Research — negative methodology; они намеренно не лежат в canonical raw data.
- Если evidence нет — `research-needed` + focused WBML probe, а не выдуманный API.

## Human/machine sync

WBML batch интегрирован только после canonical evidence → Detailed Docs → Quick Docs → machine/AI data. Release 0.3.0 впервые полностью применяет это правило к 0.2–0.6.

[Evidence model](../../api/evidence-model/) · [Research archive](../../research/) · [Quick Docs](../../quick/)
