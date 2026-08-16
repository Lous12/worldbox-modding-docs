---
title: Getting Started
description: A beginner route from “I want to make a mod” to a mod that actually loads.
---

# Getting Started

You do **not** need to learn the whole WorldBox API first. The safest beginner route is small: make the loader see your mod, confirm it in `Player.log`, then add one feature.

## 1. Make sure NeoModLoader is running

Launch WorldBox with NeoModLoader installed. If you already have a `Player.log`, open the [Player.log Analyzer](../workbench/log-analyzer/). A healthy NML session normally gives us enough information to extract the NeoModLoader version and loaded-mod lines.

If NML itself is not present, do not start copying API code yet. Installation documentation is a separate step and will be expanded with version-specific instructions as we verify them.

## 2. Create the smallest possible mod

Use the [Starter Mod Generator](../workbench/mod-generator/). For the current research stack, our working WBML probes use a mod folder containing at least:

```text
MyMod/
├── mod.json
└── Main.cs
```

The generated starter uses `BasicMod<Main>` and `OnModLoad()` because that structure has actually compiled and loaded in our current WBML experiments.

## 3. Run the game before adding features

Do not add UI, Harmony patches, persistence, events and ten systems at once. First launch the game and verify a simple `Loaded` / `OnLoad` message in `Player.log`.

If it fails, the smaller the mod is, the easier the log is to understand.

## 4. Add one feature

Good first choices:

- [save custom kingdom data](../guides/kingdom-custom-data/)
- [build a Political World addon](../guides/politicalworldapi-runtime-baseline/)
- [browse the verified API by task](../workbench/api-explorer/)
- [open troubleshooting](../troubleshooting/) when something breaks

## 5. Check the evidence boundary

A snippet can be correct for one WorldBox/NML/API stack and wrong later. Before relying on research-sensitive behavior, check the [Compatibility Matrix](../workbench/compatibility/).

**Beginner rule:** first make it load, then make one thing work, then make it clever.
