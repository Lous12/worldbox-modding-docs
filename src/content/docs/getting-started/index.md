---
title: Start here
description: A beginner route from “I want to make a mod” to a mod that really loads and has one proven feature.
---

# Start here

You do **not** need to understand the whole WorldBox API before you begin. Your first job is much smaller:

```text
NeoModLoader is running
        ↓
your mod compiles and loads
        ↓
your own marker appears in Player.log
        ↓
one small feature works
        ↓
only then: bigger systems
```

<div class="friendly-callout friendly-callout-good"><strong>Finish line</strong><span>You can prove “the loader sees my mod, my code ran, and one feature works” without guessing.</span></div>

<div class="beginner-launch-card"><div><span>START</span><div><strong>Use the interactive first-mod checklist</strong><p>Six small checkpoints. Progress is stored only in your browser and can be reset whenever you want.</p></div></div><a href="./journey/">Open beginner journey →</a></div>

## Before you touch code

You only need a few things at the start:

- a WorldBox installation where NeoModLoader already starts;
- a text/code editor;
- `Player.log`, because it is your evidence that compile/load/runtime stages actually happened;
- a disposable test save whenever a recipe mutates world state.

You do **not** need Harmony, custom UI, a framework, a database, or a giant folder tree for the first successful load.

## The five things you keep seeing

If `mod.json`, `Main.cs`, NML and runtime all blur together, read [the beginner mental model](./mental-model/) first. It explains what each piece does and which problem belongs to which layer.

<div class="beginner-link-grid">
  <a href="./mental-model/"><span>MAP</span><strong>What is NML, mod.json, Main.cs and Player.log?</strong><small>Build a mental model before memorizing APIs.</small></a>
  <a href="../workbench/mod-generator/"><span>MOD</span><strong>Generate the smallest skeleton</strong><small>Two files, one load marker, no unnecessary systems.</small></a>
  <a href="../recipes/first-nml-mod/"><span>RUN</span><strong>Verify the first launch</strong><small>Know exactly what success should look like.</small></a>
  <a href="./debugging-first-steps/"><span>FIX</span><strong>It did not work</strong><small>Choose the first check from what you actually observe.</small></a>
  <a href="./glossary/"><span>ABC</span><strong>Plain-language glossary</strong><small>Short explanations for common modding terms.</small></a>
  <a href="../recipes/"><span>HOW</span><strong>Add one feature</strong><small>Task-first recipes after the skeleton is proven.</small></a>
</div>

## A useful debugging habit

When something fails, describe the **stage**, not just “my mod is broken”:

```text
NML not visible
→ loader/setup stage

C# error / mod compilation failed
→ compile stage

mod loads, but marker never appears
→ load / entry-point assumption

marker appears, feature fails
→ feature/runtime stage

works now, disappears after reload/restart
→ persistence/lifecycle stage
```

That separation is more useful than changing several unrelated files at once.

## After the first success

Pick **one** goal from [Recipes](../recipes/). If the recipe depends on version-sensitive behavior, check the [Compatibility Matrix](../workbench/compatibility/) and its evidence status before treating it as universal.

<div class="friendly-callout"><strong>Beginner rule</strong><span>First make it load. Then prove one thing works. Only then make it clever.</span></div>
