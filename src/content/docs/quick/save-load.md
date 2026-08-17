---
title: Save / Load — Quick Docs
description: Version-bound SaveManager guidance from the consolidated WBML baseline and current read atlas.
---

**Status:** Tested save/reload paths exist on the 0.51.2 baseline, but 0.7.0 is still planned to deepen ID/reference/persistence integration.

The consolidated WBML 0.1 baseline safely invoked the observed no-argument signatures:

```text
SaveManager.saveToCurrentPath()
SaveManager.loadWorld()
```

Treat those signatures as version-bound observations. Do not guess slot/path overloads or physical save paths.

WBML 0.3.0 also verified read-only helpers:

```csharp
int currentSlot = SaveManager.getCurrentSlot();
bool loadingAnimation = SaveManager.isLoadingSaveAnimationActive();
```

For mod-owned Political World data, use the dedicated public storage APIs documented elsewhere rather than reconstructing raw save keys.

**research-needed:** stale/reused `Actor`/`City`/`Kingdom` object identities across non-empty save/reload registries remain a named gap and are part of the deeper 0.7.0 direction.

[Detailed SaveManager lifecycle](../../api/savemanager-lifecycle/) · [Save/reload baseline](../../research/save-reload-lifecycle-baseline/) · [Evidence statuses](../evidence-statuses/)
