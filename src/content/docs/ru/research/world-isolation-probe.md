---
title: World Isolation Probe
description: Runtime-тест WBML-0002 для kingdom state PoliticalWorldAPI между двумя разными сохранениями WorldBox.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">WBML-0002</span>
<span class="doc-status">WorldBox 0.51.2 build 719</span>

## Research question

Если один addon использует одинаковые logical storage keys в двух разных world save, остаётся ли current-run kingdom state привязан к правильному миру?

## Среда

```text
WorldBox:          0.51.2
build:             719
git:               build-719@5dec
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
WorldBox Modding Lab: 0.0.2-fix1
```

## Дизайн harness

Исправленный probe требует строгий порядок:

```text
A → B → C(return A) → D(return B)
```

Каждый шаг должен пройти до следующего. Финальный verdict требует:

```text
A=PASS B=PASS C=PASS D=PASS
```

Уникальный run token не даёт старым probe data случайно засчитать текущий прогон.

## Runtime result

Run token:

```text
af599151c6da
```

Наблюдаемая последовательность:

```text
STEP A RESULT: PASS
WORLD B CLEAN CHECK: PASS
STEP B RESULT: PASS
RETURN A: current-run WORLD B signature absent => PASS
STEP C RESULT: PASS
RETURN B: current-run WORLD A signature absent => PASS
STEP D RESULT: PASS
FINAL GATE: A=PASS B=PASS C=PASS D=PASS
FINAL RESULT: WORLD ISOLATION VERIFIED FOR THIS RUN.
```

В обоих round trip вернулись:

```text
int
Unicode string
bool
float
addon-private kingdom tag
shared kingdom tag
```

с правильным current-run marker.

## Результат

✅ **Verified для этой среды:** протестированный kingdom state PoliticalWorldAPI не протёк между двумя save в последовательности A → B → A → B, и каждый save вернул свой собственный current-run state после загрузки.

## Граница scope

Это конкретно two-save, same-process world-isolation probe.

Нельзя автоматически превращать его в claim:

```text
all addon data is globally isolated under every load/restart condition
```

Party-private state, full-restart isolation, legacy migration и будущие versions требуют отдельного evidence.

Sanitized runtime excerpt: [`/evidence/wbml-0002-result.txt`](/worldbox-modding-docs/evidence/wbml-0002-result.txt)
