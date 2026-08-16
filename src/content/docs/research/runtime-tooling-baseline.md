---
title: WBML runtime tooling baseline — 0.0.6 to 0.0.15
description: Lifecycle, reflection, localization, UI, diagnostics, Unity object ownership, transactions and fake-null findings.
---

<span class="doc-status">✅ Verified — executed branches</span>

This block turned WBML from a collection of one-off probes into a reusable modding laboratory.

## 0.0.6 — NML lifecycle and automated runner

`0.0.6-fix1` ended **36 PASS / 0 FAIL / 2 SKIP**. Runtime order was observed as `OnModLoad → Awake → OnEnable → Start → Update:first → Init → PostInit`. `Main.Instance`, `Main.I`, the mod GameObject, declaration, config and feature manager were live. `PrefabLibrary` was stable and child prefabs could be created and cleaned after a frame boundary.

The two SKIPs are important boundaries: WBML did not pretend that a direct call proves NML's real `IReloadable` dispatch, and did not destroy the running mod to fake `IUnloadable`. Runtime metadata marked `IUnloadable` deprecated/no-effect on NML 1.2.0.1.

## 0.0.7 — Reflection + Harmony

**54 / 0 / 0 PASS.** Private instance/static fields and private methods were read/written/invoked; `AccessTools` resolved overloads and inherited private fields; missing members returned null without a harness crash. NML `ReflectionHelper` existed but was non-public. Harmony patch/unpatch and multi-owner cleanup paths passed. Harmony runtime assembly observed: `0Harmony 2.9.0.0`.

## 0.0.8 — Localization / LM

**51 / 0 / 0 PASS.** Automatic `Locales` loading, current-language lookup, `LM.Add`, `Has`, JSON stream import/overwrite, CSV parsing/separators/escapes and cleanup were exercised. The suite intentionally did **not** force a user language change.

## 0.0.9 — UI infrastructure

`fix3` automated result: **126 / 0 / 0 PASS**. Public NML UI surface, `SimpleButton`, real `ScrollWindow`, real `PowersTab`, button injection, repeated open/hide cycles, registry cleanup and deferred destruction passed. A previous recreate-every-time design stopped activating the same window ID from cycle 3; `fix3` separated reusable-window lifecycle from teardown. **Manual Escape after cleanup remains UNKNOWN.**

## 0.0.10 — Diagnostics

**33 / 0 / 0 PASS.** Unity logging/event capture, log-type/message roundtrip, stack trace/error containment, duplicate/partial/self-removing subscriptions, 250-message stress, exception type/inner exception/message preservation and report preflight passed. Timing/memory numbers are observations, not guarantees.

## 0.0.11 — GameObject / Transform

**46 / 0 / 0 PASS.** Parenting, component lookup, MonoBehaviour enable/disable, component destruction, instantiate/clone independence and a 128-object hierarchy cleanup passed.

## 0.0.12 — Asset libraries

`fix1`: **33 / 0 / 0 PASS.** Real `AssetManager` libraries were enumerated read-only. `AssetLibrary<T>` is abstract; the isolated mutation probe therefore used a concrete subclass. Duplicate ID add did not throw; list count stayed `2 → 2`, and lookup returned the duplicate/replacement object. NML `AssetExtension.ForEach` behavior was tested for existing/future assets. `GameLanguageLibrary` was observed with `count=40`, `sampleId=en`; 1000 reflected lookups completed without changing the library count.

## 0.0.13 — Ownership

`fix1`: **46 / 0 / 0 PASS.** Parent-owned child destruction, detach survival, reparent ownership transfer, component-vs-GameObject ownership and Instantiate internal-reference remapping passed. `ModObjectFeature<T>.Object` does not imply automatic Unity lifetime cleanup; destroyed-object replacement must be handled deliberately.

## 0.0.14 — Transactions

**49 / 0 / 0 PASS.** Full GameObject snapshot/mutate/restore and 50 mutate→throw→rollback cycles passed. Mutating an asset's `id` after registration did **not** re-key the library: old key still resolved, new key did not until deliberate re-registration/restoration. Destroy is not rollback: equivalent state can be recreated, but object identity cannot be restored in-place. External stale holders need explicit rebind.

## 0.0.15 — Unity fake-null and stale wrappers

**37 / 0 / 0 PASS.** Immediately after `Object.Destroy`, wrappers were still ordinary managed references until the frame boundary. After destruction, member access could throw `NullReferenceException`; `GetInstanceID()` returned 0 in the tested object. Collections can still contain the destroyed wrapper; `List.Remove(null)` did not remove it. Duplicate asset registry ownership and object lifetime are separate. Detaching a child after parent destruction was scheduled let it survive; attaching a child to an already-doomed parent destroyed it.

## Evidence

Evidence excerpts: `wbml-0006-result.txt` through `wbml-0015-result.txt` under `/evidence/`.
