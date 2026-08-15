---
title: Shared tags и addon-private tags
description: Когда использовать общую cross-mod convention, а когда collision-safe private kingdom tags.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🏷 Data-design pattern</span>

Political World предоставляет два разных типа kingdom tags.

Они нужны для разных задач.

## Shared kingdom tags

Public methods:

```csharp
GetKingdomTags(...)
HasKingdomTag(...)
AddKingdomTag(...)
RemoveKingdomTag(...)
```

Это намеренно **shared/global** tags.

Source сохраняет исторический storage key:

```text
ukiol_api_kingdom_tags
```

ради compatibility.

Shared tag стоит использовать только когда несколько модов **осознанно договорились** об одном meaning.

Например conceptual:

```text
trade_embargoed
```

может стать cross-mod convention, если несколько addons документируют одинаковое значение.

## Addon-private kingdom tags

Public methods:

```csharp
GetAddonKingdomTags(...)
HasAddonKingdomTag(...)
AddAddonKingdomTag(...)
RemoveAddonKingdomTag(...)
```

Они требуют registered addon и живут внутри collision-safe data namespace этого addon.

Внутри проверенного source список хранится под local key:

```text
__private_tags
```

Но final save key всё равно namespaced через addon-data system.

## Формат private tags

Текущий implementation сериализует список через `|`:

```text
tag_a|tag_b|tag_c
```

Private local tag с `|` отклоняется при добавлении.

Это internal serialization detail. Addon должен использовать public methods, а не читать `__private_tags` напрямую.

## Правило выбора

Спросите:

> Должен ли другой независимый mod понимать этот tag?

Если **нет**:

```text
addon-private tag
```

Если **да, намеренно**:

```text
shared tag + документированная cross-mod convention
```

## Примеры

Private:

```text
dragon_dynasty
has_completed_my_quest
internal_reform_stage_2
```

Shared только по договорённости:

```text
sanctioned
neutral_trade_zone
protected_state
```

Это примеры, а не built-in Political World tag IDs.

## Почему private — default

Private storage даёт:

- collision protection;
- clear ownership;
- безопаснее refactor;
- меньше accidental coupling;
- проще cleanup/migrations.

Shared state создаёт dependency даже без DLL/reference dependency.

Если два mods понимают одну строку одинаково — это уже protocol.

## Migration note

Shared/global tag key специально сохраняет legacy `ukiol_*` ID.

Persistent key нельзя переименовывать только ради нового branding.

См. [Stable IDs — это данные, а не branding](../stable-ids-and-migrations/).
