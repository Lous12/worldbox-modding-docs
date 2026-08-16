---
title: Addon-private данные через PoliticalWorldAPI
description: Проверенный по исходнику reference для collision-safe int, string, bool и float state, принадлежащего addon.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">✅ Runtime persistence подтверждён для kingdom int/string/bool/float</span>
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

См. [Миграция collision-prone storage без уничтожения старых данных](../case-studies/political-world-addon-data-v2-migration/).

## Что подтверждено

✅ Source verified:

- API surface существует;
- int/string используют addon-private kingdom storage;
- bool кодируется как int;
- float кодируется invariant round-trip string;
- v2 key использует UTF-8 hex;
- legacy read умеет copy-forward;
- setter требует registered addon.

## Runtime persistence result — WBML-0001

WorldBox Modding Lab 0.0.1 выполнил настоящий full-process persistence test.

Проверенная среда:

```text
WorldBox:          0.51.2
build:             719
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
probe:             WBML 0.0.1
```

Probe записал значения **через public PoliticalWorldAPI**, сохранил мир, полностью закрыл WorldBox, запустил новый процесс, загрузил тот же save и прочитал значения без повторной записи.

Результат:

```text
int ............ PASS
Unicode string . PASS
bool ........... PASS
float .......... PASS
private tag .... PASS
shared tag ..... PASS

POST-LOAD RESULT: 6/6 PASS
```

Тестовая Unicode-строка:

```text
PW_SAVE_PROBE_Ж_ß_世界
```

пережила restart без изменений.

Float также вернулся с тем же numeric value.

См. [WBML-0001 — addon data переживает полный restart](../case-studies/wbml-0001-addon-data-persistence/).


## Runtime world-isolation result — WBML-0002

WorldBox Modding Lab `0.0.2-fix1` проверил два разных world save с уникальным current-run token.

Проверенная среда:

```text
WorldBox:          0.51.2
build:             719
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
probe:             WBML 0.0.2-fix1
```

Sequence:

```text
A write/save
→ B подтверждает отсутствие A, затем write/save B
→ A подтверждает отсутствие B и возвращает values A
→ B подтверждает отсутствие A и возвращает values B
```

Final gate требовал:

```text
A=PASS B=PASS C=PASS D=PASS
```

и выдал:

```text
FINAL RESULT: WORLD ISOLATION VERIFIED FOR THIS RUN.
```

См. [WBML-0002 — addon state изолирован между world save](../case-studies/wbml-0002-world-isolation/).

## Что текущие Lab results пока НЕ доказывают

Совместный evidence WBML-0001 и WBML-0002 ещё не проверяет:

- party-private addon data;
- round trip после смены языка;
- runtime migration API 1.1 → v2;
- будущие версии WorldBox/NML/Political World.

Это отдельные эксперименты.

Также WBML-0001 доказывает возвращение values вместе с тем же save после process restart, но сам по себе не устанавливает, в каком именно физическом файле/database WorldBox хранит каждый value.
