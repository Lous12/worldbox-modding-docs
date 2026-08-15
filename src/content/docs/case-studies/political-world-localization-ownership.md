---
title: Political World — treating localization keys as owned content
description: Why runtime translations use addon ownership instead of a global first-come-first-served string table.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🌐 Collision prevention</span>

Localization often looks harmless:

```text
key → translated string
```

In an addon ecosystem, the key is a global identity.

Two addons using the same generic key can overwrite or confuse each other.

## Political World's approach

`RegisterLocalization(...)` requires the key to be owned by the registered addon.

The API also tracks:

```text
localization key → owner addon ID
```

If a different addon already owns the key, the second registration is rejected and the framework records diagnostic code:

```text
PWDIAG190
```

## Bad key design

```text
government.name
menu.title
description
```

These are easy to collide with.

## Better key design

```text
YourName.MyAddon.government.technocracy.name
YourName.MyAddon.action.reform.description
```

Now the key itself communicates ownership.

## Why this matters beyond localization

The same principle applies to:

- actions;
- ideologies;
- governments;
- rare events;
- save-data keys;
- tags;
- UI routes;
- settings.

If content is globally addressable, it needs globally safe identity.

## Fallback does not bypass ownership

Political World's internal helper can seed English fallback text from `DisplayName`/`Description`, but only when:

- the addon is registered;
- the localization key exists;
- the fallback is non-empty;
- the key belongs to that addon.

Convenience should not disable ownership rules.

## Framework lesson

Do not treat localization as a special ungoverned side table.

Localization keys are part of the public content namespace and deserve:

- ownership;
- collision detection;
- stable naming;
- migration discipline;
- diagnostics.
