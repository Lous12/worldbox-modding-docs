---
title: WorldTile.Height
description: Подтверждённое хранилище высоты рельефа с WBML caveats для reload/worldgen.
---

<span class="doc-status">✅ Verified storage path</span>
<span class="doc-status">👁 На lifecycle value может normalize/recompute</span>

`WorldTile.Height` — подтверждённое terrain-height storage на baseline 0.51.2. То же значение доступно через `WorldTile.data.height`; `tile.health` высотой не является.

WBML-0029 показал важную границу: после настоящего save/reload Height может normalize/recompute. В исходном прогоне было `before=1`, marker `2`, `after=0`, хотя lifecycle load завершился. Поэтому exact Height equality нельзя использовать как единственный reload proof.

Правильнее: lifecycle signal + исчезновение marker + live collections + stability.

Verified: WorldBox 0.51.2 build 719 / NML 1.2.0.1. Числовые диапазоны height — состояние конкретного мира, не universal constants.
