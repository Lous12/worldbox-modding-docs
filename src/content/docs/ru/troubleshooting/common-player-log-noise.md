---
title: Шум в Player.log, который может быть нефатальным
description: Сетевые, TLS, fallback-library и localization строки, которые нельзя объявлять причиной краша без контекста.
---

# Шум в `Player.log`, который может быть нефатальным

Некоторые страшные строки встречаются даже рядом с нормально загружающимися модами.

В наших research-логах встречались:

```text
Curl error ...
UnityTls error ...
Fallback handler could not load library ...
Missing translation for ...
```

## Правило

Не объявляй громкую строку root cause только потому, что она находится рядом с тестом.

Проверь:

```text
продолжилась ли после неё компиляция/загрузка?
есть ли позже exception/compiler error из твоего кода?
встречается ли эта же строка в заведомо рабочем прогоне?
```

Поэтому Analyzer показывает network/library паттерны как **информационные**.

Missing translation может быть важен для качества UI/localization: см. [localization fallback](../../guides/addon-localization-fallback/).
