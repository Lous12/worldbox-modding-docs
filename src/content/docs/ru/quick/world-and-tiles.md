---
title: World и WorldTile — быстрый справочник
description: Проверенные WorldTile reads и version-bound правила мира/карты из WBML baseline.
---

**Статус:** WorldTile read surface Verified на протестированном baseline; для worldgen/save lifecycle есть отдельный evidence в 0.1 baseline.

WBML 0.3.0 проверил representative `WorldTile` reads из `MapBox.tiles_map[]`:

```csharp
int height = tile.Height;
TileTypeBase type = tile.Type;
int id = tile.tile_id;
City city = tile.zone_city;
int units = tile.countUnits();
BiomeAsset biome = tile.getBiome();
bool hasBuilding = tile.hasBuilding();
bool hasCity = tile.hasCity();
```

У tested sample были `Height=210`, `tile_id=0`, `hasCity=true`, `hasBuilding=false`; это не глобальные константы. `getColor()` успешно вызвался, но изменился в stability window — один snapshot цвета нельзя считать стабильным состоянием мира.

Сводный baseline 0.1 также подтвердил протестированный `MapBox.generateNewMap()` completion path через `finishMakingWorld` + live collections/stability, без требования смены object references.

Для будущего Fog of War / exploration всё ещё нужны отдельные исследования map visibility, camera и rendering. Нельзя выдумывать per-kingdom fog API из текущего evidence.

[Полные детали WorldTile](../../api/runtime-worldtile/) · [Capability atlas](../../api/runtime-capability-atlas/) · [World-map baseline](../../research/world-map-baseline/)
