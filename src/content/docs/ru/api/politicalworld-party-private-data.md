---
title: Party-private данные аддона в PoliticalWorldAPI
description: Типизированное состояние аддона для конкретной партии с runtime-проверкой persistence и lifecycle в WBML-0003.
---

<span class="doc-status">✅ Runtime verified — выполненные ветки</span>
<span class="doc-status">WBML-0003</span>
<span class="doc-status">API runtime 1.14.0</span>

Party-private data позволяет аддону хранить собственные значения у **стабильного ID партии Political World** и не превращать их в общий межмодовый протокол.

Для новичка схема такая:

```text
королевство
└─ party ID
   └─ ID твоего аддона
      └─ локальный ключ → значение
```

## Типизированный public API

В изученном creator-source API 1.9 есть:

```csharp
GetPartyInt(...)    / SetPartyInt(...)
GetPartyString(...) / SetPartyString(...)
GetPartyBool(...)   / SetPartyBool(...)
GetPartyFloat(...)  / SetPartyFloat(...)
```

В каждом вызове участвуют:

```text
Kingdom
addonId
partyId
key
value или fallback
```

Runtime, который проверял WBML, был новее — API **1.14.0**. Версию изученных исходников и версию runtime нельзя смешивать.

## Минимальный пример

```csharp
const string AddonId = "Example.PartyAddon";
const string Key = "conference_count";

bool written = PoliticalWorldAPI.SetPartyInt(
    kingdom,
    AddonId,
    party.Id,
    Key,
    3
);

int count = PoliticalWorldAPI.GetPartyInt(
    kingdom,
    AddonId,
    party.Id,
    Key,
    0
);
```

Для сохранений используй стабильный `party.Id`, а не позицию партии в списке.

## Если партии с таким ID нет

WBML-0003 специально проверил несуществующий party ID.

Runtime API 1.14.0 дал:

```text
GetPartyInt    → переданный fallback
GetPartyString → переданный fallback
GetPartyBool   → переданный fallback
GetPartyFloat  → переданный fallback

SetPartyInt    → false
SetPartyString → false
SetPartyBool   → false
SetPartyFloat  → false
```

То есть несуществующая партия не получает «фантомные» данные через setter.

## Persistence после полного перезапуска WorldBox

WBML-0003 полностью закрыл процесс WorldBox, запустил игру заново, загрузил сейв и снова нашёл ту же партию.

Без повторной записи вернулись:

```text
party int
party Unicode string
party bool
party float
```

Именно поэтому для протестированного стека эта ветка теперь имеет статус runtime Verified, а не просто «так выглядит по исходникам».

## Что происходит с данными деактивированной партии

В creator API есть lifecycle-операции для получения партий, включая неактивные, деактивации и реактивации.

WBML-0003 выбрал **активную, не правящую партию**, затем выполнил:

```text
запись int/string/bool/float
→ deactivate
→ партия видна как active=False
→ чтение всех четырёх значений
→ reactivate
→ active=True восстановлен
```

Все выполненные assertions прошли.

Практический вывод:

> Деактивация не стерла протестированные party-private данные.

Поэтому inactive-партию нельзя автоматически считать удалённой.

## Как это устроено в изученном source

Исходник составляет party-local ключ из party ID и локального ключа, а затем использует addon-private kingdom storage.

Концептуально:

```text
addon namespace
    ↓
party ID + local key
    ↓
kingdom addon-private storage
```

Это описание реализации, а не инструкция вручную собирать внутренние save-ключи. Для обычного аддона граница совместимости — публичные методы API.

## Непроверенная ветка: изоляция party A от party B

Финал WBML-0003:

```text
PASS=119
FAIL=0
SKIP=1
SUITE RESULT: PARTIAL PASS
```

Единственный SKIP относится к same-kingdom party-to-party isolation: в нужной фазе тестового мира не было второй подходящей партии.

Поэтому статус точный:

```text
✅ party typed persistence после restart — verified
✅ данные во время inactive — verified
✅ fallback/rejection для missing party — verified
🧪 изоляция party A от party B в одном kingdom — пока не доказана WBML-0003
```

## Частые ошибки новичка

### Использовать отображаемое имя вместо ID

Имя может измениться. Для persistence нужен стабильный party ID.

### Считать inactive равным deleted

В WBML-0003 неактивная партия оставалась доступной и сохраняла протестированные данные.

### Игнорировать `bool` от setter

Если запись важна, проверяй возвращаемое значение.

### Самому собирать внутренние storage keys

Не надо. Реализация может измениться, public API и существует как граница совместимости.

## Доказательства

- [Исследование WBML-0003](../../research/persistence-lifecycle-suite/)
- [Санитизированный результат WBML-0003](/worldbox-modding-docs/evidence/wbml-0003-result.txt)
