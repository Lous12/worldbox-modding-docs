---
title: Political World — когда документация для ИИ устарела
description: Реальный случай, когда source, README, AI_START_HERE, llms.txt и более новый runtime представляли разные поколения API.
---

<span class="doc-status">✅ Reproduced</span>
<span class="doc-status">🤖 AI failure prevention</span>

В Political World уже были довольно редкие для модов AI-friendly файлы:

```text
AI_START_HERE.md
llms.txt
API references
RU/EN documentation
examples/
templates/
```

Это хорошо.

Но version drift всё равно появился.

## Что разошлось

В одном проверенном GitHub tree:

```text
PoliticalWorldAPI.cs → API 1.9.0
README.md            → API 1.9.0
AI_START_HERE.md     → API 1.6
llms.txt             → API 1.6.0
```

А отдельный более новый development runtime log позже уже показывал API 1.14.0.

## Почему это опасно для coding assistants

ИИ может идеально выполнить инструкции и всё равно получить неправильный результат, если его entry file устарел.

Например, ассистент, прочитавший только `AI_START_HERE.md`, может совершенно правильно сделать:

```text
Check IsCompatible(1, 6)
Read API_REFERENCE_1_6.md
```

и не использовать возможности, уже существующие в проверенном source API 1.9.

В обратную сторону ИИ, которому дали более новый runtime log, может решить, что API 1.14 уже существует в более старом публичном GitHub source snapshot.

Обе ошибки возникают из-за отсутствия **provenance**, а не из-за C# syntax.

## Исправление на уровне системы документации

AI entry files должны иметь machine-readable version metadata.

Например:

```yaml
project_version: 1.7.0
api_version: 1.9.0
source_commit: ce0c91754722dd1e88e8eaf116c4c667ae020204
verified_worldbox: 0.51.2-build-719
generated_from: source
last_verified: 2026-08-16
```

А CI позже должен сравнивать заявленную AI-версию с реальной константой в коде.

## Будущая автоматическая проверка

Для Political World простой script сможет извлекать:

```csharp
public const string ApiVersion = "..."
```

и сравнивать со значениями в:

```text
README
AI_START_HERE.md
llms.txt
API reference index
```

При расхождении CI должен падать или хотя бы выдавать documentation warning.

## Вывод

Создать `llms.txt` — не значит закончить AI-документацию.

Она требует такой же дисциплины, как public API docs:

- version binding;
- automated consistency checks;
- явная identity snapshot;
- stale markers;
- отдельное хранение runtime evidence и source evidence.

Лучшая документация для ИИ — не самая длинная.

Лучшая — та, в которой модели **трудно случайно склеить несовместимые факты**.
