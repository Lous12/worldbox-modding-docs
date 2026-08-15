---
title: Political World — защита публичного Event Bus
description: Как Political World не даёт одному addon callback легко сломать dispatch для всех остальных.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🧯 Failure containment</span>

Наивный Event Bus можно написать в несколько строк:

```csharp
foreach (var callback in subscribers)
    callback(data);
```

Для личного проекта этого иногда достаточно.

Для публичного addon framework появляются неприятные failure modes.

Event Bus Political World защищается как минимум от четырёх.

## Failure 1 — один callback бросает exception

Наивный результат:

```text
subscriber A throws
→ dispatch stops
→ B и C не запускаются
→ exception уходит в core
```

Political World вызывает каждый subscriber отдельно внутри `try/catch`.

Ошибка записывается в diagnostics конкретного addon, а dispatch продолжается.

## Failure 2 — callback меняет subscriptions

Наивно:

```text
foreach live List
→ callback делает unsubscribe
→ collection меняется во время iteration
```

Political World перед dispatch создаёт snapshot списка.

Изменения влияют на будущие события, а не ломают текущий loop.

## Failure 3 — subscriber меняет общий payload

Если всем выдать один mutable object:

```text
A меняет data.NewValue
→ B получает уже изменённый payload
```

Political World клонирует `PoliticalEventData` для каждого callback.

Ограничение: вложенные ссылки `Kingdom` и `Actor` всё ещё указывают на реальные live WorldBox objects.

## Failure 4 — callback создаёт event recursion loop

Например:

```text
government changed event
→ addon пишет новое government
→ government changed event
→ addon опять пишет government
→ ...
```

Political World отслеживает nested dispatch depth и останавливает dispatch после depth 16.

Само число — implementation detail проверенного snapshot. Важен паттерн защиты.

## Ещё одна защита — known event IDs

Addon не может молча подписаться на случайный typo ID.

Unknown ID отклоняется, а diagnostics получает error.

## Что это НЕ решает

Event framework не может автоматически сделать любой addon code безопасным.

Callback всё ещё может:

- выполнять очень дорогую работу;
- мутировать live game objects;
- создавать логические loops ниже limit;
- слишком долго хранить references;
- делать несвязанные с событием side effects.

Event Bus — failure containment, а не sandbox.

## Вывод для документации

Недостаточно написать:

> «Вызовите Subscribe».

Нужно описывать:

- поведение при callback failure;
- mutation behavior;
- assumptions об ordering;
- recursion limits;
- ownership/registration rules;
- lifetime и mutability payload.

От этого зависит, смогут ли несколько community addons нормально жить вместе.
