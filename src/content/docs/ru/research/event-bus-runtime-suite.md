---
title: WBML-0004 — Event Bus Runtime Suite
description: Runtime discovery, payload mapping, callback isolation, unsubscribe, recursion guard и stress для PoliticalWorldAPI 1.14.0.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">WBML-0004</span>
<span class="doc-status">68 PASS / 0 FAIL / 0 SKIP</span>

## Вопрос

Совпадает ли реальное поведение Event Bus API 1.14.0 с более старым creator-source и где runtime уже ушёл вперёд?

## Окружение

```text
WorldBox 0.51.2 build 719
Git build-719@5dec
NeoModLoader 1.2.0.1
PoliticalWorldAPI 1.14.0
WBML 0.0.4-fix2
```

## Phase A

Runtime вернул **23 event ID**.

Проверено:

```text
defensive copy event list
custom/unknown subscription accepted + cleanup
null handler rejected
duplicate exact subscription rejected/ignored
exact + wildcard delivery
party.renamed identity fields
rename mapping через OldValue/NewValue
изоляция payload между подписчиками
unsubscribe semantics
subscriptions → 0
```

Unknown-event result отличается от старого source 1.9 и поэтому документируется с версией runtime.

## Phase B

Один callback намеренно бросил exception, но здоровый callback всё равно выполнился. Diagnostics увеличил CallbackErrors.

Также прошли self-unsubscribe during dispatch и `UnsubscribeAll`.

## Phase C

Запрошена recursive chain 64, runtime остановился на:

```text
recursive=16
tail=16
```

Затем:

```text
100/100 writes accepted
100 callbacks
33 ms observed
```

33 ms — наблюдение, не performance guarantee.

## Исправления harness

Первый вариант ошибочно требовал source-предположения: unknown-event rejection и `OldName/NewName`.

`fix1` уже нашёл правильный payload mapping, но recursive/stress handlers сами фильтровали только `NewName`, поэтому получили ноль. Этот результат признан harness bug.

`fix2` использовал runtime-aware mapping и полностью прошёл.

## Финал

```text
PASS=68 FAIL=0 SKIP=0
A=PASS B=PASS C=PASS
SUITE RESULT: PASS
```

Имя партии восстановлено, subscriptions очищены.

## Граница

Это не полная проверка payload всех 23 событий.

[Санитизированный runtime excerpt](/worldbox-modding-docs/evidence/wbml-0004-result.txt)
