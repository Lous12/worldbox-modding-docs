---
title: Статусы evidence — быстрый справочник
description: Как читать WBML/documentation reliability labels и не расширять их смысл.
---

Используй самый сильный статус, который **реально поддерживает canonical evidence**, а не тот, который хотелось бы видеть.

| Статус | Смысл |
|---|---|
| `VERIFIED` | Конкретный tested read/call прошёл на exported runtime sample/proof. Не universal semantics. |
| `OBSERVED` | Увидели, но не повысили до более сильной гарантии. |
| `OBSERVED-THREW` | Этот exact argument set бросил exception. Это **не** «метод сломан». |
| `VERIFIED-REVERSIBLE` | Одна controlled scalar mutation дала expected delta и exact restore без residual/collateral fields. |
| `VERIFIED-LIFECYCLE` | Natural lifecycle path удалил entity из pinned manager/owner/registry evidence; stale checks прошли. |
| `VERIFIED-NONTERMINAL-WINDOW` | Entity оставался зарегистрирован bounded observation window после lifecycle call. Не permanent-persistence claim. |
| `VERIFIED-EMPTY-REGISTERED-WINDOW` | Kingdom дошёл до zero cities, но остался registered bounded window. Не permanent-persistence claim. |
| `SKIP` | Ветка/precondition не выполнена; никогда не превращать в Verified. |
| `FAILED-ASSUMPTION` | Harness/source assumption доказанно неверный; только negative knowledge. |
| `UNSAFE` | Исключено или показано unsafe в tested policy. |
| `UNKNOWN` | Baseline не отвечает. |
| `research-needed` | Routing label docs: нужен focused probe, а не выдуманный ответ. |

Порядок source of truth для runtime behavior:

```text
canonical machine export / detailed WBML result
→ Detailed Docs
→ Quick Docs
```

Rejected fix может быть очень полезен в Research archive и одновременно не иметь права становиться public capability truth.

[Подробная evidence model](../../api/evidence-model/) · [Machine-data rules](../../ai/wbml-machine-data/) · [Research archive](../../research/)
