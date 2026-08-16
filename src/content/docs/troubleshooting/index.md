---
title: Fix a problem
description: Start from the symptom, inspect the log, and only then choose a theory about the cause.
---

# Fix a problem

Do not begin debugging with “I think the API is broken.” Begin with what you can actually observe.

<div class="trouble-entry-grid trouble-entry-grid-v2">
  <a class="trouble-entry primary" href="./wizard/"><span>FIX</span><strong>Use the Troubleshooter</strong><p>Pick the symptom and get the shortest useful route.</p></a>
  <a class="trouble-entry" href="../workbench/log-analyzer/"><span>LOG</span><strong>Analyze Player.log</strong><p>Extract versions, group signatures and jump into relevant docs locally.</p></a>
  <a class="trouble-entry" href="./csharp-compile-errors/"><span>CS</span><strong>C# compile errors</strong><p>Start from the first `CSxxxx` instead of debugging runtime code that never compiled.</p></a>
  <a class="trouble-entry" href="./nullreferenceexception/"><span>NULL</span><strong>NullReferenceException</strong><p>Investigate lifecycle/object assumptions instead of adding random null checks.</p></a>
  <a class="trouble-entry" href="./stack-overflow-recursive-initialization/"><span>LOOP</span><strong>StackOverflow / recursion</strong><p>Recognize a repeated call cycle and recursive initialization trap.</p></a>
  <a class="trouble-entry" href="./common-player-log-noise/"><span>INFO</span><strong>Common log noise</strong><p>Do not mistake network/TLS/library lines for the root cause without context.</p></a>
</div>

## A useful debugging order

1. Prove whether the mod loaded.
2. Find the first concrete compile/runtime signal.
3. Follow the narrowest relevant guide.
4. Reduce the test to one mechanic and re-run with a fresh log.
5. Only then decide whether the problem is NML, WorldBox, PoliticalWorldAPI, another mod, or your own code.
