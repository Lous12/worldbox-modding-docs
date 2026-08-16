---
title: PoliticalWorldAPI party-private addon data
description: Typed addon state scoped to a Political World party, with WBML-0003 runtime persistence and lifecycle evidence.
---

<span class="doc-status">✅ Runtime verified — executed branches</span>
<span class="doc-status">WBML-0003</span>
<span class="doc-status">API runtime 1.14.0</span>

Party-private data lets an addon attach its own values to a **stable Political World party ID** without exposing those values as shared cross-mod tags.

For a beginner, the mental model is:

```text
kingdom
└─ party ID
   └─ your addon ID
      └─ your local key → value
```

## Typed public API

The inspected API 1.9 creator source exposes:

```csharp
public static int GetPartyInt(
    Kingdom kingdom,
    string addonId,
    string partyId,
    string key,
    int fallback)

public static bool SetPartyInt(
    Kingdom kingdom,
    string addonId,
    string partyId,
    string key,
    int value)

public static string GetPartyString(
    Kingdom kingdom,
    string addonId,
    string partyId,
    string key,
    string fallback)

public static bool SetPartyString(
    Kingdom kingdom,
    string addonId,
    string partyId,
    string key,
    string value)

public static bool GetPartyBool(...)
public static bool SetPartyBool(...)
public static float GetPartyFloat(...)
public static bool SetPartyFloat(...)
```

The exact runtime package tested by WBML was newer: API **1.14.0**. Do not confuse the source snapshot version with the runtime version.

## Minimal example

```csharp
const string AddonId = "Example.PartyAddon";
const string Key = "conference_count";

bool written = PoliticalWorldAPI.SetPartyInt(
    kingdom,
    AddonId,
    party.Id,
    Key,
    3
);

int count = PoliticalWorldAPI.GetPartyInt(
    kingdom,
    AddonId,
    party.Id,
    Key,
    0
);
```

Always use the party's stable ID. Do not use a list index such as "party number 2" as persistent identity.

## Missing party behavior

WBML-0003 tested a party ID that did not exist in the target kingdom.

Runtime API 1.14.0 behaved as follows:

```text
GetPartyInt    → supplied fallback
GetPartyString → supplied fallback
GetPartyBool   → supplied fallback
GetPartyFloat  → supplied fallback

SetPartyInt    → false
SetPartyString → false
SetPartyBool   → false
SetPartyFloat  → false
```

This is useful because a missing party does not silently create apparently valid party-scoped state.

## Persistence after a full WorldBox restart

WBML-0003 performed a full process restart and then resolved the same party again.

The following values returned correctly:

```text
party int
party Unicode string
party bool
party float
```

The probe did not rewrite those values before the restart verification.

Result:

```text
C.PARTY.RESTART.int    PASS
C.PARTY.RESTART.string PASS
C.PARTY.RESTART.bool   PASS
C.PARTY.RESTART.float  PASS
```

This promotes the executed party typed-data persistence path from source expectation to runtime Verified for the tested stack.

## What happens while a party is inactive?

Political World exposes soft party lifecycle helpers in the inspected creator API, including concepts equivalent to:

```csharp
GetKingdomParties(..., includeInactive)
GetKingdomParty(..., includeInactive: true)
DeactivateKingdomParty(...)
ReactivateKingdomParty(...)
SetKingdomPartyActive(...)
```

WBML-0003 intentionally selected an **active, non-ruling party** so the lifecycle test would not disturb the ruling party.

The sequence was:

```text
seed int/string/bool/float
→ deactivate party
→ resolve inactive party
→ read all four values while inactive
→ reactivate party
→ confirm active state restored
```

Every executed step passed.

Important practical consequence:

> Deactivation did not erase the tested party-private values.

That is exactly why addons should treat a stable party ID as long-lived identity rather than assuming an inactive party has disappeared.

## Source layering

The inspected source composes party identity into a local data key and routes it through addon-private kingdom data rather than exposing a separate public party save database.

Conceptually:

```text
addon namespace
    ↓
party ID + local key
    ↓
kingdom addon-private storage
```

This describes the inspected implementation. It does **not** authorize addons to reconstruct internal storage keys manually. Use the public methods.

## Evidence gap: party-to-party isolation

WBML-0003 ended with:

```text
PASS=119
FAIL=0
SKIP=1
SUITE RESULT: PARTIAL PASS
```

The skipped environmental branch was same-kingdom **party-to-party isolation**: the chosen world did not provide the required second party in the original isolation phase.

Therefore we can say:

```text
✅ party typed persistence after restart — verified
✅ data while inactive — verified
✅ invalid-party fallback/rejection behavior — verified
🧪 same-kingdom party A vs party B isolation — not yet verified by WBML-0003
```

Do not promote the skipped branch just because the rest of the suite passed.

## Beginner mistakes to avoid

### Using a display name as identity

Names can change. Use the stable party ID for persistence.

### Treating inactive as deleted

WBML-0003 verified that the tested inactive party remained resolvable and retained its addon data.

### Ignoring setter return values

A party setter can return `false`, for example when the target party cannot be resolved. Check the result when the write matters.

### Rebuilding internal data keys yourself

The implementation can evolve. Public API methods are the compatibility boundary.

## Evidence

- [WBML-0003 research page](../../research/persistence-lifecycle-suite/)
- [Sanitized WBML-0003 result](/worldbox-modding-docs/evidence/wbml-0003-result.txt)
