import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://lous12.github.io',
  base: '/worldbox-modding-docs',
  integrations: [
    starlight({
      title: 'WorldBox Modding Docs',
      description:
        'Community-driven documentation, research, examples and troubleshooting for WorldBox modding and NeoModLoader.',
      favicon: '/worldbox-modding-docs/favicon.svg',
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        ru: {
          label: 'Русский',
          lang: 'ru',
        },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Lous12/worldbox-modding-docs',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/Lous12/worldbox-modding-docs/edit/main/',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Start here',
          translations: { ru: 'Начать здесь' },
          items: [{ slug: 'getting-started' }],
        },
        {
          label: 'Recipes',
          translations: { ru: 'Рецепты' },
          items: [{ slug: 'recipes' }],
        },
        {
          label: 'Guides',
          translations: { ru: 'Гайды' },
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Workbench',
          translations: { ru: 'Инструменты' },
          items: [{ autogenerate: { directory: 'workbench' } }],
        },
        {
          label: 'Fix a problem',
          translations: { ru: 'Починить проблему' },
          items: [{ autogenerate: { directory: 'troubleshooting' } }],
        },
        {
          label: 'Reference',
          translations: { ru: 'Справочник' },
          items: [{ autogenerate: { directory: 'api' } }],
        },
        {
          label: 'Research & evidence',
          translations: { ru: 'Исследования и доказательства' },
          items: [
            { autogenerate: { directory: 'research' } },
            { autogenerate: { directory: 'case-studies' } },
          ],
        },
        {
          label: 'For AI',
          translations: { ru: 'Для ИИ' },
          items: [{ autogenerate: { directory: 'ai' } }],
        },
        {
          label: 'More',
          translations: { ru: 'Ещё' },
          items: [
            { autogenerate: { directory: 'faq' } },
            { autogenerate: { directory: 'graveyard' } },
            { slug: 'support' },
          ],
        },
      ],
    }),
  ],
});
