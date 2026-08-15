---
title: Political World — content, который переживает отсутствующий перевод
description: Как literal text, runtime localization, NML locales и English fallback дают graceful degradation.
---

<span class="doc-status">✅ Source verified design</span>
<span class="doc-status">🌐 Graceful degradation</span>

Частая проблема addon:

```text
нет locale key → пустое имя / ugly error / unusable UI
```

Creator layer API 1.9 специально допускает неполную localization.

## Цель прямо из source

Комментарии creator API:

```text
localization must be optional
English/default text must remain readable on any game language
```

## Layered strategy

Addon definition может иметь сразу:

```text
NameKey
DisplayName
DescriptionKey
Description
```

То есть creator может сразу выпустить читаемый default text, а полноценные locale packs добавить позже.

## Resolution

Пользователь с переводом получает:

```text
native/current-language translation
```

При отсутствии перевода:

```text
registered English/default
```

затем:

```text
literal DisplayName/Description
```

и в крайнем случае:

```text
stable key
```

Один missing translation не обязан делать content пустым.

## English/default — fallback, а не forced language

Source добавляет English/default в current locale только если localization manager ещё не имеет значения для key.

Настоящий current-language translation имеет приоритет.

## Registry живёт даже при LM failure

Political World сначала хранит registered translation в собственном registry, а потом пытается интегрироваться с NML localization.

Если NML call падает, `ResolveLocalization(...)` всё равно может использовать собственные registered values API.

Это graceful degradation между integration layers.

## Что fallback не решает

Он не гарантирует:

- качество перевода;
- достаточную ширину UI;
- plural rules;
- grammar;
- right-to-left layout;
- font coverage.

Он только делает failure mode намного лучше, чем «нет текста».

## Вывод для общей документации

Нужно документировать оба вопроса:

```text
Как сделать полноценную localization?
```

и:

```text
Что произойдёт, если localization неполная?
```

Именно второй вопрос чаще встречает обычный пользователь.
