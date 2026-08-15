# WorldBox Modding Docs

Community-driven documentation, research, examples, and troubleshooting for WorldBox modding and NeoModLoader.

The project is built with Astro + Starlight and is designed to become a multilingual, searchable knowledge base for both human modders and AI assistants.

## Current foundation

- English root documentation
- Russian localization
- Built-in full-text search
- GitHub Pages deployment workflow
- Dark/light theme support
- GitHub edit links
- Dedicated sections for research, troubleshooting, case studies, AI documentation, and failed approaches

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

## Project status

Early foundation. The first documentation content will be extracted from existing WorldBox mod projects and verified research.
