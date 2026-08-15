---
title: Party-private addon data через PoliticalWorldAPI
description: Проверенный source API для typed addon state, связанного с конкретной Political World party.
---

<span class="doc-status">✅ Source verified API surface</span>
<span class="doc-status">🧪 Persistence round trip отдельно ещё не перепроверен</span>
<span class="doc-status">API source generation 1.9.0</span>

Political World API 1.9 предоставляет addon-private values для конкретной party:

```csharp
GetPartyInt(...)
SetPartyInt(...)

GetPartyString(...)
SetPartyString(...)

GetPartyBool(...)
SetPartyBool(...)

GetPartyFloat(...)
SetPartyFloat(...)
```

## Как это построено

Проверенный creator source не создаёт отдельную party save database.

Он формирует party-local data key и отправляет значение через тот же addon-private **kingdom data** API.

Концептуально:

```text
addon namespace
    ↓
party ID + local key
    ↓
kingdom addon-private storage
```

## Validation setter

Setter сначала проверяет, что указанная Political World party реально существует/resolve'ится в этом kingdom.

Только затем пишет scoped data.

Так не создаётся «валидное» party state для несуществующего party ID.

## Example

```csharp
PoliticalWorldAPI.SetPartyInt(
    kingdom,
    AddonId,
    party.Id,
    "conference_count",
    3
);
```

Read:

```csharp
int count = PoliticalWorldAPI.GetPartyInt(
    kingdom,
    AddonId,
    party.Id,
    "conference_count",
    0
);
```

## Зачем party ID участвует в key

Один local key:

```text
conference_count
```

может существовать у нескольких партий без collision, потому что в composed key входит party identity.

## Party lifecycle caution

Political World использует soft deactivation вместо обычного hard delete.

Party IDs могут участвовать в history и других политических данных.

Поэтому addon-private party state привязывайте к **stable party ID**, а не к «второму элементу списка партий».

## Persistence status

Source подтверждает API layering и typed helpers.

Отдельный runtime probe всё ещё должен проверить:

```text
write party values
→ save
→ reload
→ resolve same stable party ID
→ read values
```

включая active и inactive parties.
