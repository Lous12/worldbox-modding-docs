---
title: Addon localization with readable fallbacks
description: How Political World keeps addon content readable even when a translation is missing.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🌐 Localization pattern</span>
<span class="doc-status">API source generation 1.9.0</span>

Political World's creator API was designed around one important rule:

> localization should be optional, but missing localization should not make addon content unreadable.

The source defines:

```csharp
public const string DefaultFallbackLanguage = "en";
```

## Three ways addon text can exist

An addon can use:

1. literal fallback fields such as `DisplayName` / `Description`;
2. normal NeoModLoader locale files;
3. PoliticalWorldAPI runtime localization registration.

These approaches can coexist.

## Register one translation

```csharp
PoliticalWorldAPI.RegisterLocalization(
    AddonId,
    "ru",
    AddonId + ".technocracy.name",
    "Технократия"
);
```

The source requires:

- registered addon;
- non-empty language ID;
- non-empty key/value;
- key owned by the addon.

## Register a pack

```csharp
PoliticalWorldAPI.RegisterLocalizationPack(
    AddonId,
    "ru",
    new Dictionary<string, string>
    {
        [AddonId + ".technocracy.name"] = "Технократия",
        [AddonId + ".technocracy.description"] =
            "Власть технических специалистов."
    }
);
```

There is also:

```csharp
PoliticalWorldAPI.RegisterEnglishLocalization(...)
```

which targets the default fallback language.

## Localization ownership

The API tracks which addon owns a localization key.

If another addon already owns the same key, registration is rejected and diagnostics receives:

```text
PWDIAG190
```

This turns localization keys into part of the same collision-safe namespace model as other addon content.

## Runtime LM integration

After storing the translation in Political World's own registry, the source attempts to integrate it with NeoModLoader's localization manager:

```csharp
LM.Add(language, key, value)
```

If the registered language is currently active, it also adds the value to the current locale.

If English is registered while the current locale has no value for the key, the English/default string can be injected as a readable fallback.

If LM integration throws, Political World's own registry still retains the translation so `ResolveLocalization(...)` can continue to resolve it.

## Resolution order

The inspected `ResolveLocalization(key, fallback)` path effectively checks:

```text
1. Political World registered translation for current language
2. NeoModLoader LM translation for current language/key
3. Political World registered English/default translation
4. literal fallback argument
5. the localization key itself
```

The last step is deliberate: a raw stable key is still more useful than returning an empty label.

## Example content definition

```csharp
new PoliticalWorldAPI.IdeologyDefinition
{
    Id = AddonId + ".technocracy",
    NameKey = AddonId + ".technocracy.name",
    DisplayName = "Technocracy",
    DescriptionKey = AddonId + ".technocracy.description",
    Description = "Government led by technical specialists."
}
```

Even without a Russian translation, the addon can remain readable through the English/default literal.

## Seeded fallback

When several creator definitions are registered, Political World can seed their `DisplayName` / `Description` into the English fallback registry when the keys are valid and owned by the addon.

That reduces the chance that a creator supplies a readable literal but forgets to build a separate locale pack immediately.

## Language ID validation scope

The inspected source normalizes a language ID only by trimming it and requiring a length from 2 to 24 characters.

This page does **not** claim that Political World validates language IDs against a fixed ISO language-code list.

## UI warning

Readable fallback text does not guarantee that every UI layout can fit every language.

Localization testing still needs:

- longer translated labels;
- Cyrillic/Latin/CJK coverage;
- wrapping/clipping checks;
- font support;
- dynamic-width UI where appropriate.

## General lesson

Localization fallback should be a **resolution chain**, not a binary:

```text
translation exists / blank string
```

A good public framework makes incomplete translation degrade into readable text rather than broken UI.
