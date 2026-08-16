---
title: Performance and mass stress baseline
description: WBML 0.0.26–0.0.27 measured read paths and high-volume map/registry stress without state mutation.
---

<span class="doc-status">✅ Functional result Verified</span>
<span class="doc-status">👁 Timings Observed</span>

## 0.0.26 — performance

**37 / 0 / 0 PASS.** On the tested RX 550 / Unity runtime:

- 20k reflected `tiles_map` field reads: ~2.960 ms (~6.76M ops/s);
- 20k reflected `tiles_list` reads: ~2.936 ms (~6.81M ops/s);
- 20k `Array.GetValue(x,y)`: ~1.226 ms (~16.3M ops/s);
- 5k reflected `MapBox.GetTile`: ~3.692 ms (~1.35M ops/s);
- 10k sample-state reads: ~11.562 ms;
- full rich 65,536-tile pass: ~113.981 ms;
- sampled list 32,768: ~26.282 ms.

The measured `GC.GetTotalMemory(false)` delta was 1,392,640 bytes. That is **not a leak verdict**. These timings are machine-specific observations. The useful design result is that a rich 65k reflection pass is large enough that it must not be placed in a per-frame wait loop.

## 0.0.27 — mass stress

**44 / 0 / 0 PASS.** Work was chunked at 4096 operations and the CPU stopwatch excluded frame-yield waits.

- **524,288** complete tile visits: typed tile, x/y, bounds, height, terrain, zone/chunk/region;
- **250,000** deterministic coordinate lookups;
- ~50,000 reflected `GetTile` cross-checks inside that lookup run;
- **100,000** neighbour traversals;
- 12 registry sweeps each for kingdoms/cities/actors; the final test world had 0/0/4 respectively;
- final collection refs/counts and sample state remained stable.

The functional conclusion is stronger than any ops/s number: these read paths survived high-volume use without detected map corruption.

Evidence: `/evidence/wbml-0026-result.txt`, `/evidence/wbml-0027-result.txt`.
