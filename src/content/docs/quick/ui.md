---
title: UI — Quick Docs
description: Current UI evidence boundary and where deeper WorldBox UI research is still needed.
---

**Status:** Partial baseline; do not treat UI as fully mapped.

The earlier WBML UI Infrastructure suite (`0.0.9-fix3`) reached an automated `126 PASS / 0 FAIL / 0 SKIP`, but its **manual Escape behavior remains an open gate** in the consolidated baseline. Later 0.2–0.6 atlases did not turn that into a universal UI/input guarantee.

Practical rule:

- prefer already documented UI recipes where a concrete path was tested;
- do not infer that every `Window`, input lock or cloned object has the same lifetime;
- do not claim Escape/input integration is fully verified while the manual gate remains open;
- deeper UI/input/game integration is planned for a later dedicated WBML phase.

For Fog of War Overhaul, kingdom-view overlays, map modes, input override and camera integration are therefore **research-needed**, not pre-approved architecture.

[Safe UI clone recipe](../../recipes/safe-ui-clone/) · [Runtime tooling baseline](../../research/runtime-tooling-baseline/) · [Evidence statuses](../evidence-statuses/)
