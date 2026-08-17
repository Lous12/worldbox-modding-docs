---
title: Save / Load — быстрый справочник
description: Version-bound правила SaveManager из сводного WBML baseline и текущего read atlas.
---

**Статус:** На baseline 0.51.2 есть протестированные save/reload paths, но 0.7.0 всё ещё должен глубже исследовать ID/reference/persistence integration.

Сводный WBML 0.1 безопасно вызвал наблюдавшиеся no-arg signatures:

```text
SaveManager.saveToCurrentPath()
SaveManager.loadWorld()
```

Это version-bound observations. Нельзя угадывать slot/path overloads или физические пути сохранений.

WBML 0.3.0 также подтвердил read-only helpers:

```csharp
int currentSlot = SaveManager.getCurrentSlot();
bool loadingAnimation = SaveManager.isLoadingSaveAnimationActive();
```

Для данных addon Political World используй документированные public storage APIs, а не реконструируй internal raw save keys.

**research-needed:** stale/reused object identity `Actor`/`City`/`Kingdom` при non-empty save/reload registries остаётся известным gap и входит в направление 0.7.0.

[Подробный SaveManager lifecycle](../../api/savemanager-lifecycle/) · [Save/reload baseline](../../research/save-reload-lifecycle-baseline/) · [Статусы evidence](../evidence-statuses/)
