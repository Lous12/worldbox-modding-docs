---
title: Lifecycle-safe patterns из WBML
description: Практические паттерны worldgen, save/reload, Unity liveness, heavy scans и compatibility по WBML 0.1.0.
---

<span class="doc-status">✅ Evidence-backed recipes</span>
<span class="doc-status">WorldBox 0.51.2 baseline</span>


## Worldgen
Persistent runner → `finishMakingWorld` → live collections → short stability window → heavy validation один раз. Не ждать replacement ref.

## Reload
Использовать несколько independent signals: lifecycle signal, исчезновение marker, live collections, stable polls. Не требовать exact `Height` equality.

## References
Reuse возможен, но не гарантирован. После lifecycle boundary сверяйте объект с текущим manager/collection; stable ID + re-query безопаснее слепого хранения wrapper.

## Map scan
Большие scans делить на chunks/yields. В wait loop — только cheap polling.

## SaveManager
Не угадывать paths/slots/args. Сначала исследовать signature. Destructive tests — только disposable world.

## Unity liveness
Обычного CLR null недостаточно; fake-null и deferred destroy важны.

## Mod conflicts
Не сравнивать только assembly count. Смотреть конкретные assemblies, core type uniqueness, Harmony owners и live state.
