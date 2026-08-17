---
title: WBML 0.8.0-fix1 — World, Game & Integration Mega Atlas
description: Canonical UI/input, world/map, NML surface, Harmony ownership/order and cross-mod coexistence evidence.
---

**Canonical probe:** `0.8.0-fix1` · **run:** `8ee7367799c0` · **result:** `CLOSED PASS` — 46/0/0.

## What it proved

- Escape keydown was observed in the controlled manual window.
- 20 active canvases, 1 EventSystem and 73 NML UI-related types were present in the tested state.
- A WBML-owned UI object could be created, attached and destroyed cleanly.
- The runtime world/map census found 50 manager types, 38 runtime manager samples and 410 worldgen-like methods; 40 primitive reads completed with 0 failures.
- Two WBML Harmony owners patched a read-like Actor getter, callbacks were observed, and both WBML owners were removed afterward.
- Political World, Custom Worldsize and NML Harmony owners remained foreign owners; WBML did not claim ownership of them.
- NML event/listener/reload/service surfaces were discovered without mass-instantiating listeners or force-reloading live mods.

Observed callback order for each of three invocations: `HIGH-PRE → LOW-PRE → HIGH-POST → LOW-POST`. That order is version-bound evidence, not a future-version guarantee.

## Rejected initial run

Initial `0.8.0` produced one false `A.UI.NML-surface` FAIL because the assertion ran before the static census. The same run later found 73 NML UI types. fix1 moved the census before the assertion and is canonical.

Machine data: `/worldbox-modding-docs/data/wbml/0800-world-game-integration-atlas.json`.
