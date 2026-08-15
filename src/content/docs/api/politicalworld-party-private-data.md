---
title: PoliticalWorldAPI party-private addon data
description: Source-backed typed addon state associated with one Political World party.
---

<span class="doc-status">✅ Source verified API surface</span>
<span class="doc-status">🧪 Persistence round trip not independently re-tested here</span>
<span class="doc-status">API source generation 1.9.0</span>

Political World API 1.9 exposes addon-private values scoped to a party:

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

## How it is layered

The inspected creator source does not introduce a separate party save database.

Instead it composes a party-local data key and routes the value through the same addon-private **kingdom data** API.

Conceptually:

```text
addon namespace
    ↓
party ID + local key
    ↓
kingdom addon-private storage
```

## Setter validation

The inspected setters first verify that the requested Political World party can be resolved for the kingdom.

Only then do they write the scoped data.

This avoids creating apparently valid party state for a party ID that does not exist in that kingdom.

## Example concept

```csharp
PoliticalWorldAPI.SetPartyInt(
    kingdom,
    AddonId,
    party.Id,
    "conference_count",
    3
);
```

Later:

```csharp
int count = PoliticalWorldAPI.GetPartyInt(
    kingdom,
    AddonId,
    party.Id,
    "conference_count",
    0
);
```

## Why scope through party ID

The same local key:

```text
conference_count
```

can exist for multiple parties without collision because the party identity participates in the composed key.

## Party lifecycle caution

Political World supports soft party deactivation rather than exposing hard deletion as the normal lifecycle.

Party IDs may be referenced by history and other political state.

Addon-private party data should therefore be treated as attached to a **stable party ID**, not to "whatever party currently occupies list index 2".

## Persistence status

The source verifies the API layering and typed helpers.

A dedicated runtime probe should still test:

```text
write party values
→ save
→ reload
→ resolve same stable party ID
→ read values
```

including active and inactive parties.
