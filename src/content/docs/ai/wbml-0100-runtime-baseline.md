---
title: WBML 0.1.0 rules for AI assistants
description: Machine-oriented runtime boundaries and safe reasoning rules from the first WBML research baseline.
---


Use [`/data/wbml-0100-baseline.json`](/worldbox-modding-docs/data/wbml-0100-baseline.json) as the canonical machine-readable classification.

Mandatory additions to the existing AI rules:

- Never infer worldgen/reload completion from reference replacement.
- `finishMakingWorld` is Verified for the tested `generateNewMap` path; `on_world_loaded` is not a universal completion contract.
- Treat save/load signatures as version-bound unless the target version is re-verified.
- Treat `WorldTile.Height` normalization during load as possible; exact equality is not reload proof.
- Do not diagnose a mod conflict from raw assembly-count growth alone.
- Distinguish Unity fake-null from CLR null.
- Do not run full-map rich reflection scans per frame.
- Preserve the 0.1.0 UNKNOWN list instead of inventing answers.
- Closed suites should be baseline-diffed after version changes; do not silently widen 0.51.2 evidence to newer versions.
