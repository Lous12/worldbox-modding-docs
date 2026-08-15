---
title: Stable IDs are data, not branding
description: Why save identifiers should survive namespace, author and project-identity changes.
---

<span class="doc-status">✅ Real Political World migration policy</span>
<span class="doc-status">💾 Compatibility</span>

Political World changed its public project identity to:

```text
Lous12.PoliticalWorld
```

but deliberately kept many historical identifiers beginning with:

```text
ukiol_
```

Why?

Because persistent IDs are **data compatibility**, not branding.

## Real migration example

The 1.6 → 1.7 migration document tells addon developers to update:

```text
old dependency / namespace → new public identity
```

while explicitly warning:

```text
do not rename old ukiol_* content/save IDs
```

The internal identity document gives the same rationale: old gameplay assets, localization keys, traits, powers, ideology IDs, currents, map IDs and saved values already used those strings.

Changing the author's public name does not make those save references disposable.

## Separate three identities

Do not mix:

### Project/dependency identity

```text
Lous12.PoliticalWorld
```

Used by the mod loader and addons.

### C# namespace

```csharp
Lous12.PoliticalWorld
```

Used by source code.

### Persistent gameplay/save IDs

```text
ukiol_...
```

Historical strings that may already exist in saves.

All three can have different migration rules.

## New IDs should use the new namespace

Legacy compatibility does not mean new public addons should copy the old prefix.

New addon identity should look like:

```text
someauthor.DragonPolitics
```

and owned content:

```text
someauthor.DragonPolitics.ideology_dragonism
```

## Rename checklist

Before renaming any ID, ask:

```text
Can this string exist in an old save?
Can another mod persist or reference it?
Can it exist in player configuration?
Can it appear in localization/content registry links?
Can it be part of an external API?
```

If any answer is yes, the rename may require a migration.

## Prefer copy-forward migrations

For data keys, a safe pattern is often:

```text
read new
if missing:
    read old
    if old exists:
        write new = old
        keep old
return value
```

This is exactly the strategy Political World's addon-data v2 migration uses for legacy int/string state.

Keeping old data during the migration window makes rollback and mixed-version recovery safer.

## General rule

A refactor changes source organization.

A migration changes data identity.

Never assume those are the same operation.
