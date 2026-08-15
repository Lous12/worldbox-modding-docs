---
title: Устойчивый к версиям поиск Harmony patch
description: Защитный паттерн Harmony patching из реальной WorldBox-интеграции Political World.
---

<span class="doc-status">✅ Source verified pattern</span>
<span class="doc-status">⚠️ Version-sensitive area</span>
<span class="doc-status">WorldBox 0.51.2 build 719</span>

Harmony позволяет менять поведение игры без замены целого метода, но patch имеет смысл только если мод нашёл **правильный метод и правильный overload** на установленной версии WorldBox.

Интеграция Political World использует несколько защитных приёмов вместо предположения, что одно имя метода будет вечным.

## 1. Изолируйте интеграцию с WorldBox

Political World держит эти patches в:

```text
Core/Integration/WorldBox/
```

Этот код специально считается compatibility-sensitive.

После обновления WorldBox можно отдельно проверить integration layer, не смешивая его с политической симуляцией.

## 2. Проверяйте несколько известных имён

Для multiplier максимальной армии города исходник проверяет:

```text
getArmyMaxMultiplier
getArmyMaxTotalPercentage
getArmyMaxPercentage
getArmyMaxTotalPercent
getArmyLimitPercentage
getArmyLimitPercent
```

Комментарий в исходнике указывает `getArmyMaxMultiplier` как реальный итоговый multiplier в WorldBox 0.51.2 build 719, а старые варианты оставлены fallback-именами.

Это устойчивее, чем слепое:

```csharp
AccessTools.Method(typeof(City), "oneNameForever");
```

без проверки результата.

## 3. Фильтруйте overload

Helper Political World перебирает методы и проверяет количество параметров.

Отдельный helper принимает ожидаемый parameter count, например для `City.getLoyalty`.

Зачем?

У двух методов может быть одинаковое имя, но разные signatures. Patch неправильного overload может упасть при загрузке или изменить вообще не тот код.

Для сложных случаев стоит дополнительно сравнивать **типы параметров** и return type.

## 4. Ошибка должна давать диагностику

Если army patch не установлен, Political World сканирует методы `City`, в имени которых есть `army`, и пишет в лог имя кандидата, число параметров и return type.

Вместо:

```text
"мод почему-то перестал работать"
```

мы получаем почти готовую подсказку:

```text
"ожидаемый метод исчез; вот похожие методы на этой версии"
```

Именно это нужно после обновления игры.

## 5. Дополнительный бонус не должен ломать vanilla

Несколько Postfix в Political World оборачивают дополнительное политическое поведение в `try/catch`.

Комментарии исходника прямо говорят: ошибка политического бонуса не должна ломать основной расчёт армии/статов WorldBox.

Полезное правило:

> Если patch добавляет необязательный modifier, лучше потерять modifier, чем сломать vanilla систему.

## Упрощённый helper

```csharp
static MethodInfo FindMethod(
    Type type,
    string[] candidateNames,
    int parameterCount)
{
    MethodInfo[] methods = type.GetMethods(MemberFlags);

    foreach (string name in candidateNames)
    {
        foreach (MethodInfo method in methods)
        {
            if (method.Name == name &&
                method.GetParameters().Length == parameterCount)
            {
                return method;
            }
        }
    }

    return null;
}
```

Перед `Harmony.Patch(...)` нужно явно залогировать отсутствие target.

## Важное ограничение

Fallback по именам не создаёт магическую совместимость.

Метод может сохранить имя, но изменить смысл.

После обновления игры всё равно нужны:

1. поиск target;
2. проверка signature;
3. runtime-тест поведения;
4. подтверждение логом;
5. проверка в игре.

Fallback лишь делает discovery и graceful failure лучше.

## Правило для ИИ

ИИ не должен выдумывать имя WorldBox-метода только потому, что оно звучит логично.

Если target не подтверждён документацией:

- inspect type;
- вывести кандидатов;
- проверить signature;
- выполнить минимальный patch/probe;
- только после этого считать target подтверждённым.
