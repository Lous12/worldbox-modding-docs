---
title: WBML runtime tooling baseline — 0.0.6 to 0.0.15
description: Русская версия: Lifecycle, reflection, localization, UI, diagnostics, Unity object ownership, transactions and fake-null findings.
---

<span class="doc-status">✅ Verified — выполненные ветки</span>

Этот блок превратил WBML из набора разовых probe в переиспользуемую лабораторию.

## 0.0.6 — NML lifecycle и automated runner

`0.0.6-fix1`: **36 PASS / 0 FAIL / 2 SKIP**. Runtime-порядок наблюдался как `OnModLoad → Awake → OnEnable → Start → Update:first → Init → PostInit`. `Main.Instance`, `Main.I`, mod GameObject, declaration, config и feature manager были живыми. `PrefabLibrary` оказался стабильным, а дочерний prefab можно было создать и безопасно удалить после frame boundary.

Два SKIP — реальные границы evidence: WBML не выдавал прямой вызов за настоящий NML `IReloadable` dispatch и не уничтожил работающий мод ради имитации `IUnloadable`. В runtime metadata NML 1.2.0.1 `IUnloadable` помечен deprecated/no-effect.

## 0.0.7 — Reflection + Harmony

**54 / 0 / 0 PASS.** Проверены private instance/static fields, private methods, overload resolution и inherited private fields через `AccessTools`, безопасный missing-member path, Harmony patch/unpatch и multi-owner cleanup. `ReflectionHelper` NML существует, но non-public. Наблюдаемая Harmony assembly: `0Harmony 2.9.0.0`.

## 0.0.8 — Localization / LM

**51 / 0 / 0 PASS.** Проверены auto-load `Locales`, current-language lookup, `LM.Add`, `Has`, JSON stream import/overwrite, CSV separators/escapes и cleanup. User language suite намеренно не менял.

## 0.0.9 — UI infrastructure

`fix3`: **126 / 0 / 0 automated PASS**. Проверены public NML UI surface, `SimpleButton`, настоящий `ScrollWindow`, настоящий `PowersTab`, button injection, open/hide cycles, registry cleanup и deferred destruction. Предыдущий подход с постоянным destroy/recreate того же window ID переставал активировать окно с третьего цикла; `fix3` разделил reuse и teardown. **Manual Escape после cleanup остаётся UNKNOWN.**

## 0.0.10–0.0.15

- **0.0.10 Diagnostics — 33/0/0:** логирование, event capture, stack/error containment, subscriptions, 250-message stress, сохранение outer/inner exception и report writer.
- **0.0.11 GameObject / Transform — 46/0/0:** parenting, components, enable/disable, instantiate/clone, 128-object hierarchy cleanup.
- **0.0.12 Asset libraries — 33/0/0:** read-only enumeration реальных libraries, concrete test library, duplicate-ID semantics, `AssetExtension.ForEach`, `GameLanguageLibrary count=40 sampleId=en`, 1000 read-only lookups.
- **0.0.13 Ownership — 46/0/0:** parent-child ownership, detach/reparent, component lifetime, Instantiate reference remap, `ModObjectFeature<T>.Object` lifetime boundary.
- **0.0.14 Transactions — 49/0/0:** snapshot/mutate/restore, 50 exception rollbacks, asset-id registry staleness, destroy-is-not-rollback, explicit stale-ref rebind.
- **0.0.15 Fake null — 37/0/0:** Unity wrapper lifetime, destroyed-member access, stale collection entries, duplicate asset ownership, scheduled-destroy hierarchy races.

Evidence лежит в `/evidence/wbml-0006-result.txt` … `/evidence/wbml-0015-result.txt`.
