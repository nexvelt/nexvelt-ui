import pkg from '../package.json'
import unaUI from '../packages/nuxt/src/module'

export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',

  modules: [
    'nuxt-content-snippet',
    unaUI,
  ],

  devtools: {
    enabled: true,
    componentInspector: false,
  },

  sourcemap: false,

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  experimental: {
    payloadExtraction: true,
  },

  nitro: {
    prerender: {
      routes: [
        '/',
      ],
      ignore: [
        '/components/table',
      ],
    },
  },

  routeRules: {
    '/components': { redirect: '/components/accordion', prerender: false },
  },

  css: [
    '~/styles/index.css',
  ],

  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    // To avoid lagging during page navigation on client-side
    'components:extend': function (components) {
      for (const comp of components) {
        if (comp.global)
          comp.global = 'sync'
      }
    },
  },

  compatibilityDate: '2024-07-17',
})
