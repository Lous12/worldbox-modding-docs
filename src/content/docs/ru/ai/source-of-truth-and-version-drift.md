---
title: Источник истины и расхождение версий для ИИ
description: Как ИИ должен разбирать конфликтующие версии исходника, runtime-логов, README и llms.txt.
---

<span class="doc-status">🤖 AI-critical</span>
<span class="doc-status">✅ Реальное расхождение воспроизведено</span>

Документация может устареть.

Документация **для ИИ** тоже может устареть.

Political World сейчас даёт очень хороший реальный пример, почему ИИ нельзя прочитать одну строку версии и решить, что весь репозиторий и runtime соответствуют ей.

## Реальное расхождение

В проверенном snapshot Political World на GitHub:

### Настоящий исходник API

`src/PoliticalWorld/API/PoliticalWorldAPI.cs` содержит:

```csharp
public const string ApiVersion = "1.9.0";
public const int ApiMajor = 1;
public const int ApiMinor = 9;
```

### README

Root README тоже описывает Public API **1.9.0**.

### mod.json

Metadata пакета указывает Political World **1.7.0**, а description упоминает internal API 1.9 candidate.

### AI_START_HERE.md

При этом root AI guide всё ещё говорит Public API **1.6** и советует:

```text
IsCompatible(1, 6)
```

### llms.txt

Root `llms.txt` тоже продолжает называть Public API **1.6.0** и отправляет ИИ к reference 1.6.

### Отдельное runtime-доказательство

Отдельный development `Player-prev.log` показывает более новый локальный runtime:

```text
API: 1.14.0
Scenario Tools 0.3.0 loaded with PoliticalWorldAPI 1.14.0
```

То есть runtime-доказательство новее проверенного GitHub source snapshot.

## Правильный вывод

Нельзя взять одно число и заменить им все остальные наблюдения.

Правильное описание:

```text
Проверенный GitHub source snapshot:
  Political World 1.7.0
  PoliticalWorldAPI source constant 1.9.0

Устаревшие AI entry files в том же snapshot:
  всё ещё описывают API 1.6.0

Отдельно наблюдавшийся локальный runtime:
  PoliticalWorldAPI 1.14.0
```

Нельзя превращать это в:

```text
"На GitHub Political World уже API 1.14."
```

Это смешает разные наборы доказательств и создаст ложный факт.

## Рекомендуемый порядок источников истины

Если вопрос: что реально компилируется в конкретном source snapshot:

1. **source constants / package metadata**;
2. build output, если он есть;
3. README/reference именно этого snapshot;
4. вспомогательные AI-файлы вроде `llms.txt`.

Если вопрос: что реально загрузилось в тесте:

1. **runtime log / runtime diagnostic output**;
2. точное содержимое установленного пакета;
3. source commit/archive, из которого собран пакет;
4. документация.

## Runtime важнее намерения

README может говорить «API 1.9».

Если `Player.log` из конкретной установленной тестовой среды говорит `API: 1.14.0`, то для **этой среды** runtime-факт — 1.14.0.

Но это не переписывает историю старого GitHub commit.

## Всегда привязывайте факт к evidence scope

Хорошо:

```text
Verified в WorldBox 0.51.2 build 719 с Political World 1.7.0,
локальный runtime сообщает PoliticalWorldAPI 1.14.0.
```

Хорошо:

```text
В GitHub tree ce0c917... PoliticalWorldAPI.cs объявляет 1.9.0.
```

Плохо:

```text
PoliticalWorldAPI везде 1.14.0.
```

## Алгоритм для ИИ

Если два файла противоречат друг другу:

```text
1. Определи, что именно описывает каждый файл.
2. Определи его snapshot/build/runtime.
3. Для compile-time фактов предпочитай executable/source evidence.
4. Для loaded-runtime фактов предпочитай runtime evidence.
5. Сохрани оба факта, если они относятся к разным snapshots.
6. Пометь документацию stale, а не переписывай историю молча.
7. Не смешивай planned, source и runtime версии в одно угаданное состояние.
```

## Почему это относится ко всей документации WorldBox

Моды WorldBox одновременно живут в ZIP, Steam Workshop, GitHub, Discord test builds и локальных development-папках.

Version drift — нормальное состояние.

ИИ, который игнорирует provenance, может написать код под API, существующий в одной копии мода, но отсутствующий у пользователя.

Решение — сделать **происхождение версии частью формата документации**.
