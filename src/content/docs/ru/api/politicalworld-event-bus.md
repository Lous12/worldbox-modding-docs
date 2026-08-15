---
title: PoliticalWorldAPI Event Bus
description: Проверенный по исходнику справочник по подпискам Political World и защите callbacks.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">Political World GitHub snapshot ce0c917</span>
<span class="doc-status">API source generation 1.9.0</span>

Political World предоставляет event-driven интерфейс через:

```csharp
Lous12.PoliticalWorld.PoliticalWorldAPI
```

Event Bus нужен, чтобы аддон реагировал на политические изменения без собственного постоянного world scan.

## Публичный интерфейс подписок

Основные методы:

```csharp
PoliticalWorldAPI.GetEventIds()
PoliticalWorldAPI.Subscribe(addonId, eventId, handler)
PoliticalWorldAPI.Unsubscribe(addonId, eventId, handler)
PoliticalWorldAPI.UnsubscribeAll(addonId)
```

Перед подпиской аддон должен быть зарегистрирован через `RegisterAddon(...)`.

Wildcard:

```csharp
PoliticalWorldAPI.Events.All
```

Используйте его только когда действительно нужны все события.

## Event IDs, подтверждённые исходником

В проверенном исходнике есть такие семейства:

```text
kingdom.ideology.changed
kingdom.current.changed
kingdom.government.changed

party.created
party.activated
party.deactivated
party.renamed
party.ideology.changed
party.leader.changed
party.radicalism.changed
party.support.changed

kingdom.ruling-party.changed
kingdom.ruler.changed
kingdom.election.finished

kingdom.crisis.started
kingdom.crisis.ended
kingdom.leadership-crisis.started
kingdom.leadership-crisis.resolved

kingdom.rare-political-event.fired
political.event.published
```

В compatibility-sensitive коде лучше вызывать `GetEventIds()`, а не хранить собственную копию списка.

## Payload события

`PoliticalEventData` может содержать:

- event ID;
- ссылку на `Kingdom` и его display name;
- old/new string;
- old/new integer;
- party ID;
- ссылку на actor, identity и name;
- old/new name;
- source addon ID;
- category;
- year;
- text и event key.

Не каждое событие заполняет все поля.

Неиспользуемые поля считайте optional.

## Проверка подписки

Исходник отклоняет подписку, если:

- addon не зарегистрирован;
- handler равен null;
- event ID неизвестен и это не wildcard;
- точно такая же пара addon + handler уже подписана на событие.

Unknown event ID и duplicate subscription попадают в diagnostics.

## Изоляция callbacks

Каждый callback вызывается внутри отдельного `try/catch`.

Если addon A падает:

```text
addon A callback → exception
```

Political World записывает callback error и продолжает dispatch остальным subscribers.

Ошибка одного аддона не должна лишить другой аддон того же события.

## Snapshot перед dispatch

Перед обходом subscribers Event Bus создаёт копию текущего списка.

Callback может подписаться или отписаться прямо во время события.

Snapshot не даёт такой мутации сломать активный цикл обхода.

## Clone payload

Каждый callback получает новый объект `PoliticalEventData`.

Ссылки на `Kingdom`/`Actor` остаются ссылками на те же WorldBox objects, но scalar/string поля копируются в отдельный payload.

Один subscriber не может поменять сам payload-object, который затем увидит другой subscriber.

Но это **не** делает `Kingdom` или `Actor` immutable.

## Защита от рекурсивного dispatch

Event Bus считает глубину вложенных событий.

В проверенном исходнике limit:

```text
16
```

Если callback создаёт событие, которое создаёт событие, и так далее сверх limit, dispatch останавливается и пишет ошибку в лог.

## Быстрый выход без subscribers

Перед созданием полного payload core проверяет, подписан ли кто-нибудь:

- на конкретное событие;
- или на wildcard.

Если слушателей нет, работа прекращается раньше.

## Минимальный пример

```csharp
using NeoModLoader.api;
using Lous12.PoliticalWorld;

public class Main : BasicMod<Main>
{
    private const string AddonId = "Example.EventAddon";

    protected override void OnModLoad()
    {
        if (!PoliticalWorldAPI.IsCompatible(1, 6))
            return;

        if (!PoliticalWorldAPI.RegisterAddon(
            new PoliticalWorldAPI.AddonDefinition
            {
                Id = AddonId,
                Name = "Event Addon",
                Version = "1.0.0",
                Author = "Example"
            }))
            return;

        PoliticalWorldAPI.Subscribe(
            AddonId,
            PoliticalWorldAPI.Events.GovernmentChanged,
            OnGovernmentChanged
        );
    }

    private static void OnGovernmentChanged(
        PoliticalWorldAPI.PoliticalEventData data)
    {
        if (data == null)
            return;

        // Реагируем только на переход.
    }
}
```

`IsCompatible(1, 6)` здесь повторяет текущий repository example и является **minimum compatibility requirement**, а не номером текущего source API.

См. [Источник истины и расхождение версий](../ai/source-of-truth-and-version-drift/).

## Общий вывод

Хороший Event Bus — это не просто список delegates.

Публичный bus должен иметь:

1. стабильные event IDs;
2. ownership/registration rules;
3. callback isolation;
4. mutation-safe dispatch;
5. recursion protection;
6. diagnostics;
7. способ узнать поддерживаемые события.
