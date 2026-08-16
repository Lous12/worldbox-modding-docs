---
title: Починить проблему
description: Начни с симптома, проверь лог и только потом выбирай теорию о причине.
---

# Починить проблему

Не начинай с «наверное API сломан». Начни с того, что реально наблюдается.

<div class="trouble-entry-grid trouble-entry-grid-v2">
  <a class="trouble-entry primary" href="./wizard/"><span>FIX</span><strong>Открыть помощник</strong><p>Выбери симптом и получи самый короткий полезный маршрут.</p></a>
  <a class="trouble-entry" href="../workbench/log-analyzer/"><span>LOG</span><strong>Разобрать Player.log</strong><p>Вытащи версии, сгруппируй сигнатуры и сразу переходи в нужный гайд.</p></a>
  <a class="trouble-entry" href="./csharp-compile-errors/"><span>CS</span><strong>Ошибки компиляции C#</strong><p>Начни с первого `CSxxxx`, а не отлаживай runtime-код, который не собрался.</p></a>
  <a class="trouble-entry" href="./nullreferenceexception/"><span>NULL</span><strong>NullReferenceException</strong><p>Проверяй lifecycle и object assumptions вместо случайных null-check.</p></a>
  <a class="trouble-entry" href="./stack-overflow-recursive-initialization/"><span>LOOP</span><strong>StackOverflow / recursion</strong><p>Найди повторяющийся цикл вызовов и recursive initialization.</p></a>
  <a class="trouble-entry" href="./common-player-log-noise/"><span>INFO</span><strong>Шум в логе</strong><p>Не объявляй network/TLS/library строки root cause без контекста.</p></a>
</div>

## Полезный порядок

1. Докажи, загрузился ли мод.
2. Найди первый конкретный compile/runtime signal.
3. Перейди в самый узкий подходящий гайд.
4. Уменьши тест до одной механики и получи свежий лог.
5. Только потом решай, проблема в NML, WorldBox, PoliticalWorldAPI, другом моде или твоём коде.
