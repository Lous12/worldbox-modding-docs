---
title: Minimum API и capability rules для ИИ
description: Как ИИ выбирать compatibility requirement, не путая minimum version, current version и optional capabilities.
---

<span class="doc-status">🤖 AI-critical</span>
<span class="doc-status">✅ Source-backed</span>

AI-generated addon code часто делает одну из двух противоположных ошибок:

```text
требует API новее, чем реально нужно
```

или:

```text
использует новую feature, но проверяет слишком старый minimum
```

Compatibility model Political World позволяет избегать обоих случаев.

## Rule 1 — сначала определить используемые public members

Не начинайте с копирования current API version.

Сначала выпишите, что addon реально использует.

Например:

```text
RegisterAddon
Subscribe
GetDiagnosticsReport
```

Потом найдите самый старый documented API minor, где доступен весь этот набор.

Он и становится minimum для `IsCompatible(...)`.

## Rule 2 — current version ≠ minimum version

Обе строки могут быть правдой:

```text
Installed/source API: 1.9
Addon requires: API 1.6+
```

Не надо автоматически «исправлять»:

```csharp
IsCompatible(1, 6)
```

на:

```csharp
IsCompatible(1, 9)
```

только потому, что source constant сейчас 1.9.0.

## Rule 3 — optional feature → capability

Если feature не обязательна для всего addon:

```csharp
if (PoliticalWorldAPI.HasCapability("political-event.rare"))
{
    // включаем optional integration
}
```

Не заставляйте весь addon отказываться от загрузки из-за одной optional feature.

## Rule 4 — capability names тоже нельзя выдумывать

Не создавать:

```text
government.super-advanced-api
```

только потому, что звучит правдоподобно.

Используйте:

```csharp
PoliticalWorldAPI.GetCapabilities()
```

или verified documentation/source.

## Rule 5 — stale docs являются evidence, но не абсолютной authority

В проверенном snapshot:

```text
source API constant → 1.9.0
часть AI/versioning docs → 1.6.0
```

Нужно выяснить роль `1.6`:

- устаревшее утверждение "current version";
- или всё ещё валидный minimum compatibility example.

Это разные смыслы.

## Rule 6 — не таргетить union snapshots

Если один runtime log показывает API 1.14, а старый source snapshot содержит 1.9, нельзя генерировать code из объединения всех когда-либо увиденных methods без знания installed target пользователя.

## Рекомендуемый pattern

```csharp
if (!PoliticalWorldAPI.IsCompatible(REQUIRED_MAJOR, REQUIRED_MINOR))
{
    // понятный log и отказ addon
    return;
}

if (!PoliticalWorldAPI.RegisterAddon(...))
{
    return;
}

if (PoliticalWorldAPI.HasCapability("optional.feature"))
{
    // включаем только optional integration
}
```

## Если неизвестно, в каком minor появился member

Лучший ответ:

```text
Member подтверждён в проверенном API 1.9 source,
но текущие evidence не устанавливают точный minor, в котором он был добавлен.
Нельзя понижать minimum requirement без проверки version history.
```

Это лучше догадки.
