---
title: Performance and mass stress baseline
description: Русская версия: WBML 0.0.26–0.0.27 measured read paths and high-volume map/registry stress without state mutation.
---

<span class="doc-status">✅ Functional result Verified</span>
<span class="doc-status">👁 Timings Observed</span>

## 0.0.26 — performance

**37 / 0 / 0 PASS.** На тестовом RX 550 runtime: `tiles_map`/`tiles_list` reflection reads ~6.7–6.8M ops/s, `Array.GetValue` ~16.3M ops/s, reflected `GetTile` ~1.35M ops/s. Полный rich pass 65 536 tiles занял ~113.981 ms. Все цифры **hardware-specific**, не contracts. GC delta 1 392 640 bytes — observation, не leak verdict.

Практический вывод: полный rich reflection scan карты нельзя ставить в per-frame wait loop.

## 0.0.27 — mass stress

**44 / 0 / 0 PASS.** Chunk 4096 ops/frame: **524 288** tile visits, **250 000** coordinate lookups, ~50k reflected `GetTile` cross-checks, **100 000** neighbour traversals и 12 registry sweeps. После нагрузки refs/counts/sample state остались стабильны. В конкретном мире registries были 0 kingdoms / 0 cities / 4 actors.
