---
title: Diagnostics для авторов аддонов
description: Как Public API Political World превращает регистрации, warnings и callback failures в удобный support report.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🛠 Supportability pattern</span>

Public API намного легче поддерживать, если автор аддона может получить один компактный diagnostic report вместо ручного описания внутреннего состояния.

В проверенном API Political World diagnostics — лёгкая система **без собственного Update loop**.

## Публичные методы

Исходник предоставляет:

```csharp
PoliticalWorldAPI.GetAddonDiagnostics(addonId)
PoliticalWorldAPI.GetDiagnosticsReport(addonId)
PoliticalWorldAPI.GetAllDiagnosticsReports()
PoliticalWorldAPI.LogDiagnosticsReport(addonId)
```

## Что отслеживается

Для каждого addon:

```text
registered ideologies
registered governments
registered actions
registered rare political events
event subscriptions
callback errors
warnings
errors
recent diagnostic entries
```

Recent history ограничена:

```text
32 entries
```

Старые записи постепенно удаляются из этой небольшой истории.

## Зачем нужны и counters, и recent entries

Counter отвечает:

> «Были ли вообще callback failures?»

Recent entries:

> «Что именно ломалось последним?»

Нужны оба.

Хранить бесконечный лог в памяти не требуется.

## Реальный runtime report

В одном нашем development runtime Scenario Tools выводил:

```text
[Political World API]
API: 1.14.0
Addon: Scenario Tools [Lous12.ScenarioTools]
Registered ideologies: 0
Registered governments: 0
Registered actions: 0
Registered rare political events: 0
Event subscriptions: 0
Callback errors: 0
Warnings: 0
Errors: 0
Recent diagnostics:
- INFO PWDIAG001: Addon registered: Scenario Tools
```

Этот runtime относится к более новому local build, чем отдельно документируемый GitHub source snapshot API 1.9.

## Структурированные diagnostic codes

Примеры, подтверждённые исходником:

```text
PWDIAG001  addon registered
PWDIAG010  ideology registered
PWDIAG015  government registered
PWDIAG016  rare political event registered
PWDIAG020  action registered
PWDIAG030  event subscription added
PWDIAG040  callback failed
```

Validation/registration code также пишет отдельные warning/error codes.

Стабильный code удобен потому, что пользователь, документация и ИИ могут искать:

```text
PWDIAG040
```

а не пытаться совпасть по меняющемуся тексту.

## Callback error привязан к конкретному addon

Если Event Bus callback падает, diagnostics увеличивает:

```text
CallbackErrors
Errors
```

именно у subscriber addon и записывает связанное событие.

Это намного полезнее одного общего exception в core mod.

## Report должен легко копироваться

`GetDiagnosticsReport()` создаёт обычный plain-text report.

Плюсы:

- легко вставить в GitHub Issue или Discord;
- легко читать ИИ;
- не нужен custom UI;
- остаётся в `Player.log`;
- не зависит от локализации.

## Минимальное debug-действие

Автор addon может сделать debug action, вызывающий:

```csharp
PoliticalWorldAPI.LogDiagnosticsReport(AddonId);
```

Тогда bug report:

```text
1. воспроизвести проблему;
2. запустить diagnostic action;
3. приложить Player.log.
```

## Общий вывод

Observability должна быть частью public mod API.

Не ждите первого:

> «не работает».

Framework заранее должен уметь ответить:

```text
Зарегистрировался ли addon?
Сколько контента зарегистрировано?
Сколько подписок?
Падали ли callbacks?
Какие последние warnings/errors?
Какая API version сформировала report?
```
