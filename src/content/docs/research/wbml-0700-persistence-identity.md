---
title: WBML 0.7.0 — Persistence & Identity Mega Atlas
description: Canonical save/load identity, reference replacement, owner provenance and scalar persistence evidence.
---

**Canonical probe:** `0.7.0` · **run:** `26b9fe649e5c` · **result:** `CLOSED PASS` — 49/0/0.

## What it proved

Three programmatic save/load cycles were completed with direct reload signals. Actor, City, Kingdom and Building were re-resolved from pinned manager/owner sources after every cycle.

| Domain | Tested reference behavior | ID | Owner relation |
|---|---|---|---|
| Actor | replaced with same ID in cycles 1 and 3; reused in cycle 2 | preserved | City preserved |
| City | reused in all 3 cycles | preserved | Kingdom preserved |
| Kingdom | reused in all 3 cycles | preserved | n/a |
| Building | replaced with same ID in all 3 cycles | preserved | City preserved |

This is the practical rule: **persist IDs/data, then re-resolve live objects after load. Do not require CLR reference identity to survive reload.**

Three low-risk `renown` probes also established rollback/persistence behavior: unsaved markers cleared on reload, saved markers persisted exactly, and the cleanup cycle restored the original values. Impossible IDs missed 4/4 and old-reference safe reads produced 0 failures.

## Boundary

The exact mix of reused vs replaced references is version-bound. Safe reads on an old reference do not make that old reference the preferred post-load handle.

Machine data: `/worldbox-modding-docs/data/wbml/0700-persistence-identity-atlas.json`.
