---
title: WBML 0.5.0 — Safe Mutation Atlas
description: Controlled reversible scalar mutations и mutation/lifecycle census без mass-invoke неизвестных writes.
---

**Финальный статус:** `CLOSED PASS`  
**Canonical probe:** `0.5.0`  
**Run:** `00d01039f05e`  
**Final matrix:** `34 PASS / 0 FAIL / 0 SKIP`, P–F PASS.

## Вопрос исследования

Можно ли доказать узкий набор state mutations, не превращая «mutation atlas» в опасный mass-invoker?

## Transaction methodology

Eligible только explicitly selected low-risk scalar members. Каждая transaction:

```text
snapshot → one write → exact readback/delta → immediate restore → residual check
```

Property setter дополнительно требовал safe getter и trivial setter IL (one `stfld`, no calls) либо эквивалентный explicit low-risk proof.

## Canonical result

```text
mutation methods        5,943
destructive methods       729
lifecycle methods          377
setter methods             299
research queue           7,049
records                     19
attempted                   19
VERIFIED-REVERSIBLE         19
OBSERVED-THREW               0
restore failed               0
unexpected collateral        0
residual mutation            0
unsafe auto-invoked           0
engine exceptions             0
```

Coverage: ActorData 8, CityData 6, KingdomData 5.

## Важная граница

7,049 queued methods — не «safe mutation API». Unknown `set/add/remove/create/spawn/destroy/kill/save/load` намеренно не batch-invoke. Их исследуют lifecycle/disposable-world этапы.

## Reporting artifact

В canonical JSON `timing_ms.export=0`, потому что timing собственного export сериализуется до завершения write. Final Player.log наблюдал 59 ms. Это self-measurement limitation, а не failure.

Machine data: `/worldbox-modding-docs/data/wbml/0500-safe-mutation-atlas.json`  
Evidence: `/worldbox-modding-docs/evidence/wbml-0500-result.txt`

[Detailed safe mutations](../../api/runtime-safe-mutations/) · [Quick Actor](../../quick/actors/) · [Дальше: WBML 0.6](../wbml-0600-entity-lifecycle-atlas/)
