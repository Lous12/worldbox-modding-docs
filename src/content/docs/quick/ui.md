---
title: UI / Input — Quick Docs
description: Practical UI, input and Harmony integration guidance from WBML 0.8/0.9.
---

**Status:** VERIFIED for the tested current runtime.

- Manual Escape keydown was received by the WBML input probe.
- A WBML-owned UI object was created, attached to an active canvas and destroyed cleanly.
- The 0.8 run saw 20 active canvases / 1 EventSystem; after the integrated 0.9 reload the run saw 44 canvases / 1 EventSystem. These are observations, not fixed constants.
- 73 NML UI-related types were discovered.
- Harmony test owners could be installed, invoked and removed without removing the three observed foreign owners.

Do not treat discovery of an NML reload/listener type as proof that it is safe to mass-instantiate or force-reload live mods.

[Full integration details](../../api/runtime-game-integration/) · [WBML 0.8 evidence](../../research/wbml-0800-world-game-integration/)
