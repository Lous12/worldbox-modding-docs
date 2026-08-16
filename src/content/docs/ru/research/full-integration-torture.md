---
title: WBML-0030 — Full Integration Torture
description: Русская версия: Combined save/reload, stale-reference, repeated worldgen, mass map reads and cross-mod integrity test.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">42 PASS / 0 FAIL / 0 SKIP</span>

Финальный combined torture перед baseline:

```text
save → marker → real reload → old refs
→ worldgen #1 → worldgen #2
→ 262 144 WorldTile reads
→ 65 536 unique coords
→ 100 000 tiles_map vs GetTile
→ cross-mod/Harmony integrity
```

Оба worldgen завершились через `finishMakingWorld` + 6 stable polls и 65 536 live tiles. Refs переиспользовались. Исходный tile был safe 100/100 после reload + двух worldgen.

Итог нагрузки: 262144/262144 reads, 65536/65536 unique coords, 100000/100000 same-ref `GetTile`. PW `startWar` patch не изменился; PW + CWS + Scenario Tools остались loaded; persistent runner ровно один.
