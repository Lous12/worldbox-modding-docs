---
title: PoliticalWorld runtime evidence rules for AI
description: Strict rules for using WBML-0001 through WBML-0005 without widening version or evidence scope.
---

<span class="doc-status">🤖 AI rule set</span>
<span class="doc-status">WBML-0001…0005</span>

Use these rules when generating Political World addon code or explaining PoliticalWorldAPI behavior.

## 1. Keep source and runtime versions separate

The inspected creator source identifies itself as API 1.9.0. The Lab runtime evidence through WBML-0005 used API 1.14.0.

Do not write:

```text
source 1.9 says X, therefore runtime 1.14 must do X
```

When runtime evidence contradicts the older source, preserve both with their version scopes.

## 2. `PARTIAL PASS` does not invalidate executed assertions

If:

```text
FAIL=0
SKIP>0
```

then executed PASS branches can be promoted within their evidence scope. SKIP branches remain unverified.

Never convert a SKIP into Verified by association.

## 3. Party-private persistence is now runtime Verified for executed WBML-0003 branches

AI may state, for the exact tested stack, that party int/string/bool/float values returned after a full process restart and remained readable during the tested inactive/reactivate lifecycle.

AI must not state that same-kingdom party-to-party isolation was verified by WBML-0003.

## 4. Event Bus runtime 1.14.0 differs from the older source snapshot

AI may state for the tested runtime:

- `GetEventIds()` returned 23 IDs;
- the unique custom/unknown event subscription used by WBML was accepted and removable;
- tested `party.renamed` values mapped through `OldValue/NewValue`;
- per-subscriber payload-object mutation was isolated;
- one throwing callback did not stop a healthy callback;
- recursive test dispatch stopped at 16;
- 100 accepted test dispatches produced 100 callbacks.

AI must not claim every event payload uses `OldValue/NewValue`.

## 5. Same-ID action registration is replacement behavior in tested runtime 1.14.0

AI may warn that re-registering the same action ID replaced the previous definition in WBML-0005.

Do not generalize this to every future API version.

## 6. Re-query live political state

Do not treat `PartyInfo` or similar DTO/info objects captured earlier as guaranteed-current state.

If logic depends on a current support/radicalism/active/ruling value, prefer a fresh public API lookup.

## 7. Single-party support is a safety boundary

AI must not generate advice that assumes `SetPartySupport` always assigns the exact requested value.

Evidence supports only:

```text
👁 single-active-party path normalized the lone party to 100 in the observed run
🧪 exact multi-party support mutation/restoration still unverified
```

If exact support mutation matters, require a controlled multi-party test or current verified documentation.

## 8. Cleanup is part of the experiment

A cleanup/finalizer call can mutate state and invalidate the result.

Do not recommend restoring an old snapshot blindly if the setter itself has state-dependent normalization behavior.

## 9. Diagnostics counters are not always the live registry

WBML-0005 observed live `GetActionsByAddon` count 0 while diagnostics reported 2 registered actions after replacement history.

Treat this as an observed bookkeeping mismatch. Do not use that diagnostics counter alone as authoritative proof of live action objects.

## 10. Timing observations are not guarantees

WBML-0004 observed 100 dispatches/callbacks in 33 ms on one run.

Do not turn that into a performance SLA or general benchmark.

## 11. Prefer stable IDs over display names or list positions

Persistent party state is tied to party identity. Do not generate persistence code keyed by translated/display names or party list indexes.

## 12. If evidence is missing, say so

When asked about an untested branch:

```text
state the gap
state the closest verified evidence
propose a focused probe
```

Do not invent an API contract to make the answer look complete.
