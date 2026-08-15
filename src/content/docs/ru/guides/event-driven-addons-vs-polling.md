---
title: Event-driven аддоны вместо постоянного polling
description: Когда использовать Event Bus и Rare Event registry Political World вместо ещё одного Update loop.
---

<span class="doc-status">✅ Source-backed architecture pattern</span>
<span class="doc-status">⚡ Performance</span>

Одна из целей Public API прямо записана в source comments Political World:

> common addon logic should be possible without polling or internal APIs.

Для этого есть два разных публичных паттерна.

## Паттерн A — реагировать на уже произошедшее изменение

Используйте Event Bus.

Например:

```text
Government меняется
        ↓
Political World emits kingdom.government.changed
        ↓
Callback вашего addon запускается один раз
```

Вам не нужен:

```csharp
void Update()
{
    foreach (Kingdom kingdom in everyKingdom)
    {
        // Не поменялось ли правительство с прошлого кадра?
    }
}
```

## Паттерн B — иногда проверять condition

Если механика подходит под редкое kingdom-level событие в масштабе лет, используйте Rare Political Event registry.

Проверенный registry выполняется из **уже существующего** political pipeline Political World.

Addon регистрирует:

```text
event ID
check interval in years
cooldown in years
chance per 1000
optional Condition callback
Handler callback
```

Собственный global `Update()` не нужен.

## Rare Event ограничен world year

Registry не делает полный evaluation больше одного раза за один и тот же world year.

Для каждой пары event/kingdom также учитываются:

- first-check behavior;
- `CheckIntervalYears`;
- `CooldownYears`;
- optional condition;
- `ChancePermille`.

## Callback failures изолированы

И condition, и handler обёрнуты защитой.

Падение addon callback записывается в diagnostics и не должно unwinding'ом пробить весь core pipeline.

## Сначала записать attempt, потом вызвать addon code

Перед rare-event handler registry сохраняет текущий год как last-fire year.

Почему порядок важен:

```text
handler throws
↓
last-fire не записан
↓
event снова eligible
↓
сломанный callback начинает спамить
```

Если attempt записан заранее, даже broken callback уважает cooldown.

Это полезный общий scheduler pattern.

## Manual execution отделён

Public API также предоставляет прямой запуск rare event для scenario/director tools.

Manual execution специально игнорирует random chance, check interval и existing cooldown, но продолжает проверять condition.

После попытки текущий год записывается, чтобы normal pipeline не запустил то же событие сразу ещё раз.

## Что выбирать

| Задача | Лучше использовать |
| --- | --- |
| Реакция на government/ideology/party transition | Event Bus |
| Редкое kingdom event раз в N лет | Rare Event registry |
| UI animation / frame interaction | Собственная UI/runtime logic |
| Реально frame-dependent mechanic | Возможно `Update()` |
| Каждый кадр сканировать все kingdoms только ради поиска transition | Обычно не надо |

## Цель не в запрете Update

`Update()` не запрещён.

Правило:

> Не создавайте permanent polling, если framework уже может сообщить об изменении или сам запланировать редкую проверку.

Один безобидный world scan от одного addon почти ничего не значит.

Десять-двадцать addons с одинаковым scan — уже другая история.
