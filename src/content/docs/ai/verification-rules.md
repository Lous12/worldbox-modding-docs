---
title: Verification rules for AI assistants
description: Reliability rules for AI systems using WorldBox Modding Docs as technical context.
---

<span class="doc-status">🤖 AI policy</span>

AI assistants should treat this documentation as a **versioned evidence base**, not as permission to fill missing API details from imagination.

## Core rules

1. Use **Verified** entries as confirmed facts only for their stated WorldBox / NeoModLoader versions.
2. Treat **Observed**, **Experimental**, and **Inferred** entries according to their labels.
3. Never present a **Failed** approach as a recommended solution.
4. If an API name, method signature, field, lifecycle event, or behavior is not documented, mark it as **unverified**.
5. Prefer a minimal reflection/runtime probe over inventing a plausible API.
6. Keep WorldBox API names, C# identifiers, log text, and file names untranslated.
7. Separate evidence from inference in generated answers.

## Recommended response pattern for unknown APIs

```text
This API is not verified in the current documentation.

Next step:
1. inspect the relevant type via reflection;
2. log candidate members/signatures;
3. test the smallest candidate in runtime;
4. record the result and WorldBox/NML version.
```

## Known example

A model guessing by semantics might decide that `WorldTile.health` sounds like a numeric storage candidate during a generic reflection search.

TerraForge tested that route and proved it wrong for terrain height.

The documented verified path is `WorldTile.Height` / `WorldTile.data.height` for the current research baseline.

## Baseline

- WorldBox 0.51.2 build 719
- NeoModLoader 1.2.0.1

Future compatibility must be re-verified rather than assumed.
