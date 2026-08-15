---
title: Addon Data Save/Load Probe
description: Planned runtime experiment to verify PoliticalWorldAPI kingdom and party state across real WorldBox saves.
---

<span class="doc-status">🧪 Experimental plan</span>
<span class="doc-status">Research needed</span>

Source inspection confirms how Political World **writes and reads** addon-private values.

The remaining question is runtime persistence across a real WorldBox save lifecycle.

This probe is intentionally not marked Verified until it is executed.

## Research question

For the current target:

```text
WorldBox 0.51.2 build 719
NeoModLoader 1.2.0.1
Political World installed build under test
```

do these values survive:

```text
save
→ exit/reload
→ load world
```

without corruption?

## Test values

Use deliberately distinctive values:

```text
int    = 170031
string = "PW_SAVE_PROBE_Ж_ß_世界"
bool   = true
float  = 1234.5678f
```

Also create:

```text
private kingdom tag = "save_probe_private"
shared kingdom tag  = "save_probe_shared"
```

If a stable party exists:

```text
party int    = 98765
party string = "PW_PARTY_SAVE_PROBE"
party bool   = true
party float  = -42.125f
```

## Phase 1 — baseline write/read

1. Register the probe addon.
2. Select one kingdom.
3. Record kingdom identity/name and current world year.
4. Write every test value through **public PoliticalWorldAPI only**.
5. Read them immediately.
6. Log expected vs actual.
7. Record the stable party ID if party tests are enabled.

Expected:

```text
all immediate reads match
```

## Phase 2 — normal save/load

1. Save world.
2. Return to menu.
3. Load the same world.
4. Resolve the same kingdom.
5. Read all values again.
6. Resolve the same party ID and read party values.

Record each field as:

```text
PASS
FAIL
MISSING
TYPE/PARSE ERROR
```

## Phase 3 — full process restart

Repeat after fully closing and restarting WorldBox.

This distinguishes persistence from state that accidentally survived only in static/runtime memory.

## Phase 4 — language change

Because floats are serialized with `InvariantCulture`:

1. write float under one game language;
2. save;
3. switch language;
4. reload;
5. read float.

Expected:

```text
same numeric value
```

## Phase 5 — world switch isolation

1. Create/load a second world.
2. Confirm probe state is not accidentally coming from static dictionaries.
3. Return to original save.
4. Confirm original values remain associated with the original world data.

## Phase 6 — legacy migration fixture

If we can safely construct a controlled legacy API 1.1 value:

1. write only the old-format key;
2. verify v2 key is absent;
3. call the current public getter;
4. confirm returned value equals legacy;
5. inspect that v2 copy now exists;
6. confirm legacy key still exists.

This phase may require a dedicated development-only helper because addons should not normally construct internal keys.

## Evidence to capture

```text
Player.log
Political World version/API runtime report
WorldBox build
NML version
world/save identifier
test kingdom name/ID
test party ID
expected/actual values
result table
```

## Promotion rule

Only after the probe passes should the general docs say:

```text
✅ Verified persistence on WorldBox X / NML Y / Political World Z
```

Until then:

```text
✅ source access pattern
🧪 persistence runtime verification pending
```

This distinction is deliberate.
