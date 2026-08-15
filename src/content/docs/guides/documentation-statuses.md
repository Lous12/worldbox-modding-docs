---
title: Documentation status system
description: How the project distinguishes verified facts, observations, experiments, inferences, failures, and outdated information.
---

<span class="doc-status">✅ Project methodology</span>

Every technical claim in this project should tell you **how certain we are that it is true** and **which WorldBox / NeoModLoader version it was tested on**.

## Statuses

| Status | Meaning |
| --- | --- |
| ✅ **Verified** | Reproduced in a real game build and confirmed by a runtime test, log, or working mod. |
| 👁 **Observed** | Seen at runtime or in logs, but the behavior is not fully understood yet. |
| 🧪 **Experimental** | Works in current tests, but the approach is still being researched or may be fragile. |
| ⚠️ **Inferred** | A conclusion based on evidence that has not yet been directly verified. |
| ❌ **Failed** | A tested approach that produced incorrect behavior, an exception, a crash, or another confirmed failure. |
| 🕒 **Outdated** | Information verified for an older WorldBox or NeoModLoader version and not yet re-tested. |

## Evidence matters

Whenever possible, a page records where a claim came from:

- runtime probe;
- `Player.log`;
- working test mod;
- source / assembly inspection;
- reproducible failure;
- user report.

A source being visible in an assembly does **not** automatically mean we understand its runtime behavior. A working probe is stronger evidence.

## Current research baseline

<div class="doc-meta">

**WorldBox:** 0.51.2 build 719  
**NeoModLoader:** 1.2.0.1

</div>

A result verified on this baseline is not automatically presented as verified on future game versions.

## Why failed approaches stay documented

TerraForge initially treated `WorldTile.health` as terrain height. That was wrong. A later runtime probe confirmed `WorldTile.Height` and `WorldTile.data.height` as the actual height storage on the tested build.

Deleting the failed path would remove useful debugging knowledge. We keep both:

1. what looked plausible;
2. what happened when tested;
3. how the failure appeared;
4. what finally worked.

## Rule for AI-assisted modding

If this documentation does not confirm an API or behavior, an AI assistant should **not invent it**.

The preferred response is:

1. mark the claim as unverified;
2. search the documented API/reference;
3. if still unknown, propose a minimal reflection or runtime probe;
4. promote the result to Verified only after evidence exists.
