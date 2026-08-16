---
title: Справочник API
description: Справочник WorldBox, NeoModLoader и Political World с версиями, evidence labels, примерами и ограничениями.
---

Этот раздел нужен, когда ты уже понимаешь, **какая подсистема нужна**, и хочешь увидеть public API, поведение runtime, ограничения и примеры.

Если ты совсем новичок, сначала открой [Getting Started](../getting-started/), затем [проверенную runtime-базу PoliticalWorldAPI](../guides/politicalworldapi-runtime-baseline/).

## PoliticalWorldAPI

- [Регистрация аддона](./politicalworld-addon-registration/)
- [Addon-private данные королевства](./politicalworld-addon-private-data/)
- [Party-private данные](./politicalworld-party-private-data/) — runtime persistence/lifecycle из WBML-0003
- [Event Bus](./politicalworld-event-bus/) — runtime dispatch из WBML-0004
- [Actions, Conditions и Effects](./politicalworld-actions-conditions-effects/) — creator-stack из WBML-0005

## WorldBox

- [WorldTile.Height](./worldtile-height/) — terrain height, проверенный TerraForge probe

## Как читать API-страницу

Сначала смотри status badges. На одной странице могут одновременно быть source-backed структура и более новое runtime evidence. Версия — часть утверждения.

Если ветка не проверена, документация должна так и сказать, а не угадывать.
