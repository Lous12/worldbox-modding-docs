---
title: Runtime game integration
description: UI/input, NML and Harmony integration boundaries from WBML 0.8 and 0.9.
---

Canonical sources: WBML `0.8.0-fix1` and `0.9.0`.

## UI and input

Manual Escape reception was directly observed. A WBML-owned UI object could be attached to an active canvas and destroyed cleanly. After the integrated 0.9 reload the UI recovered to 44 canvases and 1 EventSystem in that run.

## Harmony

Multiple Harmony owners can coexist on the tested read-like getter. The observed priority sequence was `HIGH-PRE → LOW-PRE → HIGH-POST → LOW-POST`. WBML test owners were removable without removing foreign owners. Across the 0.9 reload the foreign owner set remained 3 → 3.

## NML surface

UI/event/listener/reload/service types were discovered. Discovery is not permission to mass-instantiate listeners or force live mod reload. Keep those as explicit boundaries unless a dedicated test proves a concrete operation.

[0.8 research](../../research/wbml-0800-world-game-integration/) · [0.9 closure](../../research/wbml-0900-coverage-closure/)
