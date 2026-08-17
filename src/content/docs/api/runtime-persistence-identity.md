---
title: Runtime persistence & identity
description: Save/load identity and persistence rules established by WBML 0.7.0.
---

Canonical source: WBML 0.7.0, run `26b9fe649e5c`.

## Practical contract

After save/load, **stable logical ID and stable CLR reference are different properties**. In the tested world, Actor and Building could resolve to a different reference with the same ID while City/Kingdom could reuse the existing reference. Therefore cache IDs or durable data and re-resolve live entities after load.

Pinned manager/owner sources remained usable in the tested cycles and owner relationships were preserved. Missing IDs returned misses rather than false live matches.

The selected Actor/City/Kingdom `renown` values demonstrated both unsaved rollback and exact saved persistence. That is evidence for those exact data members, not a blanket serialization guarantee for every field/property.

[Research evidence](../../research/wbml-0700-persistence-identity/)
