---
title: Political World — migrating addon data from sanitized keys to UTF-8 hex
description: A real lazy migration from collision-prone API 1.1 keys to collision-safe v2 namespaced storage.
---

<span class="doc-status">✅ Source verified migration</span>
<span class="doc-status">💾 Compatibility case study</span>

Political World's addon storage contains a concrete example of why apparently harmless string sanitization can become a persistence bug.

## Legacy key family

The inspected bridge still defines:

```text
ukiol_api_data_
```

as the legacy API 1.1 addon-data prefix.

Legacy IDs were passed through a sanitizer before being concatenated into a key.

The problem with replacement-style sanitization is that different original strings can potentially map to the same sanitized representation.

## v2 design

API 1.2+ introduced:

```text
pw_api2_data_
```

and constructs a key from UTF-8 bytes encoded as hexadecimal.

Conceptually:

```text
pw_api2_data_
+ HEX(UTF8(addonId))
+ "_"
+ HEX(UTF8(localKey))
```

The source comment explicitly gives the intended distinction:

```text
author.my-addon
author.my_addon
```

should remain separate.

## Why hex

Hex encoding produces save-key components using only:

```text
0-9 A-F
```

while preserving the exact UTF-8 byte identity of the input.

It is not compact, but it is deterministic and collision-safe with respect to the encoded input bytes.

## Lazy migration

The getter path implements a copy-forward migration:

```text
read v2
│
├─ found → return
│
└─ missing
    ↓
read legacy
│
├─ missing → fallback
│
└─ found
    ↓
write same value to v2
    ↓
return value
```

The old key is deliberately **left untouched**.

## Why not delete legacy immediately

Keeping old data during lazy migration provides safer behavior for:

- rollback to an older build;
- worlds opened by mixed development versions;
- debugging;
- incomplete migration coverage.

Cleanup can happen later, after a migration window, if it is ever needed.

## Migration is performed on read

This design avoids scanning every kingdom and every possible addon key at startup.

Only data that is actually read is migrated.

Tradeoff:

```text
unused old keys may remain indefinitely
```

but there is no expensive global migration pass.

## General lesson

Never build a persistent key namespace by casually replacing punctuation unless you have proven the transformation is injective for your allowed identifiers.

If old data already exists:

```text
introduce new encoding
→ read new first
→ fallback to old
→ copy forward
→ keep old during migration window
```

is a robust compatibility pattern.
