# v0.2.0 release checklist

Use this before promoting the Workbench redesign from beta to v0.2.0.

## Automated

- [ ] `npm run audit` passes.
- [ ] `npm run build` passes on GitHub Actions.
- [ ] GitHub Pages deploy succeeds.

## Beginner route

- [ ] English and Russian home pages open without missing artwork.
- [ ] Start Here → First-mod checklist → Starter Mod Generator → first-mod recipe is navigable in both languages.
- [ ] Troubleshooter → Player.log Analyzer → relevant troubleshooting guide works in both languages.
- [ ] Recipe Finder and API Explorer filters/reset controls work on desktop and mobile.
- [ ] Player.log drag-and-drop works and does not upload the selected file.

## Documentation quality

- [ ] EN/RU page parity is intentional.
- [ ] Every technical claim has an evidence status and version boundary where needed.
- [ ] No skipped WBML branch is presented as Verified.
- [ ] No old source snapshot is described as PoliticalWorldAPI 1.14 runtime behavior without runtime evidence.
- [ ] Public evidence contains no local user paths, Steam IDs or other personal identifiers.

## UX & accessibility

- [ ] Keyboard focus is visible on major interactive controls.
- [ ] Light and dark themes are readable.
- [ ] Main flows fit narrow/mobile screens without horizontal page overflow.
- [ ] Temporary PNG concepts can be replaced via stable filenames without changing page code.

## Release

- [ ] Update `package.json` to `0.2.0`.
- [ ] Add the final `0.2.0` changelog entry.
- [ ] Re-run audit/build after the version bump.
