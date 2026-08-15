---
title: WBML-0001 — addon data переживает полный restart
description: Первый результат WorldBox Modding Lab, повышенный от source-backed ожидания до runtime-verified поведения.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">🧪 WorldBox Modding Lab</span>
<span class="doc-status">WBML-0001</span>

WBML-0001 — первая находка, специально добытая **WorldBox Modding Lab** и перенесённая в WorldBox Modding Docs.

## До эксперимента

Source Political World показывал:

```text
addon-private int/string → Kingdom.data-backed path
bool → int
float → invariant string
private tags → addon-private namespace
shared tags → shared persistent key
```

Это было сильное source evidence.

Но docs специально оставляли status:

```text
🧪 persistence runtime verification pending
```

потому что source intent ≠ выполненный save/load test.

## Experiment

Lab записал шесть категорий state в kingdom `Iovalis` только через public PoliticalWorldAPI.

Дальше:

```text
save
→ полностью закрыть WorldBox
→ новый процесс WorldBox
→ load same save
→ F7 VERIFY
```

Перед verification второй WRITE не выполнялся.

## Environment

```text
WorldBox          0.51.2
build             719
git               build-719@5dec
NeoModLoader      1.2.0.1
PoliticalWorldAPI 1.14.0
Lab               0.0.1
```

## Result

```text
int ............ PASS
Unicode string . PASS
bool ........... PASS
float .......... PASS
private tag .... PASS
shared tag ..... PASS

6/6 PASS
```

Unicode payload:

```text
PW_SAVE_PROBE_Ж_ß_世界
```

вернулся без изменений.

## Что изменилось в документации

До:

```text
✅ source access pattern
🧪 runtime persistence pending
```

После:

```text
✅ runtime persistence verified
```

для точно проверенной среды.

Это базовый workflow WorldBox Modding Lab:

```text
question
→ minimal probe
→ Player.log
→ reproducible result
→ version-bound documentation
```

## Почему version binding обязателен

Нельзя превращать этот результат в:

> «PoliticalWorldAPI data всегда сохраняется на любой версии WorldBox».

Подтверждённое утверждение уже и сильнее:

> На WorldBox 0.51.2 build 719, NeoModLoader 1.2.0.1 и PoliticalWorldAPI 1.14.0 это прошло WBML-0001.

После обновлений тот же claim можно прогонять заново.

## Следующий вопрос

Persistence одного save ещё может быть реализован неправильно, если state протекает через static memory в другой world.

Поэтому WBML-0002 проверяет world isolation, а не повторяет тот же тест.
