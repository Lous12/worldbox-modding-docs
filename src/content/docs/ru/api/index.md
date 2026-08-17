---
title: Подробный API и справочник
description: Source-of-truth runtime reference WorldBox, NeoModLoader и Political World с явными evidence scopes.
---

Этот раздел нужен, когда требуется **техническая истина, а не самый короткий ответ**: signatures, runtime owner/provenance, access, sample result, stability, argument semantics, lifecycle caveats и evidence links.

Если нужен быстрый ответ — начни с [Quick Docs](../quick/). Если нужен сам эксперимент — открой [Research](../research/).

## WorldBox runtime — canonical WBML 0.2–1.0

- [WBML evidence model](./evidence-model/)
- [Runtime capability atlases](./runtime-capability-atlas/)
- [Parameterized Query Atlas](./runtime-parameterized-queries/)
- [Safe Mutation Atlas](./runtime-safe-mutations/)
- [Entity Lifecycle Atlas](./runtime-entity-lifecycle/)
- [Persistence & Identity](./runtime-persistence-identity/)
- [Game integration / Harmony / NML](./runtime-game-integration/)
- [Frozen current-runtime baseline](./runtime-frozen-baseline/)
- [Actor](./runtime-actor/)
- [City](./runtime-city/)
- [Kingdom](./runtime-kingdom/)
- [Building](./runtime-building/)
- [WorldTile](./runtime-worldtile/)

Полный canonical JSON публикуется в `/worldbox-modding-docs/data/wbml/` для exhaustive lookup.

## PoliticalWorldAPI

- [Регистрация addon](./politicalworld-addon-registration/)
- [Addon-private данные Kingdom](./politicalworld-addon-private-data/)
- [Party-private данные](./politicalworld-party-private-data/)
- [Event Bus](./politicalworld-event-bus/)
- [Actions, Conditions и Effects](./politicalworld-actions-conditions-effects/)

## Существующие WorldBox baseline pages

- [SaveManager lifecycle](./savemanager-lifecycle/)
- [MapBox / worldgen](./mapbox-worldgen/)
- [WorldTile.Height](./worldtile-height/)
- [WorldTile runtime](./worldtile-runtime/)

Version labels — часть утверждения. Reflection-verified internal member — evidence, а не автоматически stable public SDK surface.
