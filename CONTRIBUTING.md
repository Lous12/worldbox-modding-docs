# Contributing

WorldBox Modding Docs is intended to document reproducible, version-aware modding knowledge.

Before adding a technical claim, try to identify how it was established:

- **Verified** — directly tested and reproduced.
- **Observed** — seen in runtime behavior or logs, but not yet fully explained.
- **Inferred** — a conclusion based on observations.
- **Experimental** — a working approach that still needs wider testing.
- **Failed** — a known incorrect or unsafe approach worth documenting.
- **Outdated** — information retained for older WorldBox or NeoModLoader versions.

Code/API names, class names, method names, log excerpts, and file names should not be translated. Explanatory prose can be localized.

## Before submitting changes

- Keep English and Russian page structure in parity unless a difference is intentional and documented.
- Prefer task-first explanations for beginner pages: goal → minimal example → expected result → common failure → evidence boundary.
- Do not publish raw local paths, Steam/account identifiers, or other personal data in evidence files.
- Do not promote a skipped or unexecuted WBML branch to Verified.
- Keep older source snapshots clearly separated from newer runtime evidence.
- Run `npm run audit` before pushing. The same audit is enforced by the GitHub Pages workflow.
