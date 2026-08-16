---
title: WBML-0005 — replacement semantics и cleanup, который сам изменил данные
description: Как неверное ожидание duplicate и опасный finalizer дали ложные failures до безопасного финального suite.
---

<span class="doc-status">✅ Runtime lesson</span>
<span class="doc-status">WBML-0005</span>

WBML-0005 дал два особенно полезных урока.

## 1. "Duplicate" оказался replacement

Первый harness ожидал, что второй `RegisterAction` с тем же ID вернёт false.

API 1.14.0 принял вызов и заменил definition. Так как replacement не содержал старую category и condition, несколько следующих assertions тоже упали.

Это были не четыре независимые поломки API, а одна неверная предпосылка, которая испортила состояние.

Исправленный suite проверил replacement и сразу восстановил canonical definition.

## 2. Cleanup тоже умеет ломать мир

Phase D правильно увидел одну active party и пропустил dangerous support mutation.

Но старый FINAL всё ещё сравнивал live support с snapshot из Phase A и вызвал setter ради «восстановления». Именно finalizer нормализовал support в 100.

Безопасное правило оказалось простым:

```text
если тест support не менял
→ cleanup support тоже не трогает
```

## Урок

Нужно искать причинный failure. Одна ошибка setup/cleanup способна породить много красных assertions ниже по цепочке.
