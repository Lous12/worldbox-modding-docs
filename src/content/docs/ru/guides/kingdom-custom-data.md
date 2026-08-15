---
title: Пользовательские данные через Kingdom.data
description: Как Political World читает и пишет int/string данные государства и что ещё требует отдельного save/load теста.
---

<span class="doc-status">✅ Source verified access pattern</span>
<span class="doc-status">🧪 Save/load semantics требуют отдельной проверки</span>

Political World использует `Kingdom.data` для чтения и записи собственных значений, связанных с государством.

Общий helper находится в:

```text
Core/Persistence/KingdomData.Helpers.cs
```

## Паттерн для integer

В исходнике используются:

```csharp
kingdom.data.get(key, out value, fallback);
kingdom.data.set(key, value);
```

внутри wrappers, которые сначала проверяют:

```csharp
kingdom == null || kingdom.data == null
```

и безопасно возвращают fallback при ошибке доступа.

Упрощённый вариант:

```csharp
static int GetKingdomInt(
    Kingdom kingdom,
    string key,
    int fallback)
{
    if (kingdom == null || kingdom.data == null)
        return fallback;

    int value = fallback;

    try
    {
        kingdom.data.get(key, out value, fallback);
    }
    catch
    {
        value = fallback;
    }

    return value;
}
```

## Паттерн для string

Для строк используется тот же принцип:

```csharp
kingdom.data.get(key, out value, fallback);
kingdom.data.set(key, value ?? "");
```

## Зачем нужен единый helper layer

Он даёт одно место для:

- null handling;
- fallback behavior;
- exception behavior;
- naming ключей;
- будущих migrations;
- политики логирования.

И не заставляет повторять raw `kingdom.data` по всему проекту.

## Делайте ключи namespaced

Для данных аддона не стоит использовать слишком общие ключи:

```text
level
state
enabled
```

Лучше стабильные namespaced IDs, например:

```text
com.example.myaddon.level
com.example.myaddon.enabled
```

Конкретный формат может быть другим. Важно не столкнуться ключами с другим модом.

## Что эта страница пока НЕ доказывает

Модуль находится в `Persistence`, а архитектура Political World описывает его как save helpers.

Но мы **не заявляем, что каждый произвольный тип и каждый edge case уже заново проверен через полный save → exit → reload round trip**.

Для нового мода/типа данных нужен отдельный persistence probe:

```text
1. записать известное значение;
2. сохранить мир;
3. полностью выйти/перезапустить при необходимости;
4. загрузить save;
5. прочитать тот же key;
6. сравнить value и type;
7. при необходимости проверить уничтожение/пересоздание kingdom.
```

Разделение намеренное:

- **Verified:** Political World действительно использует `Kingdom.data.get/set` через эти helpers.
- **Пока не универсально Verified:** все save/load edge cases для любых собственных значений.

## Migration важнее красоты

После того как key попал в публичные сохранения, его переименование — уже не простой refactor.

Относитесь к data keys как к compatibility surface. Если имя нужно менять — нужен migration path.
