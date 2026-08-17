# Contributing

WorldBox Modding Docs documents reproducible, version-aware modding knowledge. A plausible API name is not evidence.

## Evidence labels

- **Verified** — directly tested and reproduced within a named evidence scope.
- **Observed** — seen at runtime/log/export but not promoted to a stronger guarantee.
- **Verified-Reversible** — a controlled mutation produced the expected delta and exact restore with no residual/collateral fields in the tested transaction.
- **Verified-Lifecycle** — the natural lifecycle path removed the entity from pinned manager/owner/registry evidence and stale-read checks passed.
- **Verified-Nonterminal-Window** / **Verified-Empty-Registered-Window** — bounded negative lifecycle evidence; never rewrite it as permanent persistence.
- **Observed-Threw** — the exact exported invocation/argument set threw; do not rewrite it as “method is broken”.
- **Inferred** — evidence-backed conclusion without direct verification.
- **Experimental** — a working approach awaiting a stronger probe.
- **Failed assumption** — a wrong harness/source assumption preserved as negative knowledge.
- **Unsafe** — intentionally excluded from automatic invocation or shown to be unsafe in the tested approach.
- **Unknown / research-needed** — current canonical evidence does not answer it.
- **Outdated** — retained for an older WorldBox/NML/runtime scope.

## Knowledge-ingestion rule

For a completed WBML batch, use this order:

```text
canonical evidence
→ analyze the full result
→ Detailed Docs (source of truth)
→ Quick Docs (convenience layer)
→ machine data / AI rules
```

A research result is not fully integrated if only one of those layers was updated. Site releases may batch two or three WBML research versions, but the layers for the batch should land together.

## Canonical-run policy

- Publish the final corrected WBML export as canonical machine data.
- Preserve superseded runs in Research when they teach a methodology/pitfall lesson.
- Never let a rejected harness result become public capability truth.
- Do not rerun a closed suite only to make documentation prettier. Re-run when the WorldBox/NML baseline changes or when the research question genuinely changes.
- A SKIP or unresolved argument is an evidence boundary, not an implicit PASS.

## Writing rules

- Keep English and Russian page paths in parity unless a difference is intentional and documented.
- Code/API/class/method names, log excerpts and file names are not translated.
- Beginner/Quick pages should be task-first: goal → smallest useful example → requirements → caveat → deep/evidence links.
- Detailed pages should include, where evidence exists: exact signature, runtime owner/source, sample provenance, IL/read classification, invocation result, result type/kind, access, stability, preconditions, lifecycle/save-load caveats, exceptions and WBML evidence.
- If the evidence does not support a claim, write `research-needed` and link/propose a focused probe instead of guessing.
- Planned WorldBox Modding API examples are design sketches only until the dependency mod actually exists.

## Privacy and release checks

- Never publish raw local paths, Steam/account identifiers or personal data in `public/evidence` or `public/data/wbml`.
- Keep source snapshots separate from newer runtime evidence.
- Run `npm run audit` before pushing; GitHub Pages runs the same audit before build.
