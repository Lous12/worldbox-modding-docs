---
title: Fix a problem
description: Start from the symptom, inspect the log, and only then choose a theory about the cause.
---

# Fix a problem

Do not begin debugging with “I think the API is broken.” Begin with what you can actually observe.

<div class="trouble-entry-grid">
  <a class="trouble-entry primary" href="./wizard/"><span>🧭</span><strong>Use the Troubleshooter</strong><p>Pick the symptom and get the shortest useful route.</p></a>
  <a class="trouble-entry" href="../workbench/log-analyzer/"><span>📄</span><strong>Analyze Player.log</strong><p>Extract versions, loaded mods and known error signatures locally.</p></a>
  <a class="trouble-entry" href="./stack-overflow-recursive-initialization/"><span>♻️</span><strong>StackOverflow / recursion</strong><p>Recognize a repeated call cycle and avoid recursive initialization traps.</p></a>
</div>

## A useful debugging order

1. Prove whether the mod loaded.
2. Find the first concrete error or missing callback.
3. Reduce the test to one mechanic.
4. Re-run with a fresh log.
5. Only then decide whether the problem is NML, WorldBox, PoliticalWorldAPI, or your own code.

The troubleshooting section is intentionally evidence-driven. If we have not reproduced a failure mode yet, the docs should say that instead of inventing a confident fix.
