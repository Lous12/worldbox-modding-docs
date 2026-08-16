---
title: Research
description: Runtime probes, hypotheses, experiments and evidence with explicit version and reliability boundaries.
---

This section contains the experiments behind claims that are not safe to infer from names or source structure alone.

Typical workflow:

```text
question
→ controlled probe
→ raw runtime observation
→ reject harness mistakes
→ final matrix
→ version-bound documentation
```

## First consolidated baseline

- [WBML 0.1.0 — First Research Baseline](./wbml-0100-first-research-baseline/)
- [Runtime tooling baseline — 0.0.6–0.0.15](./runtime-tooling-baseline/)
- [Live entities baseline — 0.0.16–0.0.20](./live-entities-baseline/)
- [World map baseline — 0.0.21–0.0.23](./world-map-baseline/)
- [Worldgen lifecycle — 0.0.24–0.0.25](./worldgen-lifecycle-baseline/)
- [Performance & mass stress — 0.0.26–0.0.27](./performance-stress-baseline/)
- [Cross-mod coexistence — 0.0.28](./cross-mod-coexistence-baseline/)
- [Save/reload lifecycle — 0.0.29](./save-reload-lifecycle-baseline/)
- [WBML-0030 — Full Integration Torture](./full-integration-torture/)
- [Research Engine v2.1.1 status](./research-engine-status/)

## Earlier PoliticalWorldAPI research

- [WBML-0001 — Addon Data Save/Load Probe](./addon-data-save-load-probe/)
- [WBML-0002 — World Isolation Probe](./world-isolation-probe/)
- [WBML-0003 — Persistence & Party Lifecycle Suite](./persistence-lifecycle-suite/)
- [WBML-0004 — Event Bus Runtime Suite](./event-bus-runtime-suite/)
- [WBML-0005 — Actions / Conditions / Effects Suite](./actions-conditions-effects-suite/)

`PARTIAL PASS` results are kept when every executed assertion passed and the skipped branches are explicitly named. A SKIP is never silently promoted to Verified. Failed harness runs are preserved as negative knowledge when they reveal a methodology problem or dangerous assumption.
