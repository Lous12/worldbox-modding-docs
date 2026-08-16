---
title: SaveManager lifecycle — tested signatures
description: Русская версия: Version-bound save/load signatures and safe reload proof from WBML-0029/0030.
---

<span class="doc-status">✅ Runtime verified on 0.51.2</span>
<span class="doc-status">👁 Signature version-bound</span>

WBML вызвал `SaveManager.saveToCurrentPath() -> SavedMap` и `SaveManager.loadWorld() -> void`. Это observation конкретной версии, а не обещание stable public API. Нельзя угадывать slot/path/args других overloads. Reload proof = lifecycle signal + исчезновение marker + live collections + stability; exact Height equality не требуется.
