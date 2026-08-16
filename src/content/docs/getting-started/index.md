---
title: Start here
description: A beginner route from “I want to make a mod” to a mod that really loads.
---

# Start here

You do **not** need to learn the whole WorldBox API first. Your first goal is much smaller: make NeoModLoader see your mod, prove that it loaded, then add exactly one feature.

<div class="friendly-callout friendly-callout-good"><strong>Goal of this page</strong><span>Reach a clean point where you can say: “the loader sees my mod and my code runs.”</span></div>

## Step 1 — Make sure NeoModLoader is running

Launch WorldBox with NeoModLoader installed. If you already have a `Player.log`, open the [Player.log Analyzer](../workbench/log-analyzer/). In a normal NML session, the log should contain NeoModLoader activity and mod-loading lines.

<div class="done-when"><strong>Done when:</strong> you can find NML activity in the log.</div>

If NML is not present at all, stop here. Do not copy PoliticalWorldAPI or Harmony code yet — the problem is earlier than your mod logic.

## Step 2 — Create the smallest possible mod

Open the [Starter Mod Generator](../workbench/mod-generator/). The current WBML probes use a tiny structure like:

```text
MyMod/
├── mod.json
└── Main.cs
```

The generator uses `BasicMod<Main>` and `OnModLoad()` because that shape compiled and loaded in our current runtime experiments.

<div class="done-when"><strong>Done when:</strong> you have a tiny mod folder with no extra systems yet.</div>

## Step 3 — Run it before adding features

Launch the game. Check `Player.log` for your mod name and a simple `OnLoad` / `Loaded` message.

If the mod does not load, use the [Troubleshooter](../troubleshooting/wizard/) instead of adding more code.

<div class="done-when"><strong>Done when:</strong> the log proves that your own code ran.</div>

## Step 4 — Add one feature

Pick **one** small goal from [Recipes](../recipes/): save a value, subscribe to an event, create an action, inspect the world, or debug a specific problem.

Do not add UI + Harmony + persistence + events at the same time. If one thing breaks, a tiny test is dramatically easier to understand.

## Step 5 — Check the evidence boundary

A snippet may be correct for one WorldBox / NML / API combination and change later. Before depending on version-sensitive behavior, open the [Compatibility Matrix](../workbench/compatibility/).

<div class="friendly-callout"><strong>Beginner rule</strong><span>First make it load. Then make one thing work. Only then make it clever.</span></div>
