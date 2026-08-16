# v0.2.0 release checklist

This checklist is intentionally split between checks that can be proved from the source tree and checks that require the deployed GitHub Pages build.

## Automated/source checks

- [x] `package.json` version is `0.2.0`.
- [x] Top changelog entry is `0.2.0`.
- [x] `npm run audit` passes.
- [x] EN/RU documentation parity passes.
- [x] Internal documentation routes pass the audit.
- [x] Required `title` / `description` frontmatter passes.
- [x] Markdown code fences are balanced.
- [x] Referenced homepage artwork exists.
- [x] Public evidence passes the privacy-pattern scan.
- [x] No new npm dependency was added for the final promotion.
- [x] No runtime/WBML evidence boundary was widened for the website release.

## After pushing to `main`

- [ ] GitHub Actions completes the Astro production build.
- [ ] GitHub Pages deployment completes successfully.
- [ ] Open the English home page and test Start / Recipes / Tools / Troubleshooting.
- [ ] Open `/ru/` and test the same four routes.
- [ ] Drop a real `Player.log` into the Analyzer and confirm local analysis still runs.
- [ ] Open the Starter Mod Generator and confirm generation/copy actions still work.
- [ ] Test at least one narrow/mobile viewport.
- [ ] Confirm DonationAlerts and DALink buttons point to the intended destinations.

## Release rule

If the deployed build exposes a regression, keep the `0.2.0` evidence claims unchanged and ship a website-only `0.2.0.x` hotfix. Do not rewrite runtime conclusions to compensate for a frontend bug.
