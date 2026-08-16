---
title: For AI
description: Machine-friendly reliability, provenance and evidence-scope rules for coding assistants.
---

This section tells coding assistants **what they are allowed to treat as fact** and what still requires a probe.

Start with:

- [Verification rules](./verification-rules/)
- [Source of truth and version drift](./source-of-truth-and-version-drift/)
- [PoliticalWorld runtime evidence rules](./politicalworld-runtime-rules/)
- [Persistence and migration rules](./persistence-and-migration-rules/)
- [Public API boundary rules](./public-api-boundary-rules/)

The core policy is simple: never fill a documentation gap with a plausible invented API. State the evidence scope and propose a test instead.
