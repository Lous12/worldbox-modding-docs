---
title: WBML failed assumptions — negative knowledge
description: Plausible lifecycle, worldgen, reload and compatibility assumptions disproved by runtime evidence.
---

<span class="doc-status">❌ Failed assumptions</span>
<span class="doc-status">✅ Preserved as evidence</span>


These failures belong to the **harness assumptions**, not automatically to WorldBox.

1. **Worldgen requires a new `WorldTile` reference — false.** Same-size worldgen repeatedly reused tile/array references.
2. **Old tile must disappear from the map — false.** Held tile references remained current after repeated generation on the tested size.
3. **Exact `WorldTile.Height` restoration proves reload — false.** Height can normalize/recompute during load.
4. **Total AppDomain assembly count must stay constant — false.** Reflection lazily loaded three framework assemblies without a mod conflict.
5. **A world-owned coroutine survives world replacement — false.** The runner must live outside the replaced world lifecycle.
6. **`on_world_loaded` is authoritative for `generateNewMap` — false.** `finishMakingWorld` was the useful explicit signal in this path.
7. **A full 65k scan is acceptable in every wait frame — operationally false.** The original harness drove FPS to roughly 6.
8. **Destroyed Unity wrapper == ordinary CLR null — false model.** Fake-null and delayed destruction require Unity-aware checks.

## Why we publish this

Negative knowledge prevents future modders and AI assistants from rebuilding the exact bugs that consumed the research time in the first place.

[Sanitized rejected-run excerpts](/worldbox-modding-docs/evidence/wbml-rejected-harness-assumptions.txt)
