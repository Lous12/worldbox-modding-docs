---
title: PoliticalWorldAPI Actions, Conditions и Effects
description: Runtime-проверенная creator-цепочка от регистрации action до conditions, execution, effects и unregister.
---

<span class="doc-status">✅ Runtime verified — выполненные ветки</span>
<span class="doc-status">WBML-0005</span>
<span class="doc-status">PoliticalWorldAPI 1.14.0</span>

PoliticalWorldAPI позволяет аддону регистрировать политические действия, у которых есть:

```text
metadata
+ optional condition
+ handler/effect
```

Для новичка поток такой:

```text
RegisterAction
→ CanExecuteAction
→ ExecuteAction / TryExecuteAction
→ condition решает, можно ли запускать handler
→ handler/effects меняют состояние
```

WBML-0005 проверял всю эту цепочку как единую подсистему.

## `ActionDefinition`

В изученном creator-source есть поля типа:

```csharp
Id
Category
NameKey
DescriptionKey
DisplayName
Description
Icon
SortOrder
KingdomCondition Condition
KingdomAction Handler
```

Изученный source старее runtime. WBML проверял API 1.14.0.

## Минимальный пример

```csharp
private const string AddonId = "Example.Actions";
private const string ActionId = AddonId + ".increase_counter";

PoliticalWorldAPI.RegisterAction(
    AddonId,
    new PoliticalWorldAPI.ActionDefinition
    {
        Id = ActionId,
        Category = "example",
        DisplayName = "Increase counter",
        Condition = kingdom => kingdom != null,
        Handler = kingdom =>
        {
            int value = PoliticalWorldAPI.GetKingdomInt(
                kingdom, AddonId, "counter", 0);

            PoliticalWorldAPI.SetKingdomInt(
                kingdom, AddonId, "counter", value + 1);
        }
    }
);
```

ID action должен принадлежать namespace твоего аддона.

## Validation, проверенный WBML-0005

Runtime API 1.14.0:

```text
PW303 — чужой/unowned action ID → invalid
PW304 — нет Handler            → invalid
PW305 — нет DisplayName/NameKey → warning, definition всё ещё valid
```

Warning о читаемом имени — не то же самое, что блокирующая registration error.

## Важное правило runtime: тот же ID заменяет action

Первый harness ожидал, что второй `RegisterAction` с тем же ID будет отклонён как duplicate.

Но API 1.14.0 сделал:

```text
первая definition зарегистрирована
→ второй RegisterAction с тем же ID вернул true
→ GetAction показал вторую definition
→ metadata/condition старой definition были заменены
```

После этого Lab снова зарегистрировал canonical definition и проверил, что она восстановилась.

Для протестированного runtime это replacement/upsert semantics.

Практический риск: если случайно повторить ID, можно заменить собственный handler или condition вместо ожидаемой ошибки duplicate.

## Queries и `ActionInfo.Enabled`

WBML проверил:

```text
GetAction
GetActionsByAddon
GetActionsByCategory
GetAddonContentSummary
```

До cleanup canonical-набор содержал три action.

`ActionInfo.Enabled` менялся динамически после изменения данных, от которых зависела condition.

## Combinator conditions

На runtime 1.14.0 проверено:

```text
All(true, null, true)  → true
All(true, false, true) → false
Any(false, null, true) → true
Any(empty)             → true
Not(false)             → true
Not(null)              → true
```

Особенно не стоит угадывать поведение `Any(empty)` и `Not(null)` — теперь оно записано как runtime-факт для этого стека.

## Conditions по политическому состоянию

На текущем target kingdom прошли:

```text
GovernmentIs
IdeologyIs
CurrentIs
PoliticalSystemIs
StabilityAtLeast
StabilityAtMost
```

Это проверка helpers, а не утверждение, что конкретные ID тестового мира являются универсальными.

## Conditions по данным аддона

WBML записал собственные значения и проверил:

```text
AddonIntAtLeast
AddonIntAtMost
AddonBoolIs
KingdomHasAddonTag
```

Так можно делать actions, доступные только при нужном состоянии твоего аддона.

## Party conditions

Выполненные ветки:

```text
PartySupportAtLeast
HasRulingParty
HasActivePartyIdeology
```

Перед support-проверкой исправленный probe заново получил `PartyInfo` по стабильному ID. Старый info-объект не надо считать вечно актуальным.

## `CanExecuteAction`, `ExecuteAction`, `TryExecuteAction`

Для false condition:

```text
CanExecuteAction → false
ExecuteAction    → false
handler calls    → 0
TryExecuteAction → Success=false
Code             → action-condition-failed
```

Для true condition:

```text
CanExecuteAction → true
ExecuteAction    → true
side effect      → выполнен
TryExecuteAction → Success=true
Code             → ok
```

Проверенные error codes:

```text
missing action → action-not-found
null kingdom   → invalid-kingdom
disabled       → action-condition-failed
success        → ok
```

## `Effects.Sequence`

Lab собрал последовательность:

```text
SetAddonInt(counter, 10)
null
ChangeAddonInt(counter, +7)
SetAddonBool(flag, true)
AddAddonTag(tag)
```

После action:

```text
counter = 17
flag = true
tag present
```

## Проверенные effect helpers

Прошли:

```text
SetAddonInt
ChangeAddonInt
SetAddonBool
AddAddonTag
RemoveAddonTag
ChangeStability
SetStability
SetPartyRadicalism
```

Stability и radicalism менялись всего на ±1 и сразу восстанавливались.

## Party support — особая опасность

В раннем WBML-0005 у target kingdom была только одна активная партия. Попытка выставить ей support ниже 100 привела к:

```text
100
```

Попытка вернуть прежнее меньшее значение тем же setter снова дала 100.

Поэтому `fix4` вообще не выполняет точную mutation support, если нет государства минимум с двумя активными партиями.

Статус:

```text
👁 Observed: single-active-party path нормализует единственную партию до 100
🧪 Не проверено: точная mutation/restoration при >=2 активных партиях
```

Нельзя документировать `SetPartySupport` как «всегда ставит ровно переданный процент».

## Unregister

WBML проверил:

```text
UnregisterAction(existing) → true
GetAction afterwards       → null
CanExecuteAction           → false
ExecuteAction              → false
второй UnregisterAction    → false
TryExecuteAction           → action-not-found
```

Live owner query после cleanup дал `count=0`.

## Caveat diagnostics

Сразу после live query `count=0` diagnostics всё ещё показал:

```text
Registered actions: 2
```

после истории repeated same-ID replacement.

Статус — **👁 Observed bookkeeping mismatch**. Это не доказательство, что два action реально остались зарегистрированы: live query был пустым.

## Финал WBML-0005

```text
PASS=90
FAIL=0
SKIP=3
A=PASS B=PASS C=PASS D=PASS
SUITE RESULT: PARTIAL PASS
```

Три SKIP относятся только к точной ветке party-support mutation/restoration, которую безопасно не запускали в однопартийном состоянии.

## Чеклист новичка

1. Сначала зарегистрируй аддон.
2. ID action держи внутри namespace аддона.
3. Handler обязателен.
4. Добавь читаемое имя.
5. Не думай, что повтор того же ID обязательно даст ошибку.
6. Проверяй результат выполнения, если failure важен.
7. Для политического состояния перечитывай live data.
8. Любые временные mutation обязаны безопасно восстанавливаться.
9. С party support особенно осторожно в single-party state.

## Доказательства

- [Исследование WBML-0005](../research/actions-conditions-effects-suite/)
- [Санитизированный результат WBML-0005](/worldbox-modding-docs/evidence/wbml-0005-result.txt)
