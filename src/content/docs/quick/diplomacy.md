---
title: Diplomacy — Quick Docs
description: Current evidence boundary for diplomacy, wars, alliances and Political World integration.
---

**Status:** Partial/Observed. There is no general “safe diplomacy API” proven by WBML 0.2–0.6.

The consolidated baseline observed `DiplomacyManager` in the game assembly and Political World's Harmony ownership/interception around `DiplomacyManager.startWar` in the tested stack. That is useful compatibility evidence, but it is **not** a blanket guarantee that arbitrary war/alliance mutation methods are safe to invoke.

The 0.2 atlas catalogues diplomacy-related types/members/relations; mutation candidates remain evidence until a focused safe mutation/lifecycle recipe verifies them.

For current mods:

- if a public PoliticalWorldAPI action/event covers the task, prefer that documented public layer;
- do not mass-invoke methods simply because their names look like `startWar`, `removeAlliance`, `clear`, etc.;
- deeper war/alliance lifecycle and cross-mod ownership belong in later dedicated WBML phases.

**research-needed:** a high-level WorldBox Modding API diplomacy wrapper is planned after WBML 1.0, but does not exist today.

[Automatic API Atlas](../../research/wbml-0200-automatic-api-atlas/) · [Political World Event Bus](../../api/politicalworld-event-bus/) · [Planned shared API](../../guides/worldbox-modding-api-roadmap/)
