# WorldBox Modding Docs

Community-driven documentation, research, examples, and troubleshooting for WorldBox modding and NeoModLoader.

The project is built with Astro + Starlight as a multilingual modding workbench: beginner routes, practical browser tools, searchable reference, troubleshooting, and evidence-backed research for humans and AI assistants.

## Current foundation

- English root documentation
- Russian localization
- Built-in full-text search
- Practical Workbench: local Player.log Analyzer 2.0, Starter Mod Generator, API Explorer and Compatibility Matrix
- Task-first Recipe Library with dedicated beginner-friendly step-by-step pages
- Goal-oriented beginner home page and first-mod route
- GitHub Pages deployment workflow
- Dark/light theme support
- GitHub edit links
- Dedicated sections for research, troubleshooting, case studies, AI documentation, and failed approaches
- Evidence-status system for verified, observed, experimental, inferred, failed, and outdated findings
- Real research extracted from Political World and TerraForge
- AI-facing `llms.txt`

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Repository structure

```text
src/content/docs/       Documentation pages
src/content/docs/ru/    Russian translations
src/styles/             Site-specific styles
public/                  Static files and AI-facing resources
.github/workflows/       GitHub Pages deployment
```

## Support

WorldBox Modding Docs is free and open.

If the documentation or research saves you time, optional support helps fund more experiments, compatibility checks and maintenance:

- DonationAlerts: https://www.donationalerts.com/r/lous12
- DALink: https://dalink.to/lous12

There is no paid documentation tier.

## Project status

Active research and documentation project. The knowledge base is being expanded through source archaeology, reproducible failures, runtime probes, compatibility testing, and the WorldBox Modding Lab.
