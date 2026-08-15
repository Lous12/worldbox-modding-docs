---
title: Правила Public API boundary для ИИ
description: Как coding assistant должен работать с родительским модом, у которого есть поддерживаемый addon API.
---

<span class="doc-status">🤖 AI-critical</span>
<span class="doc-status">✅ Political World source-backed</span>

Если мод предоставляет документированный public addon facade, ИИ должен считать его архитектурной границей, пока пользователь явно не попросил менять сам parent mod.

Для Political World:

```csharp
Lous12.PoliticalWorld.PoliticalWorldAPI
```

## Если создаётся third-party addon

Использовать:

```text
RegisterAddon
IsCompatible
HasCapability
public Event Bus
public registries
public data helpers
public diagnostics
```

Не лезть сразу в:

```text
Main
Main.ScenarioBridge
private partial methods
reflection into Political World internals
Harmony patches against Political World implementation
```

только потому, что internal source виден на GitHub.

Visible source ≠ supported API.

## Почему ИИ особенно легко ошибается здесь

Coding models хорошо находят метод, который прямо сейчас решает задачу.

Если доступны:

```text
PoliticalWorldAPI.SetKingdomGovernment(...)
Main.ScenarioBridge.SetKingdomGovernment(...)
```

internal method может выглядеть короче или иметь больше параметров.

Это не делает его правильной dependency для addon.

## Алгоритм

Перед генерацией addon code:

```text
1. Найти поддерживаемый public namespace/facade parent mod.
2. Проверить API compatibility.
3. Проверить capability для optional/newer feature.
4. Искать решение в public API/reference/examples.
5. Если операции нет — явно назвать missing capability.
6. Предложить API extension request.
7. Не обходить boundary молча.
```

## Исключение — меняем сам parent mod

Если задача:

> «Измени core Political World».

тогда internal modules — правильное место.

Один и тот же метод может быть:

```text
wrong dependency для addon
correct implementation detail для parent mod
```

Контекст важен.

## Не смешивать версии

Political World также показывает version drift.

Перед использованием метода нужно понять, где именно он существует:

- installed runtime пользователя;
- exact source snapshot;
- старый API reference;
- новый development build.

Нельзя генерировать code против union всех когда-либо увиденных версий.

## Лучший failure mode

Если Public API не умеет нужную функцию, лучший ответ:

```text
Текущий проверенный Public API не предоставляет эту операцию.
Нужно добавить такую-то capability.
```

Это лучше brittle reflection-кода, который работает сегодня и ломается после следующего refactor parent mod.
