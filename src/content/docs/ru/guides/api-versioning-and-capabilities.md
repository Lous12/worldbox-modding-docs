---
title: Версионирование API и capability checks
description: Как разделять breaking API versions, minimum compatibility и optional feature discovery.
---

<span class="doc-status">✅ Source + repository policy verified</span>
<span class="doc-status">⚠️ Version drift documented</span>

Political World версионирует **core mod** и **Public API** независимо.

Для addon ecosystem это принципиально.

## Version policy

`API_VERSIONING.md` задаёт политику API 1.x:

```text
major → breaking public contract
minor → backward-compatible public additions
patch → fixes без намеренного breaking documented public contract
```

Но "current candidate" в этом файле устарел относительно проверенного source. Поэтому используем его как **policy**, а не как источник текущего номера API.

В проверенном исходнике:

```csharp
ApiMajor = 1
ApiMinor = 9
ApiVersion = "1.9.0"
```

## Запрашивайте минимально нужный API

Метод:

```csharp
PoliticalWorldAPI.IsCompatible(requiredMajor, requiredMinor)
```

Проверенная логика:

```text
required major должен совпасть с current major
current minor должен быть >= required minor
```

Поэтому addon, использующий только API 1.6 features, правильно пишет:

```csharp
if (!PoliticalWorldAPI.IsCompatible(1, 6))
    return;
```

даже если установлен API 1.9.

Аргумент — **minimum requirement**, а не номер установленного API.

## Не требуйте latest без причины

Если addon реально использует только контракт 1.6:

```csharp
IsCompatible(1, 9)
```

искусственно отрежет пользователей API 1.6–1.8.

Выбирайте первый minor, в котором появился необходимый public contract.

## Optional features: capabilities

Для optional/newer functionality лучше:

```csharp
PoliticalWorldAPI.HasCapability("political-event.rare")
```

а не только сравнение version numbers.

Есть также:

```csharp
PoliticalWorldAPI.GetCapabilities()
```

## Зачем capabilities

Version отвечает:

> «Какое поколение API?»

Capability:

> «Умеет ли этот runtime именно то, что мне нужно?»

Для addon code второй вопрос часто важнее.

Например:

```csharp
if (PoliticalWorldAPI.HasCapability("event.subscribe"))
{
    // включаем event-driven integration
}
else
{
    // отключаем только optional feature
}
```

## Стоимость lookup

В проверенном source capability check использует лениво создаваемый `HashSet<string>` с ordinal comparison.

Повторный `HasCapability(...)` — практически O(1), а не постоянный scan массива.

## Подтверждённые source capabilities

В source есть, среди прочего:

```text
addon.registry
action.registry
ideology.read
ideology.register
government.read
government.register
kingdom.read
kingdom.write
kingdom.addon-data
kingdom.addon-data.typed
localization.safe
localization.fallback
localization.register
content.batch-register
party.read
party.write
event.publish
event.subscribe
event.core-hooks
political-event.rare
diagnostics
validation
```

Если важна exact availability — вызывайте `GetCapabilities()` в runtime.

## Deprecation policy

Repository policy рекомендует перед удалением public 1.x member:

```text
1. добавить replacement
2. отметить/document old member как deprecated
3. по возможности оставить migration window
4. удалить только в следующем breaking major API,
   если нет серьёзной correctness/safety причины
```

Так framework развивается без требования обновить все addons в один день.

## Internals не покрыты контрактом

Compatibility guarantee относится к Public API.

Он не обещает стабильность:

```text
Main
ScenarioBridge
private methods
internal classes
folder layout
```

Addon, который зависит от internals, сам выходит за пределы public versioning contract.

## Общее правило

Два инструмента для двух задач:

```text
IsCompatible → minimum contract
HasCapability → optional feature
```

Не заменяйте один другим.
