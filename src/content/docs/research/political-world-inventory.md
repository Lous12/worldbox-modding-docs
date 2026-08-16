---
title: Political World research inventory
description: A living map of documentation topics that can be extracted from Political World.
---

<span class="doc-status">📦 Source project inventory</span>
<span class="doc-status">Living document</span>

Political World is currently one of the largest sources of real-world material for this documentation project.

This page tracks **what knowledge can be extracted from it** and what still needs a focused probe before being promoted to a technical guide.

## Already documented

### Government initialization recursion
A real `StackOverflow` caused by a getter/setter initialization cycle.

- [Case study](../case-studies/political-world-government-recursion/)
- [Troubleshooting pattern](../troubleshooting/stack-overflow-recursive-initialization/)

### Event-feed throttling
Quiet Feed separated simulation events from player-visible notifications.

- [Case study](../case-studies/political-world-quiet-feed/)

## High-value areas to extract next

| Area | Potential documentation | Current state |
| --- | --- | --- |
| Government forms | initialization, transitions, public IDs, missing-state handling | partially documented |
| Ideology system | trees, evolution, events, UI representation | needs source inventory |
| Political parties | party state, naming, elections, display | needs source inventory |
| Elections | election flow, cooldowns, event output | needs focused extraction |
| Councils / soviets | alternative governance structures | design exists; implementation status must be checked |
| Repressions / purges | generic authoritarian mechanics | implementation status must be checked |
| War flow | declaration phase, surprise attacks, war-ending rules | needs source inventory |
| International blocs | overlay on vanilla alliances, summits, decisions | implementation status must be checked |
| Summit events | physical leader gathering and notification flow | partially represented in event system |
| Eternal leader | race-relative longevity / succession interaction | implementation status must be checked |
| API layer | reusable Political World API for addons | requires code/API inventory |
| Addon compatibility | Scenario Tools and future addons | requires concrete dependency examples |
| Save compatibility | persistence of political state | requires targeted save/load tests |
| Performance | political update loops and world-size scaling | requires profiling |
| Localization | ideology, party and government names | requires localization source inventory |

## Important rule

A mechanic being **planned or discussed** is not the same as a mechanic being **implemented and verified**.

This inventory intentionally keeps those states separate.

Before turning any topic above into a technical guide, we should identify:

1. the exact project version;
2. the relevant source files;
3. runtime entry points;
4. data that persists across save/load;
5. logs or a minimal test scenario;
6. failure modes already encountered.

## Why unfinished systems still matter

Even an abandoned or incomplete mechanic can document:

- a failed architecture;
- an API discovery;
- a lifecycle problem;
- a compatibility issue;
- a useful probe;
- a performance bottleneck.

We extract the knowledge without pretending the feature itself was complete.
