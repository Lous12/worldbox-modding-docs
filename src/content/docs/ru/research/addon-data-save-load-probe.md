---
title: Addon Data Save/Load Probe
description: План runtime experiment для проверки PoliticalWorldAPI kingdom/party state через реальные WorldBox saves.
---

<span class="doc-status">🧪 Experimental plan</span>
<span class="doc-status">Research needed</span>

Source inspection подтверждает, **как** Political World пишет и читает addon-private values.

Остаётся проверить реальный runtime persistence через save lifecycle WorldBox.

Probe не получает Verified до фактического запуска.

## Research question

Для target:

```text
WorldBox 0.51.2 build 719
NeoModLoader 1.2.0.1
Political World installed build under test
```

переживают ли значения:

```text
save
→ exit/reload
→ load world
```

без corruption?

## Test values

Берём хорошо различимые значения:

```text
int    = 170031
string = "PW_SAVE_PROBE_Ж_ß_世界"
bool   = true
float  = 1234.5678f
```

Tags:

```text
private kingdom tag = "save_probe_private"
shared kingdom tag  = "save_probe_shared"
```

Если есть stable party:

```text
party int    = 98765
party string = "PW_PARTY_SAVE_PROBE"
party bool   = true
party float  = -42.125f
```

## Phase 1 — baseline

1. Register probe addon.
2. Выбрать kingdom.
3. Записать identity/name и world year.
4. Записать все values **только через public PoliticalWorldAPI**.
5. Сразу прочитать.
6. Log expected/actual.
7. Записать stable party ID, если тестируем parties.

Expected:

```text
all immediate reads match
```

## Phase 2 — normal save/load

1. Save world.
2. Вернуться в menu.
3. Load same world.
4. Resolve same kingdom.
5. Read all values.
6. Resolve same party ID и read party values.

Каждое поле:

```text
PASS
FAIL
MISSING
TYPE/PARSE ERROR
```

## Phase 3 — full restart

Повторить после полного закрытия и запуска WorldBox.

Так мы отличим настоящий persistence от state, случайно оставшегося в static/runtime memory.

## Phase 4 — смена языка

Float сериализуется через `InvariantCulture`:

1. write float на одном game language;
2. save;
3. switch language;
4. reload;
5. read float.

Expected:

```text
same numeric value
```

## Phase 5 — world switch isolation

1. Create/load второй world.
2. Убедиться, что probe state не приехал из static dictionaries.
3. Вернуться в original save.
4. Проверить original values.

## Phase 6 — legacy migration fixture

Если безопасно подготовим controlled API 1.1 legacy value:

1. записать только old-format key;
2. убедиться, что v2 отсутствует;
3. вызвать current public getter;
4. проверить returned value;
5. убедиться, что появилась v2 copy;
6. проверить, что legacy key сохранился.

Эта фаза может потребовать dev-only helper: обычный addon не должен строить internal keys.

## Что сохраняем как evidence

```text
Player.log
Political World version/API runtime report
WorldBox build
NML version
world/save identifier
test kingdom name/ID
test party ID
expected/actual values
result table
```

## Promotion rule

Только после успешного probe общая документация получает:

```text
✅ Verified persistence on WorldBox X / NML Y / Political World Z
```

До этого:

```text
✅ source access pattern
🧪 persistence runtime verification pending
```

Это намеренное разделение evidence.
