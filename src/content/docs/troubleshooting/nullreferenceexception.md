---
title: NullReferenceException — practical investigation
description: Find the missing object or unsafe lifecycle assumption instead of randomly adding null checks.
---

# `NullReferenceException`

`NullReferenceException` tells you that code tried to use a reference that was `null`. It does **not** by itself prove which object was null or why.

## Useful investigation order

1. Find the first relevant `NullReferenceException` and nearby stack/context lines.
2. Identify the first frame or method that belongs to your mod or the exact vanilla component you touched.
3. Ask whether the object was expected to exist **at that lifecycle moment**.
4. If this followed UI cloning, inspect copied `MonoBehaviour` / `EventTrigger` components before adding broad null checks.
5. Reproduce with the smallest path possible and log the objects/fields immediately before the failing call.

## UI warning

TerraForge reproduced a `NullReferenceException` by cloning an active vanilla UI cell whose copied behavior executed `Awake()` in the wrong context. The fix was not “add a null check everywhere”; it was to change the cloning lifecycle and remove unsafe copied behavior.

See [Clone vanilla UI more safely](../../recipes/safe-ui-clone/).
