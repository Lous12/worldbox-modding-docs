---
title: Runtime persistence & identity
description: Save/load identity и persistence rules из WBML 0.7.0.
---

Canonical source: WBML 0.7.0, run `26b9fe649e5c`.

## Практический контракт

После save/load **stable logical ID и stable CLR reference — разные свойства**. В tested world Actor и Building могли resolve в новую reference с тем же ID, а City/Kingdom могли reuse текущую reference. Поэтому сохраняй ID/durable data и после load заново resolve живые entities.

Pinned manager/owner sources оставались пригодны в tested cycles; owner relationships сохранились. Missing IDs дали miss, а не ложный live match.

Selected `renown` у Actor/City/Kingdom показал unsaved rollback и exact saved persistence. Это evidence только для этих exact data members, не blanket serialization guarantee.

[Research evidence](../../research/wbml-0700-persistence-identity/)
