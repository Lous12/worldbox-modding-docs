---
title: WBML 0.4.0 — Parameterized Query Atlas
description: Canonical parameterized read-query verification после semantic argument provenance corrections в 0.4.0-fix2.
---

**Финальный статус:** `CLOSED PASS`  
**Canonical probe:** `0.4.0-fix2`  
**Run:** `7d17ef55149e`  
**Final matrix:** `34 PASS / 0 FAIL / 0 SKIP`, P–F PASS.

## Вопрос исследования

Можно ли безопасно перейти от zero-arg reads к 1–4 parameters и не перепутать «тот же runtime type» с «та же semantic domain»?

## Canonical result

```text
methods scanned             18,625
parameterized non-void       4,291
records                      1,803
blocked                      3,818
dangerous blocked              945
unsupported blocked          1,543
IL-safe                        473
owner resolved                 382
argument sets built            326
argument unresolved             56
observed args used              284
synthetic args used             187
weak observed rejected          223
collection keys observed      1,280
collection elements observed    586
invoked                        326
VERIFIED                       315
OBSERVED-THREW                  11
public VERIFIED                245
reflection VERIFIED             70
unsafe/stale invoked            0/0
stability                 308 same / 7 changed / 0 failed
engine exceptions                0
```

## Rejected methodology: initial 0.4

Первый run использовал реальные runtime values, но без semantic relevance: `plate_kingdom` мог стать building ID, Tooltip index — index другой sprite collection, unrelated zero — positive spacing.

Успешные `False`/`0` на nonsense argument — false-useful evidence, поэтому green run отвергнут.

## Rejected methodology: fix1

Semantic scoring стал лучше, но generic strings всё ещё пересекали domains: color string → building ID, `"The Old"` → player option, `textureID` → zone ID.

## Canonical fix2

`fix2` harvest actual bounded dictionary keys/collection elements non-stale owner, сохраняет provenance каждого source, предпочитает owner-domain evidence и оставляет ambiguous string unresolved вместо догадки.

Control examples стали `bonfire`, `type_bonfire`, `human`, zone key `0`, `order_docks_0`.

## `OBSERVED-THREW`

11 throws сохранены с exact argument provenance и exception. Это observation exact argument set, а не «метод сломан».

Machine data: `/worldbox-modding-docs/data/wbml/0400-parameterized-query-atlas.json`  
Evidence: `/worldbox-modding-docs/evidence/wbml-0400-result.txt`

[Detailed parameterized reference](../../api/runtime-parameterized-queries/) · [Quick City](../../quick/cities/) · [Дальше: WBML 0.5](../wbml-0500-safe-mutation-atlas/)
