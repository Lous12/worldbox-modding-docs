---
title: Typed addon state without inventing new save types
description: How bool and float helpers are layered over proven int/string kingdom storage.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🧱 API layering pattern</span>

A public API can provide typed convenience without requiring the underlying game save container to expose a dedicated representation for every language type.

Political World demonstrates this with bool and float addon state.

## Bool on top of int

Public contract:

```csharp
GetKingdomBool(...)
SetKingdomBool(...)
```

Implementation model:

```text
false = 0
true  = 1
```

This reuses the existing collision-safe integer data path.

## Float on top of string

Public contract:

```csharp
GetKingdomFloat(...)
SetKingdomFloat(...)
```

Implementation model:

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

## Why invariant culture matters

Without explicit culture, a float may serialize differently depending on machine/game locale.

For example:

```text
1.25
1,25
```

A save format should not silently change syntax because the user switched language.

## Why "R" matters

The round-trip format is intended to serialize a floating-point value so it can be parsed back without avoidable precision loss.

## Typed facade vs underlying representation

Addon code sees:

```csharp
bool enabled
float taxRate
```

The persistence layer sees:

```text
int
string
```

That separation is healthy.

The public API can later change its internal representation while preserving the typed public contract.

## Do not bypass the typed helper

If you write:

```csharp
SetKingdomString(..., "tax_rate", someFloat.ToString())
```

you have now made culture/format decisions yourself.

Prefer:

```csharp
SetKingdomFloat(...)
```

when the framework exposes it.

## General lesson

A stable public API should expose **semantic types** even when storage is built from a smaller set of primitive representations.
