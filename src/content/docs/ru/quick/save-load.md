---
title: Save / Load — Quick Docs
description: Практические save/load identity и persistence rules из frozen WBML baseline.
---

**Статус:** VERIFIED на WorldBox 0.51.2 build 719 / NML 1.2.0.1 в exact tested scopes.

Observed callable paths:

```text
SaveManager.saveToCurrentPath()
SaveManager.loadWorld()
```

Главный результат 0.7 — identity: после reload entity может сохранить logical ID, но получить новую CLR reference. Building сделал это во всех трёх tested cycles; Actor — в двух из трёх. City и Kingdom в этом run reuse references.

**Через load сохраняй IDs/durable data, затем заново resolve live objects. Не требуй object-reference equality.**

Selected `renown` probes Actor/City/Kingdom показали exact saved persistence, unsaved rollback и cleanup restoration. Это не доказывает serialization каждого field/property.

[Полные persistence details](../../api/runtime-persistence-identity/) · [WBML 0.7 evidence](../../research/wbml-0700-persistence-identity/)
