---
title: WBML-0004 — when the runtime disagrees with the source map
description: Event Bus case study on version drift, payload mapping and a harness that accidentally filtered its own events.
---

<span class="doc-status">✅ Runtime lesson</span>
<span class="doc-status">WBML-0004</span>

The inspected API 1.9 source was useful for designing the Event Bus probe. It was not safe to treat every source detail as a requirement for the newer API 1.14.0 runtime.

The runtime returned 23 event IDs and accepted a unique custom/unknown event subscription even though the older source suggested unknown IDs should be rejected.

Then `party.renamed` placed the tested names in `OldValue/NewValue`, not the fields the first harness expected.

## The nastiest harness mistake

After discovering the new mapping, `fix1` still filtered recursive/stress callbacks using only `NewName`.

Runtime sent the value in `NewValue`, so the **test code itself** rejected every Phase C callback.

A naive report could have said:

```text
Event Bus recursion is broken
```

The correct conclusion was:

```text
our filter is broken
```

`fix2` corrected the filter and then verified recursion guard depth 16 and 100/100 stress callbacks.

## Lesson

When runtime contradicts an assumption:

1. log the raw payload;
2. classify the difference as observation;
3. update only the harness assumption that was disproved;
4. re-run before promoting a subsystem failure.
