---
title: WBML roadmap after 0.6.0
description: Planned research tasks toward the 1.0 WorldBox Modding Knowledge Baseline.
---

This roadmap is a research plan, not a promise that version numbers will ship unchanged. One numbered WBML version means one finished research question; narrow harness corrections stay `fixN` inside that version.

## Next major research tasks

| Version | Research task | Main question |
|---|---|---|
| 0.7.0 | Save/Load/Persistence Integration | IDs, references, missing entities, migration/version change and non-empty registry behavior across reload |
| 0.8.0 | World/Map/Worldgen Control Atlas | map/world control paths beyond the earlier baseline, especially future exploration needs |
| 0.9.0 | UI/Input/Game Integration Atlas | windows, input, Escape/manual gates, overlays, map modes, camera/gameplay control boundaries |
| 0.10.0 | Events/Hooks/Harmony Integration Atlas | hooks, ordering, ownership and safe integration patterns |
| 0.11.0 | Cross-Mod Compatibility Atlas | coexistence/conflict contracts at broader scale |
| 0.12.0 | Performance & Scale Atlas | costs and scaling of the practical high-level surfaces |
| 0.13.0 | Capability Recipes / High-Level API | turn verified low-level evidence into reusable safe recipes |
| 0.14.0 | Disposable World Automation | safer automation for destructive/create/remove experiments |
| 0.15.0 | Full Mod Architecture Torture | end-to-end architecture stress across the accumulated surface |

After that, remaining gaps may use 0.16–0.20 as needed. A release candidate should use a non-conflicting version such as `0.90.0`; the target remains **`1.0.0 — WorldBox Modding Knowledge Baseline`**.

## Do not repeat closed suites by default

0.2–0.6 are frozen on the current WorldBox 0.51.2/NML 1.2.0.1 baseline. Re-run a closed suite when the baseline changes or a genuinely new question depends on it, not just because a later doc page wants a fresher timestamp.

## Optional alternative-gameplay research

If total-conversion-like projects become a real goal, future exploratory work can cover camera control, input override, custom movement, Unity physics, sprite/Animator control, scene/level overlays and vanilla simulation isolation. These are **not** committed numbered versions yet.

[Current research archive](./) · [Planned shared API](../../guides/worldbox-modding-api-roadmap/) · [Machine data](../../ai/wbml-machine-data/)
