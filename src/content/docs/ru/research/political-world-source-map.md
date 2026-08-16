---
title: Карта исходников Political World
description: Карта модулей Political World и границ ответственности, составленная по реальному исходному коду.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">Political World 1.7.0</span>
<span class="doc-status">GitHub snapshot ce0c917</span>

Эта страница описывает **реальную структуру репозитория** Political World, а не запланированную архитектуру.

Проверенный snapshot ветки `main` имеет tree SHA:

```text
ce0c91754722dd1e88e8eaf116c4c667ae020204
```

## Публичная граница

Поддерживаемая граница для сторонних аддонов:

```csharp
Lous12.PoliticalWorld.PoliticalWorldAPI
```

Архитектура проекта прямо считает `Main`, `ScenarioBridge`, приватные методы partial-класса и reflection во внутренние модули деталями реализации, а не поддерживаемым API для аддонов.

Направление зависимостей задумано так:

```text
WorldBox / NeoModLoader
        ↓
Political World runtime modules
        ↓
PoliticalWorldAPI
        ↓
Third-party addons
```

## Карта runtime-модулей

| Путь | Ответственность |
| --- | --- |
| `API/` | Публичный facade, Event Bus, diagnostics, government registry, rare political events. |
| `Core/Configuration/` | Legacy identifiers, настройки и общее runtime-state. |
| `Core/Runtime/` | Bootstrap NeoModLoader и поэтапный simulation pipeline. |
| `Core/Integration/WorldBox/` | Особенно чувствительная к версии интеграция WorldBox/Harmony. |
| `Core/Persistence/` | Общие helpers для данных государств. |
| `Core/Events/` | Мост Political World → WorldLog. |
| `Politics/` | Governments, ideologies, parties, elections, leadership, councils, crises и stability. |
| `International/` | Блоки, синхронизация с vanilla Alliance и саммиты. |
| `Warfare/` | Интеграция войны и дипломатии. |
| `Map/` | State, rendering и patches Political Map. |
| `UI/` | Kingdom politics UI, окна и sandbox powers. |

## Entry-класс намеренно почти пустой

`src/PoliticalWorld/Main.cs` содержит только entry partial-класс NeoModLoader:

```csharp
public partial class Main : BasicMod<Main>
{
}
```

Настоящая runtime-реализация разнесена по специализированным partial-модулям.

Большой мод не обязан превращать `Main.cs` в файл на десятки тысяч строк.

## Важные области исходника

### Runtime

```text
Core/Runtime/PoliticalWorld.BootstrapAndPipeline.cs
```

Здесь находятся `OnModLoad()`, проверка совместимости, центральный `Update()`, таймеры подсистем и поэтапный political simulation pipeline.

### Интеграция WorldBox / Harmony

```text
Core/Integration/WorldBox/PoliticalWorld.HarmonyPatches.cs
```

Здесь находится version-sensitive установка patches, fallback-имена методов, фильтрация overload и диагностика ошибок patching.

### Data helpers

```text
Core/Persistence/KingdomData.Helpers.cs
```

Оборачивает `kingdom.data.get(...)` и `kingdom.data.set(...)` в null-safe typed helpers.

### API

```text
API/PoliticalWorldAPI.cs
API/PoliticalWorldAPI.Creator.cs
API/Events/
API/Governments/
API/Diagnostics/
```

Public API является границей между большой внутренней симуляцией и сторонними аддонами.

### Политические системы

```text
Politics/Governments/
Politics/Ideologies/
Politics/Parties/
Politics/Elections/
Politics/Leadership/
Politics/Councils/
Politics/Crises/
Politics/Stability/
```

### Международная политика и войны

```text
International/Blocs/
International/Summits/
Warfare/
```

### UI и Political Map

```text
UI/KingdomPolitics/
UI/Windows/
UI/Sandbox/
Map/PoliticalMap/
```

## Производительность видна прямо в архитектуре

Political World не превращает каждую систему в отдельный постоянный `Update()`.

Архитектура рекомендует aggregate/event-driven state, редкие проверки и staggered work. В текущем исходнике один центральный mod `Update()` планирует разные задачи с разной частотой.

Тяжёлый политический цикл дополнительно разбит по последовательным rendered frames вместо выполнения всех политических систем за один кадр.

См.: [Разносите тяжёлую симуляцию по кадрам](../guides/staggered-simulation-pipeline/).

## Legacy IDs, чувствительные к совместимости

GUID проекта:

```text
Lous12.PoliticalWorld
```

но старые gameplay/save identifiers с префиксом `ukiol_*` специально сохранены.

Массовое переименование «ради красоты» может внезапно стать проблемой миграции сохранений.

## Правило документации, которое мы получили

При разборе большого мода нельзя сводить весь код к утверждению:

> «Political World — один класс, который обновляет политику».

Нужно отдельно описывать:

1. entry/bootstrap;
2. domain systems;
3. WorldBox integration;
4. persistence/data;
5. public API;
6. UI;
7. performance/lifecycle;
8. compatibility-sensitive identifiers.

Так и человеку, и ИИ намного проще понимать архитектуру без галлюцинаций.
