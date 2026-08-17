---
title: Building — быстрый справочник
description: Проверенные Building reads и bounded registration window после kill().
---

**Статус:** Verified read surface. `Building.kill()` **не** подтверждён как немедленное manager/owner removal.

WBML 0.3.0 подтвердил на `BuildingManager.dict{value}`:

```csharp
int residents = building.countResidents();
City city = building.getCity();
float existence = building.getExistenceTime();
bool hasResidents = building.hasResidents();
bool abandoned = building.isAbandoned();
```

### `kill()` не значит «объект уже исчез»

В WBML 0.6.0-fix5:

```text
Building.kill()
→ 30 frames наблюдения
→ всё ещё в BuildingManager F:dict
→ всё ещё в City F:buildings
→ registry key всё ещё есть
→ game exception = 0
```

Статус: `VERIFIED-NONTERMINAL-WINDOW`.

Доказано только bounded window. Мы не утверждаем вечное хранение и пока не знаем точный последующий cleanup trigger. Код, которому нужно «точно удалён из registries», не должен считать `kill()` мгновенной гарантией.

И нельзя заменять его direct `BuildingManager.destroyObject()` — ранний generic manager-destruction harness уже приводил к corruption runtime.

[Полные детали Building](../../api/runtime-building/) · [Lifecycle](../../api/runtime-entity-lifecycle/) · [WBML 0.6](../../research/wbml-0600-entity-lifecycle-atlas/)
