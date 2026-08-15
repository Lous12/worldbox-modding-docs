---
title: PoliticalWorldAPI addon-private kingdom data
description: Source-backed reference for collision-safe int, string, bool and float state owned by an addon.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">✅ Runtime persistence verified for kingdom int/string/bool/float</span>
<span class="doc-status">API source generation 1.9.0</span>

Political World exposes addon-owned state associated with a `Kingdom`.

The public API supports:

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

The storage is namespaced by:

```text
addon ID + local key
```

so an addon can use a short local key such as:

```text
mana
dynasty
enabled
tax_rate
```

without directly constructing the underlying WorldBox save key.

## Integer example

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

The underlying Political World bridge writes through its shared `Kingdom.data` integer helper.

## String example

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

The inspected public API implements bool state through integer storage:

```text
false → 0
true  → 1
```

Conceptually:

```csharp
int encoded = GetKingdomInt(..., fallback ? 1 : 0);
return encoded != 0;
```

and:

```csharp
SetKingdomInt(..., value ? 1 : 0);
```

## Float encoding

Float values are stored through the addon-private string path.

The inspected source parses with:

```csharp
NumberStyles.Float
CultureInfo.InvariantCulture
```

and writes using:

```csharp
value.ToString("R", CultureInfo.InvariantCulture)
```

This avoids locale-dependent decimal formatting such as:

```text
1.5
```

versus:

```text
1,5
```

and uses round-trip formatting.

## Writes require a registered addon

The public setter path checks `IsAddonRegistered(addonId)` before writing.

Private-tag APIs also require a registered addon.

The raw integer/string getter wrappers are more permissive in the inspected implementation, but addon code should still follow the supported lifecycle:

```text
IsCompatible
→ RegisterAddon
→ read/write addon state
```

Do not build code that relies on reading private data before registering the addon.

## Collision-safe v2 key

The internal v2 key uses:

```text
pw_api2_data_
+ HEX(UTF8(addonId))
+ "_"
+ HEX(UTF8(localKey))
```

The source comment explicitly explains the reason: punctuation should remain distinguishable instead of being normalized into the same token.

Example concept:

```text
author.my-addon
author.my_addon
```

must remain different identities.

Addons should **not construct this key themselves**. It is documented to explain the compatibility design, not as a public API.

## Legacy migration

When reading integer/string addon data, the internal bridge:

1. tries the v2 key;
2. if missing, calculates the old API 1.1 key;
3. reads the legacy value;
4. if found, copies it into the v2 namespace;
5. returns the value;
6. leaves the old key untouched.

That is a lazy read-migration.

See [Migrating collision-prone storage without destroying old data](../../case-studies/political-world-addon-data-v2-migration/).

## What is verified here

✅ Verified from source:

- API surface exists;
- int/string route through addon-private kingdom storage;
- bool is encoded as int;
- float is encoded as invariant round-trip string;
- v2 key uses UTF-8 hex encoding;
- legacy reads can copy forward into v2;
- setters require registered addon.

## Runtime persistence result — WBML-0001

WorldBox Modding Lab 0.0.1 executed a real full-process persistence test.

Verified environment:

```text
WorldBox:          0.51.2
build:             719
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
probe:             WBML 0.0.1
```

The probe wrote through the **public PoliticalWorldAPI**, saved the world, fully closed WorldBox, started a new process, loaded the same save, and read the values without writing them again.

Result:

```text
int ............ PASS
Unicode string . PASS
bool ........... PASS
float .......... PASS
private tag .... PASS
shared tag ..... PASS

POST-LOAD RESULT: 6/6 PASS
```

The tested Unicode string was:

```text
PW_SAVE_PROBE_Ж_ß_世界
```

and survived unchanged.

The float also returned the same numeric value after restart.

See [WBML-0001 — addon data survives a full restart](../../case-studies/wbml-0001-addon-data-persistence/).

## What is still not proven by WBML-0001

This result does **not** yet verify:

- party-private addon data;
- world-to-world isolation;
- language-switch round trips;
- legacy API 1.1 → v2 migration at runtime;
- every future WorldBox/NML/Political World version.

Those remain separate experiments.

Also, WBML-0001 proves that the values return with the same save after a process restart. It does not by itself prove which exact physical file/database inside the save system stores each value.
