---
title: WBML 0.2.0 — Automatic API Atlas
description: Canonical read-only atlas типов, members, runtime objects и relations из 0.2.0-fix3.
---

**Финальный статус:** `CLOSED PASS`  
**Canonical probe:** `0.2.0-fix3`  
**Run:** `0fa6e20674fc`  
**Final matrix:** `26 PASS / 0 FAIL / 0 SKIP`, P–E PASS.

## Вопрос исследования

Можно ли превратить ранние ручные probes в широкий machine-readable atlas managed-поверхности WorldBox без auto-invoke найденных gameplay methods?

## Safety policy

0.2 — **mass read-only discovery**. Он сканирует game assembly, разрешает runtime objects, читает safe fields, строит relations и research queue. Найденные methods/properties/constructors автоматически не вызываются.

## Canonical result

| Метрика | Value |
|---|---:|
| Types | 2,905 |
| Members / declared | 38,553 / 38,553 |
| Type-ID collisions | 0 |
| Specialized base signatures | 376 |
| Runtime concrete / specialized types | 697 / 29 |
| Runtime type records / unmapped | 676 / 0 |
| Safe reads | 8,488 OK / 0 failed |
| Relations | 19,150 |
| Interface relations | 607 |
| Specialized relation signatures | 920 |
| Unresolved relation endpoints | 0 |
| Research queue | 15,079 |
| Redacted runtime strings | 1 |
| Unsafe runtime snapshots | 0 |
| Loader/static exceptions | 0 / 0 |
| Stability | 4,988 same / 12 changed / 0 failed |

## Methodology corrections

Ранние 0.2 были superseded при укреплении schema. Только `fix3` — public capability source. Он исправил concrete/canonical generic signatures, runtime closed-generic specialization, ложный privacy hit на FMOD `event:/...` и category substring false positives.

Ранние runs остаются harness history, а не параллельной truth.

## Чего 0.2 не доказывает

Queue entry/member record не доказывает safe callability. 0.2 картирует поверхность; 0.3+ проверяет behavior selected calls.

Machine data: `/worldbox-modding-docs/data/wbml/0200-automatic-api-atlas.json`  
Evidence: `/worldbox-modding-docs/evidence/wbml-0200-result.txt`

[Detailed atlas](../../api/runtime-capability-atlas/) · [Quick Docs](../../quick/) · [Дальше: WBML 0.3](../wbml-0300-capability-verification-atlas/)
