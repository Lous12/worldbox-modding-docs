---
title: Модель развития Political World API
description: Проверенные заметки о разделении core version, public contract, capabilities и deprecation.
---

<span class="doc-status">✅ Source + repository policy verified</span>
<span class="doc-status">📈 Framework evolution</span>

Political World использует важное различие, которое маленькие моды часто откладывают:

```text
mod version ≠ public API version
```

Проверенный package metadata показывает core 1.7.0, а проверенный API source объявляет 1.9.0.

Отдельно наблюдался более новый development runtime с API 1.14.0.

Это разные evidence scopes, их нельзя склеивать.

## Четыре уровня evolution

Framework должен различать:

### 1. Core version

Релиз продукта/мода.

```text
Political World 1.7.0
```

### 2. Public API contract

Версионируемый surface, против которого пишутся addons.

В проверенном source:

```text
PoliticalWorldAPI 1.9.0
```

### 3. Capabilities

Fine-grained discovery runtime features.

Например:

```text
event.subscribe
localization.register
content.batch-register
diagnostics
```

### 4. Internal implementation

Refactorable code без public compatibility promise.

Например:

```text
Main.ScenarioBridge
folder structure
private partial methods
internal registries
```

## Зачем независимые versions

Core может получить gameplay fixes без изменения API contract.

API может получить creator features без большого gameplay release.

Addon запрашивает minimum public contract, а не полное совпадение mod version.

## Capability growth без hard dependency

Новый API minor добавляет:

```text
new optional capability
```

Старые addons продолжают работать, потому что не требуют её.

Новые addons могут сделать:

```csharp
HasCapability(...)
```

и отключить только optional feature.

## Документация должна двигаться вместе с source

Сам repository уже показывает риск: source и README дошли до API 1.9, а несколько AI/versioning entry docs остались на 1.6.

Architecture правильная; consistency pipeline документации нужно усиливать.

## Будущий CI check

WorldBox Modding Docs со временем должен показать проверку:

```text
source ApiVersion
README API badge/text
AI_START_HERE
llms.txt
API_VERSIONING
reference index
```

Mismatch → warning или failed build.

## Deprecation — часть compatibility

Stable API — не API, который никогда не меняется.

Он сообщает consumers:

- что изменилось;
- когда;
- чем заменить old member;
- сколько длится migration window;
- в каком major release member может исчезнуть.

## Общий вывод

Как только чужой мод зависит от вашего кода, versioning становится частью architecture.

Не ждите первого breaking update, чтобы придумать правила.
