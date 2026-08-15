---
title: Persistence и migration rules для ИИ
description: Правила, не позволяющие ИИ выдумывать save guarantees, raw keys, migrations и cross-addon storage conventions.
---

<span class="doc-status">🤖 AI-critical</span>
<span class="doc-status">✅ Political World source-backed</span>

Persistence — область, где правдоподобный AI code способен тихо повредить saves.

Здесь правила должны быть строже обычного runtime helper.

## Rule 1 — сначала public storage API

Для Political World addon использовать:

```text
Get/SetKingdomInt
Get/SetKingdomString
Get/SetKingdomBool
Get/SetKingdomFloat
addon-private tags
party-private typed data
```

Не реконструировать вручную:

```text
pw_api2_data_...
ukiol_api_data_...
__private_tags
```

Эти formats документированы для research/migration understanding, а не как supported addon contract.

## Rule 2 — имя Persistence не доказывает round-trip

Папка:

```text
Persistence
```

или запись в `Kingdom.data` показывают persistence intent.

Но это ещё не фактический:

```text
save → process restart → load
```

runtime test.

Без результата писать:

```text
source-verified storage path; runtime persistence test pending
```

## Rule 3 — stable IDs являются данными

Не переименовывать persistent ID только ради:

- нового author name;
- нового namespace;
- cleaner style;
- rebranding.

Сначала migration consequences.

Political World специально сохраняет `ukiol_*`, хотя public identity — `Lous12.PoliticalWorld`.

## Rule 4 — new и legacy пути могут жить вместе

Если code делает:

```text
v2 key
fallback old v1 key
```

не удалять old path как «лишний» без explicit migration policy.

Backward compatibility code часто выглядит redundant, но является critical.

## Rule 5 — copy-forward перед destructive migration

Безопасный default:

```text
read new
if missing:
    read legacy
    if found:
        write new
        keep legacy
```

Не генерировать delete old data, пока не рассмотрены rollback/compatibility.

## Rule 6 — private by default

Если state нужен одному addon:

```text
addon-private data/tag
```

а не shared.

Shared string convention уже является API между mods и требует документации.

## Rule 7 — typed helpers сохраняют semantics

Использовать:

```text
SetKingdomBool
SetKingdomFloat
```

а не вручную кодировать bool/float.

Framework уже определяет representation и culture behavior.

## Rule 8 — party state по stable party ID

Не привязывать party data к:

```text
list index
display name
current order
```

если есть stable party ID.

## Rule 9 — не выдумывать migration result

Если save/load probe не выполнен, нельзя писать:

```text
"verified to persist"
```

Сохраняйте настоящий status.

## Rule 10 — persistence claim всегда version-bound

Результат должен включать:

```text
WorldBox
NeoModLoader
parent mod/API
probe version
```

Save behavior слишком важен для versionless claims.


## Текущий Verified persistence record

WBML-0001 повысил один claim до runtime Verified:

```text
WorldBox 0.51.2 build 719
NeoModLoader 1.2.0.1
PoliticalWorldAPI 1.14.0
```

После **полного process restart** подтверждены:

```text
kingdom int
kingdom Unicode string
kingdom bool
kingdom float
addon-private kingdom tag
shared kingdom tag
```

Нельзя автоматически распространять этот result на party-private data, cross-world isolation, другие versions или legacy migration без отдельного evidence.
