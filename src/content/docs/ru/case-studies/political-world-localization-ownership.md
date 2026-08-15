---
title: Political World — localization key как owned content
description: Почему runtime translations используют addon ownership вместо общей бесконтрольной string table.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🌐 Collision prevention</span>

Localization выглядит безобидно:

```text
key → translated string
```

Но в addon ecosystem key — глобальная identity.

Два addons с одинаковым generic key могут перезаписать или запутать данные друг друга.

## Подход Political World

`RegisterLocalization(...)` требует, чтобы key принадлежал зарегистрированному addon.

API дополнительно хранит:

```text
localization key → owner addon ID
```

Если другой addon уже владеет key, новая registration отклоняется, а framework записывает:

```text
PWDIAG190
```

## Плохие keys

```text
government.name
menu.title
description
```

Слишком легко получить collision.

## Лучше

```text
YourName.MyAddon.government.technocracy.name
YourName.MyAddon.action.reform.description
```

Сам key уже показывает ownership.

## Это относится не только к localization

Тот же принцип нужен для:

- actions;
- ideologies;
- governments;
- rare events;
- save-data keys;
- tags;
- UI routes;
- settings.

Если content имеет global address, ему нужна global-safe identity.

## Fallback не обходит ownership

Внутренний helper Political World может seed'ить English fallback из `DisplayName`/`Description`, но только если:

- addon зарегистрирован;
- localization key задан;
- fallback непустой;
- key принадлежит addon.

Convenience helper не должен отключать ownership rules.

## Вывод

Localization не стоит считать отдельной бесконтрольной таблицей.

Localization keys — часть public content namespace, поэтому им нужны:

- ownership;
- collision detection;
- stable naming;
- migration discipline;
- diagnostics.
