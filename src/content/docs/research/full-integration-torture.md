---
title: WBML-0030 — Full Integration Torture
description: Combined save/reload, stale-reference, repeated worldgen, mass map reads and cross-mod integrity test.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">42 PASS / 0 FAIL / 0 SKIP</span>

This was the final combined torture run before the first baseline.

One F6 sequence performed:

```text
safe programmatic save
→ one-tile marker
→ real reload
→ old-reference safety checks
→ generateNewMap #1
→ generateNewMap #2
→ 262,144 WorldTile reads
→ 65,536 unique-coordinate validation
→ 100,000 tiles_map vs MapBox.GetTile comparisons
→ cross-mod/Harmony final integrity
```

Both worldgen cycles completed through `finishMakingWorld`, with six stable polls and 65,536 live tiles. References were reused in both cycles. The original tile remained safe **100/100 after reload + two worldgens**.

Mass results:

- 262,144 / 262,144 tile reads safe;
- 65,536 / 65,536 unique coordinates;
- 100,000 / 100,000 `GetTile` comparisons same reference.

Political World's `startWar` Harmony owner remained unchanged, and PW + Custom Worldsize + Scenario Tools were still loaded at the end. The persistent runner count was exactly one.

This suite does not prove every possible mod combination or map size. It proves that the investigated subsystems survived this exact destructive sequence together on the baseline.

Evidence: [`wbml-0030-result.txt`](/worldbox-modding-docs/evidence/wbml-0030-result.txt).
