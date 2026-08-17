---
title: Evidence model WBML
description: Source-of-truth правила для signatures, provenance, runtime results, lifecycle windows и rejected methodology.
---

Эта страница задаёт interpretation contract для новых reference-страниц WBML 0.2–0.6.

## Порядок source of truth

Для runtime claim:

```text
canonical WBML export + final matrix
→ подробный API/справочник
→ Quick Docs
→ examples/recipes
```

Удобный слой может сократить текст, но не может расширить утверждение.

## Что доказывает method record

`VERIFIED` query record означает, что exact method прошёл structural read-only verifier, при необходимости найден non-stale runtime owner, вызов завершился в этом runtime state, а exported result/stability реально наблюдались. Это **не** гарантия всех inputs и будущих WorldBox версий.

Parameterized record дополнительно зависит от **argument provenance**. `0.4.0-fix2` различает collection keys/elements, semantic fields, runtime objects и synthetic values. Совпадения CLR type недостаточно.

## Access

Detailed pages сохраняют access, потому что он меняет цену интеграции:

- `public` — прямой вызов C# при доступном type/member;
- `internal` / `protected` / `private` — WBML может проверить runtime через reflection, но это не делает member стабильным public modding contract.

`reflection_verified` — это успешный evidence, а не «рекомендованный public API».

## Новые status families

- `VERIFIED-REVERSIBLE`: controlled scalar transaction дала expected delta и exact restore без residual/collateral fields.
- `VERIFIED-LIFECYCLE`: natural lifecycle entry point удалил entity из pinned manager/owner/registry evidence, stale reads прошли.
- `VERIFIED-NONTERMINAL-WINDOW`: тот же object оставался registered весь exported bounded window после lifecycle call.
- `VERIFIED-EMPTY-REGISTERED-WINDOW`: Kingdom имел zero cities, но оставался registered bounded window.
- `OBSERVED-THREW`: exact exported invocation/arguments бросил exception. Нельзя сокращать до «метод сломан».

## Rejected methodology

Superseded WBML fixes остаются полезным negative knowledge, но не смешиваются с canonical machine atlases. Примеры:

- stale/dead sample selection в первом 0.3;
- type-compatible, но semantic-irrelevant значения параметров в раннем 0.4;
- corruption через generic manager `destroyObject/removeObject` + `Dispose` в 0.6-fix1;
- floating collection provenance и ложный City reintroduction в 0.6-fix4.

Если это нужно объяснить, ссылка должна вести в Research, а результат должен называться failed assumption/harness issue.

[Quick glossary](../../quick/evidence-statuses/) · [Machine-data contract](../../ai/wbml-machine-data/) · [Research archive](../../research/)
