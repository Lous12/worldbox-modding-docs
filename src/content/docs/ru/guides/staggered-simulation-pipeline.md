---
title: Разносите тяжёлую симуляцию по кадрам
description: Паттерн производительности из реального runtime pipeline Political World.
---

<span class="doc-status">✅ Source verified</span>
<span class="doc-status">🧭 Performance pattern</span>
<span class="doc-status">Political World 1.7.0</span>

Раньше Political World мог выполнять сразу много тяжёлых политических систем внутри одного периодического tick.

В текущем исходнике порядок систем сохраняется, но сами стадии разносятся по последовательным rendered frames.

## Зачем

Если одиннадцать дорогих систем выполняются в одном кадре раз в несколько секунд, средний FPS может выглядеть нормальным, но игрок всё равно будет видеть периодический фриз.

Проблема — **концентрация frame time**.

Вместо:

```text
раз в 12 секунд:
    ideology
    migrations
    movements
    parties
    crises
    governments
    political systems
    elections
    leadership
    war diplomacy
    international blocs
    rare events
```

используется pipeline stage.

## Текущий порядок pipeline

В проверенном исходнике за один шаг выполняется одна стадия:

```text
0  UpdateIdeologySystem()
1  UpdateIdeologyFrameworkMigrations()
2  UpdatePoliticalMovements()
3  UpdatePoliticalParties()
4  UpdatePoliticalCrises()
5  UpdateGovernmentForms()
6  UpdatePoliticalSystems()
7  UpdateElections()
8  UpdateGovernmentLeadership()
9  UpdateWarDiplomacyFoundation()
10 UpdateInternationalBlocs()
11 Evaluate rare political events
```

После стадии 11 pipeline снова переходит в idle до следующего политического цикла.

## Упрощённый паттерн

```csharp
private int _stage = -1;

void Update()
{
    if (ShouldStartHeavyCycle() && _stage < 0)
        _stage = 0;

    RunOneStage();
}

void RunOneStage()
{
    if (_stage < 0)
        return;

    switch (_stage)
    {
        case 0:
            UpdateSystemA();
            break;
        case 1:
            UpdateSystemB();
            break;
        case 2:
            UpdateSystemC();
            break;
    }

    _stage++;

    if (_stage > 2)
        _stage = -1;
}
```

## Разным системам — разная частота

Тот же `Update()` Political World отдельно планирует другие задачи.

В проверенном исходнике есть:

- native UI scan через `Time.unscaledTime`;
- дипломатические sequence с ограниченной частотой;
- отдельный интервал саммитов;
- проверки правителей;
- economy ticks;
- stability ticks;
- staged political pipeline.

Не каждой системе нужна одна и та же частота.

## Иногда 10 Hz достаточно

Комментарий в исходнике объясняет, что часть дипломатических процессов измеряется секундами, а не кадрами, поэтому обновление около 10 Hz визуально не отличается от per-frame polling, но снижает пустую работу на мониторах с высокой частотой обновления.

Если состояние меняется в масштабе секунд, 144–240 проверок в секунду часто ничего не дают игроку.

## Осторожно с pause/time

`Time.time` и `Time.unscaledTime` ведут себя по-разному и должны выбираться осознанно.

В Political World `unscaledTime` применяется для некоторых UI scan/cache задач, которым нужно оставаться отзывчивыми независимо от simulation timing, а симуляция имеет собственное расписание.

Не копируйте один clock во все системы, не понимая, что должно происходить на паузе.

## Когда паттерн полезен

Staged pipeline подходит, если:

- системы должны выполняться в известном порядке;
- допустимо выполнить следующую стадию на следующем кадре;
- объединённая работа создаёт периодический spike;
- не требуется, чтобы все результаты появились атомарно в одном rendered frame.

## Когда он не подходит

Не разделяйте вычисление, если дальнейшая логика **в этом же кадре** обязана получить результаты всех предыдущих стадий.

Pipeline добавляет небольшое временное расстояние между стадиями. Это архитектурный tradeoff.

## Общий вывод

Оптимизируйте не только общий CPU time, но и **распределение frame time**.

20 мс работы одним куском раз в 10 секунд могут ощущаться хуже, чем тот же объём, разбитый на несколько маленьких стадий.
