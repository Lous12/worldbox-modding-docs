---
title: Localization addon с читаемыми fallback
description: Как Political World сохраняет читаемость addon content даже при отсутствии перевода.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🌐 Localization pattern</span>
<span class="doc-status">API source generation 1.9.0</span>

Creator API Political World строится вокруг правила:

> localization может быть optional, но её отсутствие не должно превращать addon content в нечитаемый мусор.

В source:

```csharp
public const string DefaultFallbackLanguage = "en";
```

## Три источника текста

Addon может использовать:

1. literal fallback fields вроде `DisplayName` / `Description`;
2. обычные locale files NeoModLoader;
3. runtime localization через PoliticalWorldAPI.

Способы можно комбинировать.

## Одна translation

```csharp
PoliticalWorldAPI.RegisterLocalization(
    AddonId,
    "ru",
    AddonId + ".technocracy.name",
    "Технократия"
);
```

Source требует:

- зарегистрированный addon;
- непустой language ID;
- непустые key/value;
- key принадлежит addon.

## Localization pack

```csharp
PoliticalWorldAPI.RegisterLocalizationPack(
    AddonId,
    "ru",
    new Dictionary<string, string>
    {
        [AddonId + ".technocracy.name"] = "Технократия",
        [AddonId + ".technocracy.description"] =
            "Власть технических специалистов."
    }
);
```

Также есть:

```csharp
PoliticalWorldAPI.RegisterEnglishLocalization(...)
```

для default fallback language.

## Ownership localization

API хранит owner каждого localization key.

Если key уже принадлежит другому addon, registration отклоняется, а diagnostics получает:

```text
PWDIAG190
```

Localization keys становятся частью общего collision-safe namespace.

## Интеграция с NML LM

После записи в собственный registry Political World пытается добавить translation в NeoModLoader localization manager:

```csharp
LM.Add(language, key, value)
```

Если language сейчас активен, значение добавляется и в current locale.

Если регистрируется English, а в текущем locale ещё нет значения, English/default может быть добавлен как читаемый fallback.

Даже если LM integration бросит exception, собственный Political World registry продолжает хранить translation, поэтому `ResolveLocalization(...)` всё ещё может её разрешить.

## Resolution order

Проверенный `ResolveLocalization(key, fallback)` фактически проходит:

```text
1. Political World translation для текущего language
2. NeoModLoader LM translation
3. Political World English/default translation
4. literal fallback argument
5. сам localization key
```

Последний пункт намеренный: стабильный raw key полезнее пустого label.

## Пример content definition

```csharp
new PoliticalWorldAPI.IdeologyDefinition
{
    Id = AddonId + ".technocracy",
    NameKey = AddonId + ".technocracy.name",
    DisplayName = "Technocracy",
    DescriptionKey = AddonId + ".technocracy.description",
    Description = "Government led by technical specialists."
}
```

Даже без русского перевода content остаётся читаемым через English/default literal.

## Seed fallback

При регистрации creator definitions Political World может автоматически положить `DisplayName` / `Description` в English fallback registry, если keys валидны и принадлежат addon.

Автор может сразу дать читаемый literal, а полноценный locale pack добавить позже.

## Что именно проверяется у language ID

В текущем source language ID только trim'ится и проверяется длина от 2 до 24 символов.

Эта страница **не утверждает**, что Political World сверяет language ID с фиксированным ISO list.

## UI всё равно надо тестировать

Readable fallback не гарантирует, что layout выдержит любой язык.

Нужны тесты:

- длинных translated labels;
- Cyrillic/Latin/CJK;
- wrapping/clipping;
- font support;
- dynamic-width UI.

## Общий вывод

Localization fallback должен быть **цепочкой разрешения**, а не:

```text
есть перевод / пустая строка
```

Хороший framework превращает неполный перевод в читаемый fallback, а не в сломанный UI.
