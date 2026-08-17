---
title: Diplomacy — быстрый справочник
description: Текущая граница evidence для diplomacy, wars, alliances и интеграции Political World.
---

**Статус:** Partial/Observed. WBML 0.2–0.6 не доказал существование общего «safe diplomacy API».

Сводный baseline увидел `DiplomacyManager` в game assembly и Harmony ownership/interception Political World вокруг `DiplomacyManager.startWar` на протестированном stack. Это полезный compatibility evidence, но **не** разрешение безопасно вызывать любые war/alliance mutation methods.

Atlas 0.2 каталогизирует diplomacy-related types/members/relations; mutation candidates остаются evidence/queue до отдельного safe mutation/lifecycle recipe.

Для текущих модов:

- если задачу покрывает documented public PoliticalWorldAPI action/event, предпочитай этот публичный слой;
- не mass-invoke методы только потому, что они называются `startWar`, `removeAlliance`, `clear` и т.п.;
- war/alliance lifecycle и cross-mod ownership требуют последующих WBML фаз.

**research-needed:** high-level diplomacy wrapper в будущем WorldBox Modding API запланирован после WBML 1.0, но сейчас не существует.

[Automatic API Atlas](../../research/wbml-0200-automatic-api-atlas/) · [Political World Event Bus](../../api/politicalworld-event-bus/) · [План общего API](../../guides/worldbox-modding-api-roadmap/)
