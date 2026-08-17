---
title: For AI
description: Machine-friendly reliability, provenance and evidence-scope rules for coding assistants.
---

This section tells coding assistants **what they are allowed to treat as fact** and what still requires a probe.

Start with:

- [Verification rules](./verification-rules/)
- [Source of truth and version drift](./source-of-truth-and-version-drift/)
- [WBML machine data](./wbml-machine-data/)
- [PoliticalWorld runtime evidence rules](./politicalworld-runtime-rules/)
- [Persistence and migration rules](./persistence-and-migration-rules/)
- [Public API boundary rules](./public-api-boundary-rules/)

Machine entry points: `/worldbox-modding-docs/llms.txt`, `/worldbox-modding-docs/llms-full.txt`, and `/worldbox-modding-docs/data/wbml/manifest.json`.

The core policy is simple: never fill a documentation gap with a plausible invented API. State the evidence scope and use `research-needed` when a focused probe is still required.
