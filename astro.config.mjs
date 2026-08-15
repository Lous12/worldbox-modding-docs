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
          translations: { ru: 'Начало' },
          items: [{ slug: 'getting-started' }],
        },
        {
          label: 'Guides',
          translations: { ru: 'Руководства' },
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'API Reference',
          translations: { ru: 'Справочник API' },
          items: [{ autogenerate: { directory: 'api' } }],
        },
        {
          label: 'Troubleshooting',
          translations: { ru: 'Решение проблем' },
          items: [{ autogenerate: { directory: 'troubleshooting' } }],
        },
        {
          label: 'Research',
          translations: { ru: 'Исследования' },
          items: [{ autogenerate: { directory: 'research' } }],
        },
        {
          label: 'Case Studies',
          translations: { ru: 'Разборы проектов' },
          items: [{ autogenerate: { directory: 'case-studies' } }],
        },
        {
          label: 'FAQ',
          translations: { ru: 'FAQ' },
          items: [{ autogenerate: { directory: 'faq' } }],
        },
        {
          label: 'For AI',
          translations: { ru: 'Для ИИ' },
          items: [{ autogenerate: { directory: 'ai' } }],
        },
        {
          label: 'Graveyard of Bad Ideas',
          translations: { ru: 'Кладбище плохих идей' },
          items: [{ autogenerate: { directory: 'graveyard' } }],
        },
      ],
    }),
  ],
});
