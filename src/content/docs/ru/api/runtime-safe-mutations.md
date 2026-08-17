---
title: Safe Mutation Atlas
description: Exact 19 reversible scalar mutation transactions из WBML 0.5.0 и граница untested mutations.
---

Canonical probe: **`0.5.0`**, run `00d01039f05e`.

## Contract

Каждая promoted transaction:

```text
snapshot
→ ОДНА controlled scalar write
→ exact delta readback
→ immediate restore
→ post-restore snapshot
→ residual_fields = 0
```

Suite **не** mass-invoke unknown `set/add/remove/create/spawn/change/destroy/kill/save/load` methods.

## Results

- 19 targets / 19 attempts / 19 `VERIFIED-REVERSIBLE`
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

Representative `ActorData.money` record доказал one-field change и exact restore; там же сохранён structural proof getter/setter.

## Mutation census — не разрешение

Тот же run нашёл 5,943 mutation methods, 729 destructive, 377 lifecycle, 299 setters и queue 7,049. Эти записи **не являются Verified mutation API** — это targets для будущего research.

Timing caveat: JSON имеет `timing_ms.export=0`, потому что self-timing export сериализуется до завершения собственной записи; `Player.log` измерил 59 ms. Это reporting artifact, не mutation failure.

Machine data: `/worldbox-modding-docs/data/wbml/0500-safe-mutation-atlas.json`.

[Quick Actor](../../quick/actors/) · [Quick City](../../quick/cities/) · [Quick Kingdom](../../quick/kingdoms/) · [WBML 0.5](../../research/wbml-0500-safe-mutation-atlas/)
