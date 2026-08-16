---
title: WBML-0005 — Actions / Conditions / Effects Suite
description: Runtime validation, same-ID replacement, conditions, execution, operation codes, effects и безопасный cleanup.
---

<span class="doc-status">✅ Verified — выполненные ветки</span>
<span class="doc-status">WBML-0005</span>
<span class="doc-status">PARTIAL PASS: 90 / 0 / 3</span>

## Вопрос

Можно ли использовать creator-facing action stack PoliticalWorldAPI 1.14.0 как целостную систему: registration → conditions → execution → effects → unregister?

## Окружение

```text
WorldBox 0.51.2 build 719
Git build-719@5dec
NeoModLoader 1.2.0.1
PoliticalWorldAPI 1.14.0
WBML 0.0.5-fix4
```

## Phase A

Проверены validation PW303/PW304, warning PW305, регистрация трёх action и metadata queries.

Главное открытие:

```text
RegisterAction(тот же ID) → accepted / replaced
```

Replacement был виден через `GetAction`, после чего Lab восстановил canonical definition.

Phase A: `22 PASS / 0 FAIL / 0 SKIP`.

## Phase B

Прошли `All`, `Any`, `Not`, включая:

```text
Any(empty) → true
Not(null)  → true
```

Также прошли government/ideology/current/system/stability, addon int/bool/tag, dynamic Enabled и выполненные party conditions.

Исправленный harness больше не считал старый `PartyInfo.Support` вечным: перед support assertions партия перечитывалась по ID.

## Phase C

Проверены:

```text
disabled action не вызывает handler
action-condition-failed
ExecuteAction success
TryExecuteAction success + ok
action-not-found
invalid-kingdom
handler side effects
Effects.Sequence
```

## Phase D

Прошли addon int/bool/tags effects, stability mutation/restoration, party radicalism mutation/restoration и unregister paths.

### Support

В target kingdom была одна active party. Ранний прогон уже показал single-party normalization support в 100, поэтому final suite безопасно пропустил точную mutation.

Phase D: `87 PASS / 0 FAIL / 2 SKIP`.

## Почему понадобился fix4

`fix3` правильно пропустил dangerous mutation в Phase D, но старый FINAL cleanup всё равно попробовал «восстановить» support из старого snapshot. Сам cleanup вызвал setter и получил 100.

Этот run признан harness/finalizer bug.

В `fix4`:

```text
если Phase D support не менял
→ FINAL setter не вызывает
→ restoration = SKIP
```

## Финал

```text
PASS=90
FAIL=0
SKIP=3
A=PASS B=PASS C=PASS D=PASS
SUITE RESULT: PARTIAL PASS
```

Все три SKIP относятся к exact party-support mutation/restoration.

## Ещё одно наблюдение

Live query после unregister дал 0 actions, но diagnostics после replacement history показал `Registered actions: 2`. Пока это 👁 Observed bookkeeping mismatch.

## Граница

Выполненные action/condition/effect/unregister ветки verified. Exact multi-party support mutation пока нет.

[Санитизированный runtime excerpt](/worldbox-modding-docs/evidence/wbml-0005-result.txt)
