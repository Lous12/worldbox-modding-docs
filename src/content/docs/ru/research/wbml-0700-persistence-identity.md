---
title: WBML 0.7.0 — Persistence & Identity Mega Atlas
description: Canonical evidence по save/load identity, замене references, owner provenance и scalar persistence.
---

**Canonical probe:** `0.7.0` · **run:** `26b9fe649e5c` · **результат:** `CLOSED PASS` — 49/0/0.

## Что доказано

Выполнены три programmatic save/load цикла с прямыми reload signals. Actor, City, Kingdom и Building после каждого reload заново разрешались через закреплённые manager/owner sources.

| Domain | Поведение reference | ID | Owner relation |
|---|---|---|---|
| Actor | новая reference с тем же ID в циклах 1 и 3; reuse в цикле 2 | сохранён | City сохранён |
| City | reuse во всех 3 циклах | сохранён | Kingdom сохранён |
| Kingdom | reuse во всех 3 циклах | сохранён | n/a |
| Building | новая reference с тем же ID во всех 3 циклах | сохранён | City сохранён |

Практическое правило: **сохраняй ID/данные и после load заново resolve живой объект. Не рассчитывай на сохранение CLR reference identity.**

Три low-risk `renown` probe подтвердили rollback/persistence: unsaved markers исчезли после reload, saved markers сохранились точно, cleanup вернул исходные значения. Impossible ID дал 4/4 miss; safe reads старых references — 0 failures.

## Граница

Точный mix reused/replaced references version-bound. То, что старую reference можно безопасно читать в tested window, не делает её preferred handle после load.

Machine data: `/worldbox-modding-docs/data/wbml/0700-persistence-identity-atlas.json`.
