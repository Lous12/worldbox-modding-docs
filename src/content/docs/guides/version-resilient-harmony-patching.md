---
title: Version-resilient Harmony patch discovery
description: A defensive Harmony patching pattern extracted from Political World's WorldBox integration.
---

<span class="doc-status">✅ Source verified pattern</span>
<span class="doc-status">⚠️ Version-sensitive area</span>
<span class="doc-status">WorldBox 0.51.2 build 719</span>

Harmony lets a mod alter game behavior without replacing the whole game method, but a patch is only useful if the mod finds the **correct method and overload** on the installed WorldBox build.

Political World's integration code uses several defensive techniques instead of assuming one forever-stable method name.

## 1. Keep WorldBox integration isolated

Political World places these patches under:

```text
Core/Integration/WorldBox/
```

This is intentionally treated as compatibility-sensitive code.

That makes version review easier: after a WorldBox update, integration code can be audited without confusing it with unrelated political simulation code.

## 2. Try known method-name fallbacks

For the city army capacity multiplier, the inspected source tries:

```text
getArmyMaxMultiplier
getArmyMaxTotalPercentage
getArmyMaxPercentage
getArmyMaxTotalPercent
getArmyLimitPercentage
getArmyLimitPercent
```

The source comment identifies `getArmyMaxMultiplier` as the actual final multiplier on WorldBox 0.51.2 build 719 while retaining older names as compatibility fallbacks.

This is more robust than:

```csharp
AccessTools.Method(typeof(City), "oneNameForever");
```

with no validation.

## 3. Filter overloads

Political World's helper scans methods and checks the parameter count before selecting a target.

Another helper accepts an explicit expected parameter count for methods such as `City.getLoyalty`.

Why?

Two methods with the same name can have different signatures. Patching the wrong overload can fail at load time or, worse, patch behavior you did not intend.

A stronger production implementation may also compare parameter **types** and return type when necessary.

## 4. Fail with diagnostics, not silence

If the expected army method cannot be patched, Political World scans `City` methods whose names contain `army` and logs candidate name, parameter count and return type.

That turns an update breakage from:

```text
"my mod stopped working"
```

into something closer to:

```text
"the expected method disappeared; these are the nearby candidates on this build"
```

This is exactly the information needed for a compatibility update.

## 5. Do not let an optional bonus break vanilla calculations

Several Postfix bodies wrap Political World's extra behavior in `try/catch`.

The source comments explicitly state that an error in a political bonus should not interrupt WorldBox's main army/stat calculation.

This is an important modding rule:

> If your patch adds an optional modifier, prefer degrading to “modifier missing” over breaking the vanilla system.

## Simplified helper

```csharp
static MethodInfo FindMethod(
    Type type,
    string[] candidateNames,
    int parameterCount)
{
    MethodInfo[] methods = type.GetMethods(MemberFlags);

    foreach (string name in candidateNames)
    {
        foreach (MethodInfo method in methods)
        {
            if (method.Name == name &&
                method.GetParameters().Length == parameterCount)
            {
                return method;
            }
        }
    }

    return null;
}
```

Then log clearly if the target is absent before calling `Harmony.Patch(...)`.

## Important limitation

Method-name fallback is not magic compatibility.

A method can keep the same name while changing semantics.

After a game update, you still need:

1. target discovery;
2. signature validation;
3. runtime behavior test;
4. log confirmation;
5. gameplay verification.

Fallback names only make discovery and graceful failure better.

## AI rule

An AI assistant should never invent a WorldBox method name merely because it sounds plausible.

If the current documentation does not verify a target:

- inspect the type;
- list candidates;
- verify signature;
- run a minimal patch/probe;
- only then mark it as supported.
