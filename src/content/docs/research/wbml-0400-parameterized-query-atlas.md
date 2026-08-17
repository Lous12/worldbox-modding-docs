---
title: WBML 0.4.0 — Parameterized Query Atlas
description: Canonical parameterized read-query verification after semantic argument provenance corrections in 0.4.0-fix2.
---

**Final status:** `CLOSED PASS`  
**Canonical probe:** `0.4.0-fix2`  
**Run:** `7d17ef55149e`  
**Final matrix:** `34 PASS / 0 FAIL / 0 SKIP`, P–F PASS.

## Research question

Can WBML safely move beyond zero-argument reads by synthesizing or resolving 1–4 parameters without confusing “same runtime type” with “same semantic domain”? 

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

The first run used real runtime values but did not require semantic relevance. It could pass `NameplateAsset.id="plate_kingdom"` to a building-ID method, use a `TooltipAsset` index against an unrelated 8-sprite collection, or feed zero from an unrelated field into positive spacing.

A successful `False`/`0` under a nonsense argument is false-useful evidence, so the structurally green run was rejected.

## Rejected methodology: fix1

`fix1` added semantic scoring and rejected many weak values, but generic strings still leaked across domains: a color string could become a building ID, `"The Old"` a player option name, and `textureID` a zone ID.

## Canonical fix2

`fix2` harvests actual bounded dictionary keys/collection elements from non-stale runtime owners, keeps provenance per source, prefers owner-domain evidence, and leaves ambiguous strings unresolved rather than guessing.

Control examples moved from nonsense to real domain evidence: `bonfire`, `type_bonfire`, `human`, zone key `0`, and `order_docks_0`.

## `OBSERVED-THREW`

The 11 throws are retained exactly with their argument provenance and exception. They are observations for those exact argument sets, not a declaration that the method itself is broken.

Machine data: `/worldbox-modding-docs/data/wbml/0400-parameterized-query-atlas.json`  
Evidence: `/worldbox-modding-docs/evidence/wbml-0400-result.txt`

[Detailed parameterized reference](../../api/runtime-parameterized-queries/) · [Quick City](../../quick/cities/) · [Next: WBML 0.5](../wbml-0500-safe-mutation-atlas/)
