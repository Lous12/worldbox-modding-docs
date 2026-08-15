---
title: Stable IDs — это данные, а не branding
description: Почему save identifiers должны переживать смену namespace, author identity и структуры проекта.
---

<span class="doc-status">✅ Реальная migration policy Political World</span>
<span class="doc-status">💾 Compatibility</span>

Political World сменил публичную identity на:

```text
Lous12.PoliticalWorld
```

но специально оставил многие исторические IDs:

```text
ukiol_
```

Почему?

Persistent IDs — это **data compatibility**, а не branding.

## Реальный migration example

Документ 1.6 → 1.7 говорит addon developers обновить:

```text
old dependency / namespace → new public identity
```

но отдельно предупреждает:

```text
не переименовывать старые ukiol_* content/save IDs
```

Internal identity doc объясняет: gameplay assets, localization keys, traits, powers, ideology IDs, currents, map IDs и saved values уже использовали эти strings.

Смена публичного имени автора не делает save references одноразовыми.

## Разделяйте три identity

### Project/dependency identity

```text
Lous12.PoliticalWorld
```

Используется mod loader и addons.

### C# namespace

```csharp
Lous12.PoliticalWorld
```

Используется source code.

### Persistent gameplay/save IDs

```text
ukiol_...
```

Исторические strings, которые уже могут жить в saves.

У всех трёх разные migration rules.

## Новые IDs используют новый namespace

Legacy compatibility не означает, что новые addons должны копировать old prefix.

Новый addon:

```text
someauthor.DragonPolitics
```

Owned content:

```text
someauthor.DragonPolitics.ideology_dragonism
```

## Checklist перед rename

Перед переименованием спросите:

```text
Может ли string уже быть в старом save?
Может ли другой mod хранить/reference её?
Может ли она быть в player configuration?
Может ли участвовать в localization/content registry links?
Является ли частью external API?
```

Если хотя бы да — вероятно нужна migration.

## Copy-forward migration

Для data keys безопасный pattern:

```text
read new
if missing:
    read old
    if old exists:
        write new = old
        keep old
return value
```

Именно так работает addon-data v2 migration Political World для legacy int/string state.

Сохранение old data на migration window полезно для rollback и mixed-version recovery.

## Общее правило

Refactor меняет organization source.

Migration меняет identity данных.

Это не одна и та же операция.
