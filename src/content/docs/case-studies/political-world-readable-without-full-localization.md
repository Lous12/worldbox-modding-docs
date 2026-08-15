---
title: Political World — designing content that survives missing translations
description: How literal display text, runtime localization, NML locales, and English fallback combine into graceful degradation.
---

<span class="doc-status">✅ Source verified design</span>
<span class="doc-status">🌐 Graceful degradation</span>

A common addon failure is to make localization mandatory for basic readability:

```text
missing locale key → empty name / ugly error / unusable UI
```

Political World's API 1.9 creator layer deliberately supports incomplete localization.

## Design goal from source

The creator API comments state:

```text
localization must be optional
English/default text must remain readable on any game language
```

## Layered strategy

An addon definition may carry both:

```text
NameKey
DisplayName
DescriptionKey
Description
```

That means a creator can ship readable default text immediately and add full locale packs over time.

## Resolution path

A user on a translated language can receive:

```text
native/current-language translation
```

while a missing translation can fall back to:

```text
registered English/default
```

then:

```text
literal DisplayName/Description
```

and finally:

```text
stable key
```

No single missing translation needs to make content blank.

## Why English/default is a fallback, not a forced language

The source only injects the English/default translation into the current locale when the current localization manager does not already have a translation.

A real current-language translation therefore has priority.

## Runtime registry remains usable when LM integration fails

Political World stores registered translations in its own dictionaries before attempting NML localization integration.

If the NML call fails, the API's own `ResolveLocalization(...)` path can still use its registered values.

This is graceful degradation across integration boundaries.

## What this does not solve

Fallback cannot guarantee:

- perfect translation quality;
- UI width;
- plural rules;
- grammar;
- right-to-left layout;
- font coverage.

It only guarantees a much better failure mode than "missing text".

## Lesson for general modding docs

Document both:

```text
How to provide full localization
```

and:

```text
What happens when localization is incomplete
```

The second question is where many real users encounter the system.
