---
title: WBML-0002 — addon state остаётся изолированным между сохранениями миров
description: Runtime-доказательство того, что current-run kingdom state PoliticalWorldAPI оставался привязан к правильному миру в последовательности A → B → A → B.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">🧪 WorldBox Modding Lab</span>
<span class="doc-status">WBML-0002</span>

WBML-0002 проверял другой вопрос, чем WBML-0001:

> Если два world save используют один addon и одинаковые logical data keys, появится ли addon state одного мира в другом?

## Почему потребовался отдельный probe

WBML-0001 подтвердил:

```text
тот же save + полный restart процесса → values возвращаются
```

Но это **не доказывало** isolation между разными мирами. Плохая реализация могла выглядеть persistent, одновременно протекая через static/runtime state.

Поэтому WBML-0002 использовал два разных save и две разные current-run signatures.

## Исправление harness перед валидным прогоном

Первая версия 0.0.2 имела методологический баг: провал Step C не запрещал Step D напечатать финальный success.

Этот прогон был отклонён.

`0.0.2-fix1` добавил:

```text
строгий state machine A → B → C → D
уникальный run token
step flags
final gate с A=PASS B=PASS C=PASS D=PASS
failure lockout
```

Probe становится доказательством только тогда, когда можно доверять его собственной логике verdict.

## Проверенная среда

```text
WorldBox:          0.51.2
build:             719
git:               build-719@5dec
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
Lab:               0.0.2-fix1
```

Current-run token:

```text
af599151c6da
```

## Последовательность

```text
World A
→ записать signature A
→ save
→ загрузить World B
→ подтвердить отсутствие signature A
→ записать signature B
→ save
→ загрузить World A
→ подтвердить отсутствие B + возврат values A
→ загрузить World B
→ подтвердить отсутствие A + возврат values B
```

Probe проверял:

```text
marker
int
Unicode string
bool
float
addon-private kingdom tag
shared kingdom tag
```

## Результаты шагов

### A — запись World A

```text
A-IMMEDIATE RESULT: 6/6 DATA PASS | marker=PASS => PASS
STEP A RESULT: PASS
```

### B — чистый World B и запись B

До записи B probe проверил 21 kingdom:

```text
WORLD B CLEAN CHECK: PASS
no current-run WORLD A signature found across 21 kingdoms
```

Затем:

```text
B-IMMEDIATE RESULT: 6/6 DATA PASS | marker=PASS => PASS
STEP B RESULT: PASS
```

### C — возврат в World A

```text
RETURN A: current-run WORLD B signature absent => PASS
A-RETURN RESULT: 6/6 DATA PASS | marker=PASS => PASS
STEP C RESULT: PASS
```

### D — возврат в World B

```text
RETURN B: current-run WORLD A signature absent => PASS
B-RETURN RESULT: 6/6 DATA PASS | marker=PASS => PASS
STEP D RESULT: PASS
```

Исправленный final gate потребовал успех каждого шага:

```text
FINAL GATE: A=PASS B=PASS C=PASS D=PASS
FINAL RESULT: WORLD ISOLATION VERIFIED FOR THIS RUN.
```

## Подтверждённый claim

В проверенной среде kingdom state PoliticalWorldAPI, использованный probe, оставался изолирован между двумя протестированными world save в рамках одного процесса WorldBox.

Current-run signature A не появилась в B, signature B не появилась в A, а собственные values каждого мира возвращались после повторной загрузки соответствующего save.

## Граница доказательства

Этот result сам по себе **не доказывает**:

- isolation party-private data;
- точный физический save file/database для каждого value;
- isolation всех возможных типов PoliticalWorldAPI;
- будущие версии WorldBox/NML/Political World;
- isolation в последовательности с полным restart процесса.

Full-process persistence отдельно подтверждён в [WBML-0001](../wbml-0001-addon-data-persistence/).

## Методологический урок

Сломанный harness тоже полезен как research material, если ложный verdict отклоняется, а не попадает в Verified.

Правило теперь такое:

```text
final result = conjunction of every required step
```

а не:

```text
last step passed → whole experiment passed
```

Это правило относится уже ко всей методологии Lab.
