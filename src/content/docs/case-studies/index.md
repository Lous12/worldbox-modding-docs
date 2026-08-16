---
title: Case Studies
description: Technical lessons extracted from real WorldBox mods and reproducible Lab failures/successes.
---

Case studies explain what a short API entry cannot: **what failed, why, how the causal error was separated from downstream symptoms, and what finally counted as evidence**.

## WorldBox Modding Lab

- [WBML-0001 — addon data survives a full restart](./wbml-0001-addon-data-persistence/)
- [WBML-0002 — addon state stays isolated between world saves](./wbml-0002-world-isolation/)
- [WBML-0003 — proving persistence without trusting old process memory](./wbml-0003-persistence-lifecycle/)
- [WBML-0004 — when runtime disagrees with the source map](./wbml-0004-event-bus-runtime/)
- [WBML-0005 — replacement semantics and dangerous cleanup](./wbml-0005-actions-runtime/)

Production incidents from Political World and TerraForge remain here too because a reproducible failure is often more educational than a clean happy-path snippet.
