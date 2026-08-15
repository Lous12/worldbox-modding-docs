---
title: Addon-private данные через PoliticalWorldAPI
description: Проверенный по исходнику reference для collision-safe int, string, bool и float state, принадлежащего addon.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🧪 Полный save/load round trip ещё требует отдельного runtime probe</span>
<span class="doc-status">API source generation 1.9.0</span>

Political World предоставляет addon-owned state, связанный с `Kingdom`.

Public API поддерживает:

```csharp
GetKingdomInt(...)
SetKingdomInt(...)

GetKingdomString(...)
SetKingdomString(...)

GetKingdomBool(...)
SetKingdomBool(...)

GetKingdomFloat(...)
SetKingdomFloat(...)
```

Storage namespaced через:

```text
addon ID + local key
```

Поэтому addon может использовать короткие local keys:

```text
mana
dynasty
enabled
tax_rate
```

и не собирать настоящий WorldBox save key вручную.

## Integer

```csharp
int mana = PoliticalWorldAPI.GetKingdomInt(
    kingdom,
    AddonId,
    "mana",
    0
);

PoliticalWorldAPI.SetKingdomInt(
    kingdom,
    AddonId,
    "mana",
    mana + 1
);
```

Внутри Political World запись проходит через общий `Kingdom.data` integer helper.

## String

```csharp
string dynasty = PoliticalWorldAPI.GetKingdomString(
    kingdom,
    AddonId,
    "dynasty",
    ""
);

PoliticalWorldAPI.SetKingdomString(
    kingdom,
    AddonId,
    "dynasty",
    "Draconis"
);
```

## Bool encoding

В проверенном public API bool хранится через integer:

```text
false → 0
true  → 1
```

Концептуально:

```csharp
int encoded = GetKingdomInt(..., fallback ? 1 : 0);
return encoded != 0;
```

и:

```csharp
SetKingdomInt(..., value ? 1 : 0);
```

## Float encoding

Float проходит через addon-private string storage.

Source парсит:

```csharp
NumberStyles.Float
CultureInfo.InvariantCulture
```

и пишет:

```csharp
value.ToString("R", CultureInfo.InvariantCulture)
```

Так результат не зависит от locale:

```text
1.5
```

против:

```text
1,5
```

и сохраняет round-trip representation.

## Writes требуют зарегистрированный addon

Public setter проверяет `IsAddonRegistered(addonId)`.

Private-tag API тоже требует registered addon.

Raw integer/string getter в проверенном implementation технически более permissive, но поддерживаемый lifecycle остаётся:

```text
IsCompatible
→ RegisterAddon
→ read/write addon state
```

Не стройте addon, зависящий от чтения private state до `RegisterAddon`.

## Collision-safe v2 key

Internal v2 key:

```text
pw_api2_data_
+ HEX(UTF8(addonId))
+ "_"
+ HEX(UTF8(localKey))
```

Комментарий source прямо объясняет причину: punctuation не должен схлопывать разные IDs в один normalized token.

Например:

```text
author.my-addon
author.my_addon
```

должны оставаться разными identities.

Addon **не должен собирать этот key вручную**. Мы документируем implementation ради понимания compatibility design, а не как public contract.

## Legacy migration

При чтении integer/string internal bridge:

1. ищет v2 key;
2. если его нет — строит старый API 1.1 key;
3. читает legacy value;
4. если находит — копирует в v2 namespace;
5. возвращает value;
6. старый key не удаляет.

Это lazy read-migration.

См. [Миграция collision-prone storage без уничтожения старых данных](../../case-studies/political-world-addon-data-v2-migration/).

## Что подтверждено

✅ Source verified:

- API surface существует;
- int/string используют addon-private kingdom storage;
- bool кодируется как int;
- float кодируется invariant round-trip string;
- v2 key использует UTF-8 hex;
- legacy read умеет copy-forward;
- setter требует registered addon.

## Что ещё нужно проверить

🧪 Нужен отдельный runtime test:

```text
write
→ save world
→ leave/restart
→ load
→ read
```

для каждого supported type на текущем WorldBox/NML.

Source явно показывает persistence intent, но intent не заменяет runtime evidence.
