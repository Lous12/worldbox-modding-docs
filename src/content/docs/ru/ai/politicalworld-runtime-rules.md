---
title: Runtime-правила Political World для ИИ
description: Жёсткие правила использования доказательств WBML-0001…0005 без расширения версий и непроверенных веток.
---

<span class="doc-status">🤖 AI rule set</span>
<span class="doc-status">WBML-0001…0005</span>

## 1. Не смешивать source и runtime

Изученный creator-source — API 1.9.0. Runtime-доказательства WBML — API 1.14.0.

Если они расходятся, нужно хранить оба факта с версиями, а не выбирать удобный.

## 2. PARTIAL PASS не отменяет выполненные PASS

При `FAIL=0, SKIP>0` выполненные ветки можно считать Verified в их scope. SKIP остаётся непроверенным.

## 3. Party-private persistence

Для точного стека можно утверждать, что WBML-0003 вернул party int/string/bool/float после полного restart и прочитал их во время inactive/reactivate lifecycle.

Нельзя утверждать, что WBML-0003 доказал party-to-party isolation.

## 4. Event Bus runtime 1.14.0

Можно утверждать, что в тесте:

- `GetEventIds()` вернул 23 ID;
- custom/unknown subscription был принят и удалён;
- `party.renamed` использовал `OldValue/NewValue` для тестовых имён;
- payload mutation одного callback не протекла в другой;
- exception одного callback не остановил healthy callback;
- recursion остановилась на 16;
- 100 accepted dispatch дали 100 callback.

Нельзя переносить `OldValue/NewValue` на payload всех событий.

## 5. Same-ID action

Для API 1.14.0 WBML-0005 показал replacement/upsert при повторном `RegisterAction` с тем же ID.

Не переносить это автоматически на будущие версии.

## 6. Перечитывать live state

Не считать старый `PartyInfo` вечным источником текущих значений. Если важен текущий support/active/ruling — сделать свежий public API lookup.

## 7. Single-party support

Нельзя писать, что `SetPartySupport` всегда ставит ровно requested value.

Доказательства:

```text
👁 single-active-party path в наблюдении нормализовал единственную партию до 100
🧪 exact multi-party mutation/restoration ещё не verified
```

## 8. Cleanup — часть эксперимента

Finalizer способен сам изменить состояние. Нельзя слепо «восстанавливать snapshot», если setter имеет state-dependent normalization.

## 9. Diagnostics counter не всегда равен live registry

WBML-0005 увидел live action count 0, а diagnostics — 2 после replacement history. Пока это только Observed bookkeeping mismatch.

## 10. Timing не является гарантией

33 ms на 100 dispatch из WBML-0004 — наблюдение одного запуска, не SLA.

## 11. Persistence использует стабильные ID

Не генерировать сохранения по display name, переводу или list index партии.

## 12. Если доказательства нет — сказать об этом

Правильный ответ ИИ:

```text
что не проверено
какой ближайший факт уже verified
какой probe нужен дальше
```

А не выдуманная сигнатура или поведение.
