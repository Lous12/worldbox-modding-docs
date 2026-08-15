---
title: Custom world becomes only ocean
description: A real TerraForge failure where the custom generator armed correctly but no custom heightmap was ever written.
---

<span class="doc-status">✅ Reproduced failure</span>
<span class="doc-status">WorldBox 0.51.2</span>

## Symptom

A custom **New World** preset starts generation successfully, but the generated map is essentially all ocean.

The UI works. The preset click is detected. No obvious crash occurs.

## TerraForge cause

TerraForge 0.0.16 expected its custom terrain pass to run when WorldBox performed the first Height / Perlin stage.

In the tested generation route, that callback never happened.

The log showed:

- TerraForge preset click detected;
- generation began;
- runtime map dimensions were available;
- WorldBox proceeded toward tile generation;
- **zero expected Height / Perlin passes were observed**;
- TerraForge handed control back without ever writing its custom heightmap.

The result was ocean.

## Why this bug was deceptive

Most of the surrounding system was working:

- custom UI injection;
- preset activation;
- map creation;
- runtime dimension detection;
- WorldBox's later biome/resource pipeline.

The failure was only one missing assumption:

> the callback we expected to receive was not guaranteed to run on that generation route.

## Fix used in TerraForge 0.0.17

TerraForge added a direct pre-tile fallback:

1. prefer the normal Height / Perlin route when it exists;
2. if WorldBox reaches tile conversion with zero custom height passes;
3. locate the active runtime `WorldTile[,]`;
4. write the TerraForge heightmap directly to `WorldTile.Height`;
5. let vanilla tile conversion, biomes, vegetation, and resources continue.

The next test produced actual custom land instead of an all-ocean world.

## Debugging checklist

When a custom generator creates only ocean, verify separately:

1. Did the preset activate?
2. Did your generation handler actually execute?
3. Did it receive the real runtime map dimensions?
4. Did it write to the real terrain height storage?
5. Did the expected vanilla callback actually occur?
6. Did tile conversion run after your write?

Do not treat “no exception” as proof that your generation pass executed.
