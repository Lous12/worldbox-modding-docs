---
title: TerraForge — safe cloning of the New World preset UI
description: How an active vanilla UI clone caused Awake and tooltip failures, and the safer pattern that worked.
---

<span class="doc-status">✅ Reproduced</span>
<span class="doc-status">🧪 Case study</span>
<span class="doc-status">WorldBox 0.51.2</span>

TerraForge needed to append its own generator preset to the vanilla **New World** preset grid without replacing vanilla presets.

The final UI result looked simple: one extra preset cell.

Getting there was not simple.

## Discovery sequence

The investigation went through several failed assumptions:

1. search for a likely `Content` container;
2. geometry-based detection;
3. wrapper-aware scanning;
4. runtime logging of button parents;
5. discovery of the exact active parent named `Grid` containing **16 direct buttons**.

That final observation gave TerraForge a stable target for appending a 17th cell.

## The unsafe approach

The first direct implementation cloned an **active vanilla preset cell**.

During `Instantiate`, the copied `ButtonClickMaptemplate` component ran its Unity lifecycle and failed inside `ButtonClickMaptemplate.Awake()` with a `NullReferenceException`.

Even after injection, the copied `EventTrigger` still referenced vanilla tooltip behavior and could later call a broken `showTooltip()` path.

### Lesson

A Unity object can look like a reusable visual prefab while containing behaviors that assume they are being initialized in a very specific vanilla context.

Copying the GameObject copies those assumptions too.

## The working pattern

TerraForge's safer route was:

1. temporarily deactivate the source vanilla cell;
2. instantiate the clone while the source is inactive;
3. remove the cloned `ButtonClickMaptemplate`;
4. remove the copied `EventTrigger`;
5. preserve the visual `Button`, images, and layout components;
6. install TerraForge's own click handler;
7. let an already initialized vanilla preset button continue the normal generation flow;
8. activate the safe clone.

This produced the custom 17th preset without the earlier `Awake()` and tooltip crashes.

## General rule

When cloning vanilla UI, separate **visual structure** from **behavioral components**.

Do not assume that a vanilla `MonoBehaviour` is safe to duplicate simply because the original object is already working on screen.

## What remains version-specific

The exact object names, hierarchy, and component set are version-sensitive. The pattern is reusable; the literal `Grid = 16 buttons` observation is verified only for the tested WorldBox build.
