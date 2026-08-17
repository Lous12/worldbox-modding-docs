# v0.3.0 release checklist

This release turns WBML 0.2.0–0.6.0 into the agreed human + machine knowledge architecture.

## Automated/source checks

- [ ] `package.json` version is `0.3.0`.
- [ ] Top changelog entry is `0.3.0`.
- [ ] `npm run audit` passes in the full repository.
- [ ] EN/RU documentation parity passes.
- [ ] Internal documentation routes pass the audit.
- [ ] Required `title` / `description` frontmatter passes.
- [ ] Markdown code fences are balanced.
- [ ] Public evidence and `public/data/wbml` pass privacy-pattern scanning.
- [ ] `public/data/wbml/manifest.json` resolves all five canonical raw atlases.
- [ ] Manifest suite/probe/run/schema values match each raw JSON export.
- [ ] `public/llms.txt` and `public/llms-full.txt` exist and mark the 0.2–0.6 baseline/version boundaries.
- [ ] Quick Docs never promote OBSERVED/SKIP/UNSAFE/UNKNOWN into a stronger status.
- [ ] 0.6.0 fix1–fix4 are mentioned only as rejected/superseded methodology, not current lifecycle truth.
- [ ] Planned WorldBox Modding API is explicitly marked **not released / design only**.

## Manual knowledge checks

- [ ] Open Quick Actor → Detailed Actor → WBML-0300/0400/0600 evidence links.
- [ ] Open Quick Kingdom and confirm the zero-city result says “120-frame bounded window”, not “persists forever”.
- [ ] Open Quick Building and confirm `Building.kill()` is not described as immediate manager removal.
- [ ] Open parameterized-query docs and confirm OBSERVED-THREW wording refers to the exact argument set.
- [ ] Open Safe Mutation docs and confirm only the 19 tested scalar transactions are promoted to Verified-Reversible.
- [ ] API Explorer shows both PoliticalWorldAPI and WorldBox/WBML entries with item-specific scope.

## After pushing to `main`

- [ ] GitHub Actions completes the audit + Astro production build.
- [ ] GitHub Pages deploys successfully.
- [ ] Test English and `/ru/` Quick Docs / Detailed API / Research / AI routes.
- [ ] Test API Explorer search and filters on desktop + one narrow/mobile viewport.
- [ ] Confirm machine-data URLs under `/worldbox-modding-docs/data/wbml/` load.
- [ ] Confirm DonationAlerts and DALink remain unchanged.

## Release rule

Frontend bugs do not rewrite WBML conclusions. Ship a site hotfix if needed; keep canonical runtime evidence immutable unless a new research run supersedes it.


## v0.4.0 / WBML 1.0 frozen baseline
- [ ] Canonical 0700/0800/0900 JSON and sanitized evidence are present.
- [ ] manifest.json passes LF-normalized integrity checks for eight canonical suites.
- [ ] 1000-practical-modding-baseline.json is present and marked consolidation, not runtime suite.
- [ ] EN/RU Research, Detailed, Quick and AI pages remain in parity.
- [ ] `npm run audit` and `npm run build` pass before deployment.
