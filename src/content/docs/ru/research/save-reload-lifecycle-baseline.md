---
title: Save/reload lifecycle and stale-reference torture
description: Русская версия: WBML 0.0.29 evidence for safe SaveManager discovery, real reload proof, Height normalization and reference reuse.
---

<span class="doc-status">✅ Verified — 0.0.29-fix1: 26 / 0 / 0</span>

WBML безопасно обнаружил и вызвал version-bound signatures:

```text
SaveManager.saveToCurrentPath() -> SavedMap
SaveManager.loadWorld() -> void
```

Paths/slots/unknown args не угадывались.

Reload считался доказанным только по совокупности: `finishingUpLoading`, исчезновение marker, live `tiles_map/tiles_list` по 65 536 и 6 stable polls. `_load_counter 1→2` был дополнительным observation.

Оригинальный 0.0.29 реально перезагрузил мир, но `before=1 marker=2 after=0`; требование `after==before` дало ложный FAIL. `WorldTile.Height` может normalize/recompute на load. Поэтому точное равенство Height не является reload contract.

В fix1 old tile = `REUSED_CURRENT`, arrays/services/managers были теми же refs, old tile safe reads = 100/100. Это observation реализации, а не требование будущих версий. Entity-object stale/reuse для Kingdom/City/Actor остаётся UNKNOWN из-за пустых registries.
