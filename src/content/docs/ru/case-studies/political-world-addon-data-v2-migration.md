---
title: Political World — migration addon data с sanitized keys на UTF-8 hex
description: Реальная lazy migration от collision-prone API 1.1 keys к collision-safe v2 namespaced storage.
---

<span class="doc-status">✅ Source verified migration</span>
<span class="doc-status">💾 Compatibility case study</span>

Addon storage Political World показывает, почему безобидная sanitization string может стать persistence bug.

## Legacy key family

В bridge до сих пор определён prefix API 1.1:

```text
ukiol_api_data_
```

Legacy IDs проходили через sanitizer перед concatenation в save key.

Проблема replacement-style sanitization: разные исходные strings потенциально могут стать одинаковым sanitized representation.

## v2 design

API 1.2+ добавил:

```text
pw_api2_data_
```

и строит key из UTF-8 bytes, записанных hexadecimal.

Концептуально:

```text
pw_api2_data_
+ HEX(UTF8(addonId))
+ "_"
+ HEX(UTF8(localKey))
```

Комментарий source прямо подчёркивает:

```text
author.my-addon
author.my_addon
```

должны остаться разными.

## Почему hex

Hex даёт save-key components только из:

```text
0-9 A-F
```

и сохраняет точную identity UTF-8 bytes input.

Это не самый компактный format, но deterministic и collision-safe относительно закодированного input.

## Lazy migration

Getter делает copy-forward:

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

Old key **не удаляется**.

## Почему legacy не удаляется сразу

Старые данные полезны для:

- rollback на older build;
- mixed development versions;
- debugging;
- неполного migration coverage.

Cleanup можно делать позже после migration window, если он вообще нужен.

## Migration происходит при read

Не требуется startup scan всех kingdoms и всех возможных addon keys.

Мигрируется только реально используемая data.

Tradeoff:

```text
неиспользуемые legacy keys могут остаться навсегда
```

зато нет дорогого global migration pass.

## Общий вывод

Нельзя строить persistent key namespace случайной заменой punctuation, если transformation не доказана injective для allowed IDs.

Если legacy data уже существует, хороший pattern:

```text
new encoding
→ read new first
→ fallback old
→ copy forward
→ keep old during migration window
```
