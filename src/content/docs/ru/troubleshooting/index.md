---
title: Починить проблему
description: Начни с симптома, проверь лог и только потом выбирай теорию о причине.
---

# Починить проблему

Не начинай отладку с «наверное API сломан». Начни с того, что ты реально можешь наблюдать.

<div class="trouble-entry-grid">
  <a class="trouble-entry primary" href="./wizard/"><span>🧭</span><strong>Открыть помощник</strong><p>Выбери симптом и получи самый короткий полезный маршрут.</p></a>
  <a class="trouble-entry" href="../workbench/log-analyzer/"><span>📄</span><strong>Разобрать Player.log</strong><p>Вытащи версии, загруженные моды и известные сигнатуры ошибок локально.</p></a>
  <a class="trouble-entry" href="./stack-overflow-recursive-initialization/"><span>♻️</span><strong>StackOverflow / recursion</strong><p>Узнай повторяющийся цикл вызовов и не попади в recursive initialization.</p></a>
</div>

## Полезный порядок отладки

1. Докажи, загрузился ли мод вообще.
2. Найди первую конкретную ошибку или отсутствующий callback.
3. Уменьши тест до одной механики.
4. Запусти снова и получи свежий лог.
5. Только потом решай, проблема в NML, WorldBox, PoliticalWorldAPI или твоём коде.

Раздел troubleshooting специально строится на доказательствах. Если мы ещё не воспроизводили конкретную проблему, документация должна так и сказать, а не придумывать уверенный фикс.
