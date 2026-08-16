---
title: WBML 0.1.0: правила для ИИ
description: Machine-oriented runtime boundaries и safe reasoning rules первого WBML baseline.
---


Canonical machine-readable classification: [`/data/wbml-0100-baseline.json`](/worldbox-modding-docs/data/wbml-0100-baseline.json).

Дополнительные правила: не выводить completion из replacement refs; `finishMakingWorld` Verified только для проверенного path; save/load signatures version-bound; exact Height не reload proof; raw assembly count не конфликт; Unity fake-null != CLR null; не делать rich full-map scan каждый frame; UNKNOWN не заполнять догадками; после version change использовать baseline diff.
