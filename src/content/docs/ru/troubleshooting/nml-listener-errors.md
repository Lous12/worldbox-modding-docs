---
title: Ошибка создания listener в NeoModLoader
description: Что доказывает строка Failed to construct listener instance, а что — нет.
---

# Ошибка создания listener в NeoModLoader

Строка вида:

```text
[NML]: Failed to construct listener instance of ...
```

означает, что NeoModLoader попытался создать listener этого типа, но конструкция не удалась.

## Что проверять

- Сохрани полное имя listener type.
- Определи, относится ли он к твоему моду, самому NML или другому моду.
- Посмотри exception рядом с этим местом лога.
- Не обвиняй свой мод автоматически, если type принадлежит другой assembly.
- При необходимости повтори тест на минимальном наборе модов.

Одна такая строка не доказывает, что вся event-система NML сломана.
