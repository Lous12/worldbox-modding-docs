---
title: Typed addon state без выдумывания новых save types
description: Как bool и float helpers строятся поверх проверенного int/string kingdom storage.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🧱 API layering pattern</span>

Public API может дать typed convenience, не требуя от underlying game save container отдельного native representation для каждого C# type.

Political World показывает это на bool и float.

## Bool поверх int

Public contract:

```csharp
GetKingdomBool(...)
SetKingdomBool(...)
```

Implementation:

```text
false = 0
true  = 1
```

Используется уже существующий collision-safe integer data path.

## Float поверх string

Public contract:

```csharp
GetKingdomFloat(...)
SetKingdomFloat(...)
```

Implementation:

```text
float
→ invariant round-trip text
→ addon-private string storage
```

Read:

```csharp
float.TryParse(
    value,
    NumberStyles.Float,
    CultureInfo.InvariantCulture,
    out parsed
)
```

Write:

```csharp
value.ToString("R", CultureInfo.InvariantCulture)
```

## Зачем InvariantCulture

Без explicit culture float может сериализоваться по-разному в зависимости от locale:

```text
1.25
1,25
```

Save format не должен менять синтаксис только потому, что пользователь переключил language.

## Зачем "R"

Round-trip format нужен, чтобы parsed value можно было восстановить без лишней потери precision.

## Typed facade и underlying representation

Addon видит:

```csharp
bool enabled
float taxRate
```

Persistence layer:

```text
int
string
```

Это хорошее разделение.

Internal representation потом можно изменить, сохранив typed public contract.

## Не обходите typed helper

Если написать:

```csharp
SetKingdomString(..., "tax_rate", someFloat.ToString())
```

format/culture уже становятся вашей проблемой.

Если framework даёт:

```csharp
SetKingdomFloat(...)
```

лучше использовать его.

## Общий вывод

Stable public API должен предоставлять **semantic types**, даже если storage построен на меньшем наборе primitive representations.
