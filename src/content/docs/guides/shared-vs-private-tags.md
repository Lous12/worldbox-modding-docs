---
title: Shared tags vs addon-private tags
description: Choose between cross-mod conventions and collision-safe private kingdom tags.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🏷 Data-design pattern</span>

Political World exposes two different kingdom-tag concepts.

They exist for different jobs.

## Shared kingdom tags

Public methods include:

```csharp
GetKingdomTags(...)
HasKingdomTag(...)
AddKingdomTag(...)
RemoveKingdomTag(...)
```

These tags are intentionally **shared/global**.

The source keeps their historical storage key:

```text
ukiol_api_kingdom_tags
```

for compatibility.

Use shared tags only when multiple mods intentionally agree on the meaning of a tag.

Example concept:

```text
trade_embargoed
```

could be useful as a shared convention if several addons document and honor the same meaning.

## Addon-private kingdom tags

Public methods include:

```csharp
GetAddonKingdomTags(...)
HasAddonKingdomTag(...)
AddAddonKingdomTag(...)
RemoveAddonKingdomTag(...)
```

These require a registered addon and are stored inside that addon's collision-safe data namespace.

Internally, the inspected source stores the private tag list under local key:

```text
__private_tags
```

The actual final save key is still namespaced through the addon-data system.

## Private tag format

The current implementation serializes the local tag list as a pipe-delimited string:

```text
tag_a|tag_b|tag_c
```

A private local tag containing `|` is rejected by the add path.

This serialization format is an internal implementation detail. Addons should use the public methods instead of reading the `__private_tags` string directly.

## Decision rule

Ask:

> Does another independent mod need to understand this tag?

If **no**:

```text
use addon-private tag
```

If **yes, intentionally**:

```text
use shared tag with a documented cross-mod convention
```

## Examples

Private:

```text
dragon_dynasty
has_completed_my_quest
internal_reform_stage_2
```

Shared only by agreement:

```text
sanctioned
neutral_trade_zone
protected_state
```

The names above are examples, not built-in Political World tag IDs.

## Why private should be the default

Private storage gives:

- collision protection;
- clear ownership;
- easier cleanup;
- safer refactoring;
- less accidental coupling between mods.

Shared state creates a dependency even if no DLL/reference dependency exists.

A string understood by two mods is already a protocol.

## Migration note

The shared/global tag key intentionally retains a legacy `ukiol_*` identifier.

Do not rename a persistent key merely to match current branding.

See [Stable IDs are data, not branding](../stable-ids-and-migrations/).
