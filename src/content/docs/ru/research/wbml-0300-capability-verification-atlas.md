---
title: WBML 0.3.0 — Capability Verification Atlas
description: Canonical zero-argument non-void verification и исправление stale sample/classifier в 0.3.0-fix1.
---

**Финальный статус:** `CLOSED PASS`  
**Canonical probe:** `0.3.0-fix1`  
**Run:** `82c23a7c8916`  
**Final matrix:** `28 PASS / 0 FAIL / 0 SKIP`, P–F PASS.

## Вопрос исследования

Какие zero-arg non-void методы из structural surface 0.2 можно доказать read-like и успешно вызвать на live/non-stale runtime owner?

## Canonical result

```text
methods scanned           18,625
zero-arg non-void          4,411
capability records         3,021
blocked                    16,874
  dangerous                   69
  unsupported              15,535
IL-safe                     1,751
IL-rejected                 1,270
owner resolved              1,505
no runtime owner              246
invoked                     1,505
VERIFIED                    1,462
OBSERVED-THREW                 43
public VERIFIED             1,116
reflection VERIFIED           346
unsafe invoked                  0
stale invoked                   0
stability            1429 same / 33 changed / 0 failed
engine exceptions               0
```

## Почему initial green run отвергнут

Первый 0.3 был structurally green, но первый available Actor часто шёл из `ActorManager._dead_objects[]`. Это создавало ложные `OBSERVED-THREW`/false-useful results для методов, которым нужен live actor. Второй баг считал любое имя с `attack` dangerous раньше, чем проверял read-only intent.

`fix1` добавил sample-quality ranking и stale prevention; canonical Actor sample стал `City._professions_dict{value}[]` quality 110. Read intent также теперь идёт раньше broad dangerous-name heuristic.

## Evidence semantics

`VERIFIED` — успешный call на exact non-stale runtime sample после structural read-only proof. Это **не** semantic guarantee для всех world states.

Machine data: `/worldbox-modding-docs/data/wbml/0300-capability-verification-atlas.json`  
Evidence: `/worldbox-modding-docs/evidence/wbml-0300-result.txt`

[Detailed atlas](../../api/runtime-capability-atlas/) · [Actor reference](../../api/runtime-actor/) · [Дальше: WBML 0.4](../wbml-0400-parameterized-query-atlas/)
