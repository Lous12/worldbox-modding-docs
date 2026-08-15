---
title: Регистрация addon через PoliticalWorldAPI
description: Проверенные по исходнику правила регистрации Political World addon и ownership публичных content IDs.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">Political World GitHub snapshot ce0c917</span>
<span class="doc-status">API source generation 1.9.0</span>

До подписки на события и регистрации собственного контента addon должен зарегистрировать identity:

```csharp
PoliticalWorldAPI.RegisterAddon(...)
```

## Definition

Public definition:

```csharp
public sealed class AddonDefinition
{
    public string Id;
    public string Name;
    public string Version;
    public string Description;
    public string Author;
}
```

Минимальный пример:

```csharp
private const string AddonId = "YourName.MyAddon";

bool ok = PoliticalWorldAPI.RegisterAddon(
    new PoliticalWorldAPI.AddonDefinition
    {
        Id = AddonId,
        Name = "My Addon",
        Version = "0.1.0",
        Author = "YourName",
        Description = "Example addon"
    }
);
```

## Проверка Addon ID

В проверенном source валидируется:

- ID не пустой;
- длина от 3 до 96 символов;
- разрешены буквы, цифры, `.`, `_`, `-`;
- первый и последний символ — буква или цифра;
- core ID `Lous12.PoliticalWorld` зарезервирован;
- duplicate addon ID отклоняется;
- Name обязателен.

Отсутствие `.` namespace separator сейчас создаёт warning, а не hard failure.

Рекомендуемый формат:

```text
AuthorOrOrg.ProjectName
```

Например:

```text
YourName.MyPoliticalAddon
```

## Сначала addon, потом content

Обычный порядок:

```text
1. Проверить API compatibility.
2. RegisterAddon.
3. При необходимости проверить capabilities.
4. Зарегистрировать localization/content/events/actions.
5. Вывести diagnostics.
```

Именно такой порядок используется в repository getting-started example.

## Ownership контента

Political World проверяет, что content ID принадлежит namespace зарегистрированного addon.

Примеры:

```text
YourName.MyAddon.technocracy
YourName.MyAddon:event_palace_crisis
YourName.MyAddon_action_example
```

В проверенном validation после addon ID принимаются ownership separators:

```text
.
:
_
```

У конкретного content type могут быть дополнительные правила.

## Зачем ownership

Без ownership check addon A мог бы зарегистрировать:

```text
OtherAddon.some_content
```

Получаем collisions, сломанные migrations и непонятные diagnostics.

Public registry должен уметь ответить:

```text
Кто владеет этим content ID?
```

## Registration видна в diagnostics

Успешный `RegisterAddon` создаёт diagnostics state и записывает:

```text
PWDIAG001
```

То есть registration становится наблюдаемой support tooling.

## Получение зарегистрированных addons

API предоставляет:

```csharp
PoliticalWorldAPI.IsAddonRegistered(addonId)
PoliticalWorldAPI.GetAddon(addonId)
PoliticalWorldAPI.GetRegisteredAddons()
```

Публичные методы возвращают копии DTO, а не дают напрямую mutable internal registry entry.

## Stable ID — это compatibility data

Addon ID нельзя считать просто красивым названием.

Он может стать частью:

- content IDs;
- localization keys;
- addon-private kingdom data namespaces;
- tags;
- diagnostics;
- save-compatible references.

Позднее переименование может потребовать migration.

## Общий вывод

Addon framework должен сначала установить identity, а уже потом принимать контент.

Identity даёт устойчивую единицу для:

- ownership;
- diagnostics;
- collision prevention;
- правил;
- migrations;
- capabilities;
- support reports.
