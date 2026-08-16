---
title: WBML-0003 — Persistence & Party Lifecycle Suite
description: Full-restart party-private typed persistence, invalid-party behavior and inactive/reactivated party lifecycle evidence.
---

<span class="doc-status">✅ Verified — executed branches</span>
<span class="doc-status">WBML-0003</span>
<span class="doc-status">PARTIAL PASS: 119 / 0 / 1</span>

## Research questions

WBML-0003 combined several closely related questions:

1. Do kingdom and party typed addon values survive same-save reload and a **full WorldBox process restart**?
2. Can the test prove that restart without accidentally relying on in-memory counters?
3. What do party typed getters/setters do when the party ID is missing?
4. Does party-private data remain available while a party is inactive?
5. Can the party be reactivated without losing the tested addon state?

## Environment

```text
WorldBox:          0.51.2
build:             719
git:               build-719@5dec
NeoModLoader:      1.2.0.1
PoliticalWorldAPI: 1.14.0
Lab:               0.0.3-fix1
```

## Why `fix1` was necessary

The first 0.0.3 harness had a methodology problem: after process restart, its final counters only represented the post-restart phases because the earlier counters had lived only in memory.

That does not prove the earlier phases disappeared, but it makes the final matrix incomplete.

`fix1` therefore persisted:

```text
Phase A gate
Phase B gate
pre-restart PASS count
pre-restart FAIL count
pre-restart SKIP count
run marker / phase state
```

After the new WorldBox process loaded the save, the Lab reconstructed the run from persisted state before continuing.

Observed resume line:

```text
RESTORED PRE-RESTART MATRIX: PASS=76 FAIL=0 SKIP=1
```

This is an important Lab methodology rule: **proof state needed after a restart must itself survive the restart**.

## Phase C — full process restart verification

After restarting WorldBox, the probe recovered the same run and verified:

### Kingdom-scoped state

```text
marker
int
Unicode string
bool
float
addon-private kingdom tag
shared kingdom tag
```

### Party-scoped state

```text
party int
party Unicode string
party bool
party float
```

All executed restart assertions passed.

The probe also checked that the kingdom marker did not appear on another discovered kingdom in the same world.

Phase C ended:

```text
PASS=93 FAIL=0 SKIP=1
PHASE C RESULT: PASS
```

## Invalid party behavior

Phase D used a missing party ID.

Getters returned exactly the supplied fallback values:

```text
int
string
bool
float
```

Setters returned `false` for all four types.

This makes missing-party behavior predictable and prevents the test from silently inventing a party record.

## Party lifecycle experiment

The suite searched the loaded kingdoms for a safe lifecycle target and selected an **active, non-ruling party**.

It then:

```text
seeded typed V2 party data
→ verified seed
→ deactivated party
→ resolved it with active=False
→ read int/string/bool/float while inactive
→ reactivated party
→ verified active=True restored
```

Every executed lifecycle assertion passed.

## Final result

```text
PASS=119
FAIL=0
SKIP=1
FINAL GATES: A=PASS B=PASS C=PASS D=PASS
SUITE RESULT: PARTIAL PASS
```

## Why this is still a useful Verified result

`PARTIAL PASS` here means one optional/environment-dependent branch was not executed. It does not erase evidence from the 119 executed assertions.

The missing branch was same-kingdom party-to-party isolation in the original isolation phase: the world did not provide the required second party.

Therefore the evidence boundary is:

```text
✅ executed persistence/restart/lifecycle branches verified
🧪 party-to-party isolation branch still open
```

## What this does not prove

- exact physical save-file layout;
- party A vs party B isolation in one kingdom;
- behavior on other WorldBox/NML/API versions;
- every possible party deletion/removal path;
- automatic safety of mutating the ruling party.

## Evidence

[Sanitized runtime excerpt](/worldbox-modding-docs/evidence/wbml-0003-result.txt)
