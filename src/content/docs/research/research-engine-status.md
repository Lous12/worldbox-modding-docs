---
title: Research Engine v2.1.1 status
description: What the WBML Research Engine can automate today and what remains for later versions.
---

<span class="doc-status">✅ Validated infrastructure</span>

Research Engine is not the goal of WBML by itself. It exists so thousands of WorldBox types/members can be investigated without hand-writing every probe.

## Validated capabilities

- type discovery and reflection inspection;
- live object discovery with Unity-liveness-aware fallback patterns;
- safe field/property reading without mass-invoking arbitrary methods;
- stability classification;
- relationship verification;
- static/reflection evidence combined with runtime verification;
- reusable PASS / FAIL / SKIP / OBSERVED assertions and gates;
- machine-readable JSON plus Markdown reports.

These capabilities were used across City, Actor, relationships, map services, lifecycle and later torture suites.

## Not complete yet

- generic declarative suite configuration;
- multi-suite batch orchestration;
- automatic baseline diff engine;
- full documentation generation from raw probe output;
- Error Doctor / automatic repair reasoning.

The next engine work should reduce manual harness code **because the documentation project needs much broader capability mapping**, not because the engine is a separate end product.
