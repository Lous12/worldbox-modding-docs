---
title: Система статусов документации
description: Как проект разделяет Verified, Observed, Experimental, Inferred, Failed, Unsafe, Unknown и Outdated evidence.
---

<span class="doc-status">✅ Методология проекта</span>

Каждый technical claim должен показывать **уверенность** и **runtime version**.

| Статус | Значение |
| --- | --- |
| ✅ **Verified** | Воспроизведено в реальной сборке и подтверждено runtime evidence. |
| 👁 **Observed** | Наблюдалось, но не превращается в universal contract. |
| 🧪 **Experimental** | Рабочий/плановый experiment, которому не хватает более сильной проверки. |
| ⚠️ **Inferred** | Evidence-backed вывод без прямого runtime proof. |
| ❌ **Failed** | Проверенный подход/harness assumption оказался неверным. |
| 🕒 **Outdated** | Было Verified на старом baseline и ещё не re-test. |

## Дополнительные категории WBML baseline

- **FAILED ASSUMPTION** — правдоподобное правило опровергнуто Lab;
- **UNSAFE** — паттерн опасен для test world/performance/reliability;
- **UNKNOWN** — evidence недостаточно; это не скрытый PASS/FAIL.

Baseline: **WorldBox 0.51.2 build 719 · NML 1.2.0.1 · Unity 2022.3.60f1 · ResearchEngine v2.1.1**.

См. [WBML 0.1.0 First Research Baseline](../../research/wbml-0100-first-research-baseline/).
