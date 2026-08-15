---
title: Безопасная batch registration addon content
description: Как creator API Political World сообщает partial success при регистрации нескольких definitions.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🧰 Creator helper</span>

Регистрировать двадцать объектов по одному — много boilerplate и легко пропустить partial failure.

Creator API Political World даёт helpers:

```csharp
RegisterIdeologies(...)
RegisterGovernments(...)
RegisterActions(...)
RegisterRarePoliticalEvents(...)
```

## Result object

Проверенный source возвращает:

```csharp
public sealed class BatchRegistrationResult
{
    public int Requested;
    public int Registered;
    public List<string> FailedIds;

    public bool AllSucceeded { get; }
}
```

## Пример

```csharp
var result = PoliticalWorldAPI.RegisterIdeologies(
    AddonId,
    new[]
    {
        ideologyA,
        ideologyB,
        ideologyC
    }
);

if (!result.AllSucceeded)
{
    foreach (string failedId in result.FailedIds)
    {
        LogWarning("Failed ideology: " + failedId);
    }
}
```

## Partial success сохраняется

Один failed item не превращается в exception, который отменяет все предыдущие success.

Для каждого definition:

```text
Requested++
try registration
    success → Registered++
    failure → FailedIds.Add(id)
```

Thrown exception считается failure конкретного item.

## Зачем это нужно

Автор должен различать:

```text
requested 20
registered 19
failed 1
```

и:

```text
register everything returned false
```

Первый вариант даёт полезную диагностику.

## Batch registration не является transaction

Проверенный helper **не откатывает** уже зарегистрированный content, если более поздний definition не прошёл.

Поэтому:

```text
AllSucceeded == false
```

может означать, что большая часть content уже успешно зарегистрирована.

Если нужны all-or-nothing semantics, сначала валидируйте весь набор или делайте explicit rollback через поддерживаемые API.

## Stable IDs в FailedIds

Failed content ID:

```text
YourName.MyAddon.technocracy
```

намного полезнее:

```text
item 17
```

Stable IDs удобно искать в логах человеку и ИИ.

## Общий вывод

Bulk creator API должен возвращать **structured partial result**:

- requested;
- successful;
- failed stable IDs;
- при возможности diagnostic codes/reasons.

Так большие content packs намного легче поддерживать.
