---
title: Save / Load — Quick Docs
description: Practical save/load identity and persistence rules from the frozen WBML baseline.
---

**Status:** VERIFIED on WorldBox 0.51.2 build 719 / NML 1.2.0.1 in the exact tested scopes.

Observed callable paths include:

```text
SaveManager.saveToCurrentPath()
SaveManager.loadWorld()
```

The important 0.7 result is identity: after reload, an entity may keep the same logical ID while its CLR reference is replaced. Building did this in all three tested cycles; Actor did it in two of three. City and Kingdom reused their references in that run.

**Use IDs/durable data across load, then re-resolve live objects. Do not require object-reference equality across reload.**

Selected `renown` probes on Actor/City/Kingdom showed exact saved persistence, unsaved rollback and cleanup restoration. That does not prove every field/property is serialized.

[Full persistence details](../../api/runtime-persistence-identity/) · [WBML 0.7 evidence](../../research/wbml-0700-persistence-identity/)
