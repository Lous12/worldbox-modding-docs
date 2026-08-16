---
title: WBML-0004 — когда runtime не совпадает с картой из исходников
description: Event Bus case study о version drift, payload mapping и harness, который сам отфильтровал события.
---

<span class="doc-status">✅ Runtime lesson</span>
<span class="doc-status">WBML-0004</span>

Source API 1.9 помог построить тест, но runtime был API 1.14.0 и не обязан был совпадать во всех деталях.

Runtime вернул 23 event ID, принял custom/unknown subscription и у `party.renamed` положил имена в `OldValue/NewValue`.

## Самая неприятная ошибка harness

Даже после этого `fix1` всё ещё фильтровал recursion/stress только через `NewName`.

Runtime присылал значение в `NewValue`, поэтому **сам тест** отбрасывал все Phase C callbacks.

Неправильный вывод был бы: «Event Bus сломан».

Правильный: «сломался наш фильтр».

После fix2 recursion guard дал 16 callback из 64 requested, а stress — 100/100.

## Урок

При конфликте runtime и ожидания сначала логируй raw payload, потом исправляй disproved assumption harness и только после повторного прогона делай вывод об API.
