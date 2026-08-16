---
title: Common Player.log noise that may be non-fatal
description: Network, TLS, fallback-library and localization lines that should not be treated as a crash cause without context.
---

# Common `Player.log` noise that may be non-fatal

Some loud-looking lines can coexist with a working mod.

Examples seen in our research logs include:

```text
Curl error ...
UnityTls error ...
Fallback handler could not load library ...
Missing translation for ...
```

## Rule

Do not promote a scary-looking line into the root cause simply because it appears near your test.

Ask instead:

```text
Did the mod continue compiling/loading after this line?
Is there a later exception/compile error tied to my code?
Does the same line appear in a known-good run?
```

The Player.log Analyzer labels network/library patterns as **informational** for this reason.

Missing translation messages may still matter for UI/localization quality; see [addon localization fallback](../../guides/addon-localization-fallback/).
