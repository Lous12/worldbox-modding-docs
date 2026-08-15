---
title: PoliticalWorldAPI как публичная граница
description: Зачем Political World отделяет Public API от Main, ScenarioBridge и reflection во внутренности.
---

<span class="doc-status">✅ Source verified architecture</span>
<span class="doc-status">🧩 Framework design</span>

Репозиторий Political World чётко разделяет:

```text
public addon API
```

и:

```text
internal implementation
```

Поддерживаемый facade:

```csharp
Lous12.PoliticalWorld.PoliticalWorldAPI
```

## Внутренний код может использовать внутренние bridges

Внутри core сам `PoliticalWorldAPI` делегирует многие операции внутренним системам вроде `Main.ScenarioBridge`.

Это нормально.

Правильное направление:

```text
third-party addon
    ↓
PoliticalWorldAPI
    ↓
internal Political World implementation
```

а не:

```text
third-party addon
    ↓
Main.ScenarioBridge
```

## Зачем нужен facade

Внутренний код можно реорганизовывать.

Стабильный facade способен сохранить:

- method names;
- validation;
- capability checks;
- ownership rules;
- diagnostics;
- compatibility guarantees;

даже если реализация внутри сильно изменилась.

Если каждый addon reflection'ом лезет во внутренние классы, любой refactor становится ecosystem-breaking API change.

## Сначала RegisterAddon

API проверяет identity addon до subscriptions и owned-content registration.

`RegisterAddon(...)` валидирует:

- непустой ID;
- допустимые символы;
- length и start/end rules;
- reserved core ID;
- duplicate;
- addon name.

Отсутствие namespace separator в проверенном source — warning, а не hard error.

## Ownership контента

Registration ideology/action/event проверяет, что content ID принадлежит namespace addon.

В проверенном source ownership separators включают:

```text
.
:
_
```

после addon ID.

Главная цель — не позволять одному addon регистрировать контент под identity другого.

## Capabilities вместо угадывания

API предоставляет:

```csharp
GetCapabilities()
HasCapability(...)
IsCompatible(requiredMajor, requiredMinor)
```

Проверенный source объявляет capabilities для:

- addon registry;
- ideology/government/action registration;
- kingdom read/write и addon-private data;
- localization;
- party operations;
- event publish/subscribe;
- rare events;
- diagnostics;
- validation.

Если addon нужен optional/newer feature, лучше проверить capability, чем предположить, что любой API 1.x его имеет.

## Если facade чего-то не умеет

Архитектура репозитория задаёт правило:

> Добавить безопасную capability в Public API, а не учить consumers обходить API.

Даже если first-party addon вынужден лезть во внутренности, это сигнал, что public facade, возможно, неполон.

## Общий вывод

Если вы хотите addon ecosystem, boundary стоит определить заранее.

Public API — не просто набор helpers.

Это compatibility contract между:

```text
вашими изменяемыми internals
```

и:

```text
чужим кодом, который вы не контролируете
```
