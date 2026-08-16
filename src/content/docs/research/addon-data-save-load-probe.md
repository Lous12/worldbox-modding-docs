---
title: Addon Data Save/Load Probe
description: WBML-0001 runtime result for PoliticalWorldAPI kingdom state across a full WorldBox process restart.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">WBML-0001</span>
<span class="doc-status">WorldBox 0.51.2 build 719</span>

Source inspection first showed how Political World **intended** addon-private values to be stored.

WBML-0001 tested the behavior in a real runtime.

## Research question

Do PoliticalWorldAPI kingdom values survive:

```text
write
→ save
→ fully close WorldBox
→ start a new WorldBox process
→ load the same save
→ read without rewriting
```

## Verified environment

```text
WorldBox:          0.51.2
build:             719
git:               build-719@5dec
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
WorldBox Modding Lab: 0.0.1
```

The Lab also confirmed these relevant capabilities at runtime:

```text
kingdom.addon-data       YES
kingdom.addon-data.v2    YES
kingdom.addon-data.typed YES
kingdom.tags             YES
kingdom.addon-tags       YES
diagnostics              YES
```

## Test values

```text
int    = 170031
string = "PW_SAVE_PROBE_Ж_ß_世界"
bool   = true
float  = 1234.5678f

private kingdom tag = "save_probe_private"
shared kingdom tag  = "Lous12.WorldBoxModdingLab.save_probe_shared"
```

The marker:

```text
WBML:0.0.1:TARGET
```

was used only to relocate the target kingdom after reload.

## Phase 1 — immediate readback

The probe selected kingdom:

```text
Iovalis
```

and wrote every value through the public PoliticalWorldAPI.

Immediate result:

```text
int ............ PASS
string ......... PASS
bool ........... PASS
float .......... PASS
private tag .... PASS
shared tag ..... PASS

IMMEDIATE RESULT: 6/6 PASS
```

## Phase 2 — full process restart

The game was fully restarted.

The new process reloaded the Lab and reported the same environment.

WorldBox then loaded:

```text
save27 / map.wbox
Save Version 17
```

The Lab found the previous target again:

```text
Iovalis
discovery score = 15
```

without a new WRITE operation.

Post-load result:

```text
marker ......... PASS
int ............ PASS
string ......... PASS
bool ........... PASS
float .......... PASS
private tag .... PASS
shared tag ..... PASS

POST-LOAD RESULT: 6/6 PASS
```

## Result

✅ **Verified:** for the tested environment, PoliticalWorldAPI kingdom:

- int;
- string, including mixed Unicode;
- bool;
- float;
- addon-private tags;
- shared kingdom tags;

survive a full WorldBox process restart and return with the same save.

## Important evidence boundary

This result proves:

```text
same save + new process → values return
```

It does not by itself identify the exact physical file/database that stores each value.

It also does not yet prove:

- party-private data persistence;
- language-switch float behavior;
- legacy API 1.1 → v2 migration in runtime.

Those are separate probes.

## Related isolation experiment

WBML-0002 has now separately verified the two-save sequence:

```text
World A
→ World B
→ World A
→ World B
```

with independent current-run signatures and a strict final gate.

See [World Isolation Probe](./world-isolation-probe/) and [WBML-0002 case study](../case-studies/wbml-0002-world-isolation/).
