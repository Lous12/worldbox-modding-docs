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

## Completed WorldBox Modding Lab research

- [WBML-0001 — Addon Data Save/Load Probe](./addon-data-save-load-probe/)
- [WBML-0002 — World Isolation Probe](./world-isolation-probe/)
- [WBML-0003 — Persistence & Party Lifecycle Suite](./persistence-lifecycle-suite/)
- [WBML-0004 — Event Bus Runtime Suite](./event-bus-runtime-suite/)
- [WBML-0005 — Actions / Conditions / Effects Suite](./actions-conditions-effects-suite/)

`PARTIAL PASS` results are kept when every executed assertion passed and the skipped branches are explicitly named. A SKIP is never silently promoted to Verified.

Failed harness runs are preserved when they reveal a methodology problem or a dangerous assumption.
