---
title: Safe Mutation Atlas
description: The exact 19 reversible scalar mutation transactions verified by WBML 0.5.0 and the boundary around untested mutations.
---

Canonical probe: **`0.5.0`**, run `00d01039f05e`.

## Contract

Every promoted transaction used:

```text
snapshot
→ ONE controlled scalar write
→ exact delta readback
→ immediate restore
→ post-restore snapshot
→ residual_fields = 0
```

The suite did **not** mass-invoke unknown `set/add/remove/create/spawn/change/destroy/kill/save/load` methods.

## Results

- 19 targets resolved / 19 transactions attempted / 19 `VERIFIED-REVERSIBLE`
- 0 throws
- 0 restore failures
- 0 unexpected collateral changes
- 0 residual mutations
- 0 unsafe auto-invocations
- 0 engine exceptions

### ActorData — 8

`money`, `experience`, `renown`, `kills`, `food_consumed`, `births`, `pollen`, `loot`.

### CityData — 6

`total_food_consumed`, `total_leaders`, `renown`, `total_births`, `total_deaths`, `total_kills`.

### KingdomData — 5

`total_kings`, `renown`, `total_births`, `total_deaths`, `total_kills`.

A representative record for `ActorData.money` proved one-field change and exact restore. The record also stores the setter/getter structural proof used to allow the transaction.

## Mutation census is not permission

The same run catalogued:

- 5,943 mutation methods
- 729 destructive methods
- 377 lifecycle methods
- 299 setters
- 7,049 queued mutation/lifecycle candidates

Those queue entries are **not Verified mutation APIs**. They remain future research targets.

Timing caveat: the JSON contains `timing_ms.export=0` because export self-timing is serialized before the file write completes; `Player.log` measured 59 ms. This is a reporting artifact, not a mutation failure.

Machine data: `/worldbox-modding-docs/data/wbml/0500-safe-mutation-atlas.json`.

[Quick Actor](../../quick/actors/) · [Quick City](../../quick/cities/) · [Quick Kingdom](../../quick/kingdoms/) · [WBML 0.5 research](../../research/wbml-0500-safe-mutation-atlas/)
