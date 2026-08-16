---
title: WBML-0005 — replacement semantics and the cleanup that changed the data
description: How action duplicate assumptions and an unsafe finalizer produced two different false failures before the safe final suite.
---

<span class="doc-status">✅ Runtime lesson</span>
<span class="doc-status">WBML-0005</span>

WBML-0005 produced two especially reusable lessons.

## Lesson 1 — a "duplicate" may be a replacement

The first harness expected a second `RegisterAction` with the same ID to fail.

Runtime API 1.14.0 accepted it and replaced the previous definition. Because the probe's replacement omitted the old category and condition, later metadata assertions failed too.

Those were not four independent API failures. They were one incorrect duplicate assumption poisoning later state.

The corrected suite explicitly tested replacement, then restored the canonical definition before continuing.

## Lesson 2 — cleanup is allowed to be dangerous too

The final support test correctly noticed there was only one active party and skipped exact support mutation.

But an old finalizer still compared current support to a Phase A snapshot and called the support setter to "restore" it.

That finalizer itself triggered the single-party normalization path and changed support to 100.

The safe fix was not "restore harder". It was:

```text
if the test did not mutate support
→ cleanup must not mutate support either
```

## Lesson

A good runtime suite must track **causal failures**.

One wrong setup or cleanup operation can create many downstream assertion failures. Fix the first causal error instead of treating every red line as a separate broken API method.
