---
title: Persistence and migration rules for AI
description: Prevent AI assistants from inventing save guarantees, raw keys, migrations or cross-addon storage conventions.
---

<span class="doc-status">🤖 AI-critical</span>
<span class="doc-status">✅ Political World source-backed</span>

Persistence is an area where plausible-looking AI code can quietly damage saves.

Use stricter rules than for ordinary runtime helpers.

## Rule 1 — public storage API first

For a Political World addon, prefer:

```text
Get/SetKingdomInt
Get/SetKingdomString
Get/SetKingdomBool
Get/SetKingdomFloat
addon-private tags
party-private typed data
```

Do not reconstruct internal:

```text
pw_api2_data_...
ukiol_api_data_...
__private_tags
```

keys in normal addon code.

Those formats are documented for research/migration understanding, not as the supported addon contract.

## Rule 2 — do not claim save persistence from source naming alone

A folder named:

```text
Persistence
```

or a method that writes `Kingdom.data` is evidence of persistence intent.

It is not by itself a completed:

```text
save → process restart → load
```

runtime verification.

When no round-trip result exists, say:

```text
source-verified storage path; runtime persistence test pending
```

## Rule 3 — stable IDs are data

Never rename a persistent ID only to match:

- new author name;
- new namespace;
- cleaner style;
- project rebranding.

First identify migration consequences.

Political World intentionally retains `ukiol_*` IDs while its public project identity is `Lous12.PoliticalWorld`.

## Rule 4 — new and legacy evidence can coexist

If code can read:

```text
v2 key
fallback old v1 key
```

do not "clean up" the old path unless the migration policy explicitly permits removal.

Backward compatibility code can look redundant while being essential.

## Rule 5 — copy-forward before destructive migration

Safe default for an existing key migration:

```text
read new
if missing:
    read legacy
    if found:
        write new
        keep legacy
```

Do not delete old data in generated migration code unless rollback/compatibility requirements have been considered.

## Rule 6 — private by default

If state is only for one addon:

```text
addon-private data/tag
```

not a shared tag/key.

Shared string conventions are an API between mods and must be documented as such.

## Rule 7 — typed helpers preserve semantics

Use:

```text
SetKingdomBool
SetKingdomFloat
```

instead of manually encoding bool/float through strings.

The framework already defines representation and culture behavior.

## Rule 8 — party state follows stable party ID

Do not attach party data to:

```text
list index
display name
current order
```

when a stable party ID exists.

## Rule 9 — never invent a migration result

If the actual save/load probe has not been executed, do not write:

```text
"verified to persist"
```

Use the documented status.

## Rule 10 — version-bind persistence claims

A persistence result must identify:

```text
WorldBox
NeoModLoader
parent mod/API
probe version
```

Save behavior is too important to leave versionless.


## Current verified persistence record

WBML-0001 has now promoted one claim to runtime Verified:

```text
WorldBox 0.51.2 build 719
NeoModLoader 1.2.0.1
PoliticalWorldAPI 1.14.0
```

Verified after a **full process restart**:

```text
kingdom int
kingdom Unicode string
kingdom bool
kingdom float
addon-private kingdom tag
shared kingdom tag
```

Do not extend this result to party-private data, cross-world isolation, other versions, or legacy migration without separate evidence.
