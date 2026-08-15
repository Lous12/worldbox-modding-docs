---
title: Addon Data Save/Load Probe
description: Runtime-результат WBML-0001 для PoliticalWorldAPI kingdom state после полного restart процесса WorldBox.
---

<span class="doc-status">✅ Verified</span>
<span class="doc-status">WBML-0001</span>
<span class="doc-status">WorldBox 0.51.2 build 719</span>

Source inspection сначала показал, **как Political World намерен** хранить addon-private values.

WBML-0001 проверил это в реальном runtime.

## Research question

Переживают ли PoliticalWorldAPI kingdom values:

```text
write
→ save
→ полностью закрыть WorldBox
→ запустить новый процесс WorldBox
→ загрузить тот же save
→ read без новой записи
```

## Проверенная среда

```text
WorldBox:          0.51.2
build:             719
git:               build-719@5dec
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
WorldBox Modding Lab: 0.0.1
```

Lab также подтвердил runtime capabilities:

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

Marker:

```text
WBML:0.0.1:TARGET
```

использовался только для поиска target kingdom после reload.

## Phase 1 — immediate readback

Probe выбрал kingdom:

```text
Iovalis
```

и записал все values через public PoliticalWorldAPI.

Результат:

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

WorldBox был полностью закрыт и запущен снова.

Новый процесс заново загрузил Lab и сообщил ту же среду.

Затем WorldBox загрузил:

```text
save27 / map.wbox
Save Version 17
```

Lab снова нашёл target:

```text
Iovalis
discovery score = 15
```

без нового WRITE.

Post-load:

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

✅ **Verified:** в проверенной среде PoliticalWorldAPI kingdom:

- int;
- string, включая mixed Unicode;
- bool;
- float;
- addon-private tags;
- shared kingdom tags;

переживают полный restart процесса WorldBox и возвращаются вместе с тем же save.

## Важная граница evidence

Результат доказывает:

```text
same save + new process → values return
```

Но сам по себе не устанавливает точный физический file/database, в котором лежит каждый value.

Также пока не проверены:

- persistence party-private data;
- isolation между разными worlds;
- float после language switch;
- runtime migration API 1.1 → v2.

Для этого будут отдельные probes.

## Следующий эксперимент

WBML-0002 проверяет:

```text
World A
→ World B
→ World A
→ World B
```

чтобы понять, действительно ли addon state принадлежит конкретному world и не протекает через static/runtime state.
