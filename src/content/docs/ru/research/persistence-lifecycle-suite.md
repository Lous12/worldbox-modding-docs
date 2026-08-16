---
title: WBML-0003 — Persistence & Party Lifecycle Suite
description: Проверка party-private persistence после полного restart, поведения missing party и lifecycle inactive/reactivate.
---

<span class="doc-status">✅ Verified — выполненные ветки</span>
<span class="doc-status">WBML-0003</span>
<span class="doc-status">PARTIAL PASS: 119 / 0 / 1</span>

## Вопросы исследования

WBML-0003 проверял одну связанную область:

1. переживают ли kingdom и party typed values save/reload и полный restart процесса WorldBox;
2. может ли сам harness доказать прошлые фазы после restart, не полагаясь на RAM;
3. что делают party getters/setters для missing party ID;
4. остаются ли данные доступными у inactive party;
5. сохраняются ли они после reactivate.

## Окружение

```text
WorldBox 0.51.2 build 719
Git build-719@5dec
NeoModLoader 1.2.0.1
PoliticalWorldAPI 1.14.0
WBML 0.0.3-fix1
```

## Почему понадобился fix1

В первом harness после полного restart итоговые counters учитывали только новые фазы: старые PASS/FAIL/SKIP жили в памяти старого процесса.

`fix1` сохранил в world state:

```text
Phase A gate
Phase B gate
PASS/FAIL/SKIP до restart
run marker
phase state
```

После запуска нового процесса Lab сначала восстановил доказательную матрицу:

```text
RESTORED PRE-RESTART MATRIX: PASS=76 FAIL=0 SKIP=1
```

Методологическое правило:

> Если после restart нам нужен факт о предыдущих шагах, доказательство этого факта тоже должно пережить restart.

## Full process restart

После нового запуска WorldBox без повторной записи вернулись kingdom:

```text
marker
int
Unicode string
bool
float
private kingdom tag
shared kingdom tag
```

и party:

```text
int
Unicode string
bool
float
```

Все выполненные assertions прошли. Дополнительно marker проверили на отсутствие дубликата у другого kingdom.

Phase C:

```text
PASS=93 FAIL=0 SKIP=1
RESULT: PASS
```

## Missing party

Для несуществующего party ID:

```text
Get int/string/bool/float → точный переданный fallback
Set int/string/bool/float → false
```

## Lifecycle

Lab нашёл активную, **не правящую** партию и выполнил:

```text
seed typed data
→ deactivate
→ active=False подтверждено
→ чтение всех typed values во время inactive
→ reactivate
→ active=True восстановлен
```

Все выполненные lifecycle assertions прошли.

## Финал

```text
PASS=119
FAIL=0
SKIP=1
A=PASS B=PASS C=PASS D=PASS
SUITE RESULT: PARTIAL PASS
```

Один SKIP — это environmental gap: в исходной фазе не было подходящей второй партии для same-kingdom party-to-party isolation.

Точная граница:

```text
✅ выполненные persistence/restart/lifecycle ветки verified
🧪 party-to-party isolation пока не доказан
```

## Не доказано этим suite

- физический формат save storage;
- изоляция party A от party B;
- другие версии;
- все возможные hard-delete/removal сценарии партий;
- безопасность изменения ruling party.

## Evidence

[Санитизированный runtime excerpt](/worldbox-modding-docs/evidence/wbml-0003-result.txt)
