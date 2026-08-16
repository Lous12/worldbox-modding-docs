---
title: PoliticalWorldAPI Event Bus
description: Понятная новичку документация подписок Political World с runtime-доказательствами WBML-0004 и явной границей source/runtime.
---

<span class="doc-status">✅ Runtime verified — API 1.14.0</span>
<span class="doc-status">WBML-0004</span>
<span class="doc-status">⚠️ Изученный старый source: API 1.9.0</span>

Event Bus нужен, чтобы аддон реагировал на политические изменения **в момент события**, а не сканировал все государства каждый кадр.

Для новичка схема простая:

```text
Political World меняет состояние
        ↓
публикует event ID + payload
        ↓
вызывается callback твоего аддона
```

## Public surface

В creator API есть:

```csharp
PoliticalWorldAPI.GetEventIds()
PoliticalWorldAPI.Subscribe(addonId, eventId, handler)
PoliticalWorldAPI.Unsubscribe(addonId, eventId, handler)
PoliticalWorldAPI.UnsubscribeAll(addonId)
PoliticalWorldAPI.Events.All // wildcard "*"
```

Перед подпиской аддон должен быть зарегистрирован.

## Минимальный пример

```csharp
private const string AddonId = "Example.EventAddon";

PoliticalWorldAPI.Subscribe(
    AddonId,
    "party.renamed",
    OnPartyRenamed
);

private static void OnPartyRenamed(
    PoliticalWorldAPI.PoliticalEventData data)
{
    if (data == null)
        return;

    // Для проверенного runtime 1.14.0:
    string oldName = data.OldValue;
    string newName = data.NewValue;
}
```

Не считай, что все события используют одинаковые поля payload. Конкретный event ID должен иметь собственный документированный контракт.

## Runtime discovery: 23 event ID

В более старом изученном source API 1.9 список известных событий содержал 20 ID.

WBML-0004 вызвал `GetEventIds()` на установленном API 1.14.0 и получил:

```text
23 event ID
```

Также проверено, что возвращаемая коллекция защищена от внешней порчи: изменение первого результата не испортило следующий вызов.

## Source/runtime drift: неизвестный event ID

Старый source подсказывал, что unknown event должен отклоняться.

Runtime API 1.14.0 принял уникальный custom/unknown event ID WBML. После этого подписка нормально удалилась.

Поэтому нельзя писать в документации просто «unknown events запрещены» без версии.

## Null handler и duplicate subscription

WBML-0004 подтвердил:

```text
Subscribe(..., null) → rejected
повтор той же addon + event + handler подписки → duplicate rejected/ignored
```

Duplicate также появился в diagnostics.

## Exact и wildcard подписчики

Lab одновременно подписался на:

```text
party.renamed
*
```

Оба подписчика получили базовое тестовое rename-событие.

Если тебе нужен один тип событий, используй точный ID, а не wildcard без необходимости.

## Где лежат имена в `party.renamed` на runtime 1.14.0

Первый harness ожидал:

```text
OldName / NewName
```

Но протестированный runtime положил старое и новое имя в:

```text
OldValue / NewValue
```

а `OldName` / `NewName` были пустыми.

Это важный пример, почему runtime-доказательство сильнее старого предположения harness.

Не переноси это правило автоматически на другие event ID.

## Изоляция payload между callback

Первый callback специально изменял поля своего `PoliticalEventData`. Следующий callback эти изменения не увидел.

То есть для протестированной ветки каждый подписчик получил отдельный payload-объект.

Но если payload содержит ссылку на живой `Kingdom` или другой объект WorldBox, клонирование payload не делает сам объект игры immutable.

## Ошибка одного callback не ломает остальных

Один тестовый callback намеренно бросил исключение `WBML_INTENTIONAL_CALLBACK_EXCEPTION`.

Event Bus записал ошибку, но здоровый callback всё равно получил то же событие. Счётчик `CallbackErrors` в diagnostics увеличился.

Не используй исключения как способ остановить общий dispatch.

## Self-unsubscribe во время dispatch

WBML проверил callback, который отписывает сам себя во время обработки события.

Другой подписчик всё равно получил текущий dispatch, а дальнейшие события уже учитывали удаление. Также прошёл `UnsubscribeAll`.

## Защита от рекурсивного dispatch

Lab запросил цепочку до 64 рекурсивных rename-событий.

Получилось:

```text
requested: 64
recursive callbacks: 16
tail subscriber:     16
```

Runtime остановил рекурсию на 16. Это совпало с константой старого изученного source.

Но нормальный аддон не должен специально рассчитывать на эту границу — рекурсивный event-loop лучше не создавать вообще.

## Stress: 100 dispatch

Результат одного теста:

```text
writes:    100/100
callbacks: 100
time:      33 ms
```

100 callback — часть проверенного результата. 33 ms — только наблюдение одного окружения, а не обещание производительности.

## Что реально доказано WBML-0004

Для точного протестированного стека подтверждены discovery, exact/wildcard delivery, tested rename payload mapping, payload isolation, callback isolation, self-unsubscribe, `UnsubscribeAll`, recursion guard, 100-dispatch completion и финальная очистка подписок.

Не доказана полная схема payload всех 23 event ID и не установлен универсальный performance budget.

## Ошибки harness, которые нельзя забывать

Первый suite ошибочно сделал source-предположение «unknown event должен быть rejected» обязательным runtime-тестом.

Затем fix1 уже обнаружил `NewValue`, но recursive/stress handlers всё ещё фильтровали только `NewName`, поэтому сами отбрасывали все события. Этот прогон был признан ошибкой harness, а не «поломкой Event Bus».

`fix2` исправил фильтр и завершился 68 PASS / 0 FAIL / 0 SKIP.

```text
PASS=68 FAIL=0 SKIP=0
```

## Доказательства

- [WBML-0004 Event Bus Runtime Suite](../../research/event-bus-runtime-suite/)
- [Санитизированный результат WBML-0004](/worldbox-modding-docs/evidence/wbml-0004-result.txt)
