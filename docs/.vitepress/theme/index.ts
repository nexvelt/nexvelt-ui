import { h, watchEffect } from 'vue'
import Theme from 'vitepress/theme'
import { useStorage } from '@vueuse/core'
import type { ThemeColors } from '../../types'

import 'virtual:uno.css'
import '@nexvelt/ui-preset/style.css'
import '@unocss/reset/tailwind-compat.css'

import './color-transition.css'
import './transition.css'
import './vars.css'
import './override.css'

import TeamMember from './components/TeamMember.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import AppExemplar from './components/AppExemplar.vue'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const NVComponents = import.meta.glob('../../../packages/ui-nuxt/src/runtime/components/forms/*.vue', { eager: true })
// const NVElements = import.meta.glob('../../../packages/ui-nuxt/src/runtime/components/elements/*.vue', { eager: true })

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const ExampleVueInputComponents = import.meta.glob('../../components/examples/vue/input/*.vue', { eager: true })
// import SponsorButton from './components/SponsorButton.vue'

let nexveltUIStyle: HTMLStyleElement | undefined

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(TeamMember),
      'nav-bar-content-after': () => h(ThemeSwitcher),
      // 'aside-top': () => h(SponsorButton),
    })
  },
  // this hook is called before the root Vue app is mounted to the DOM.
  enhanceApp({ app }) {
    // register exemplar components
    app.component('AppExemplar', AppExemplar)

    // register input vue components from examples
    for (const path in ExampleVueInputComponents) {
      const mod = ExampleVueInputComponents[path]
      const name = path.match(/\/([^/]+)\.vue$/)![1]
      app.component(`ExampleVueInput${name}`, mod.default)
    }

    // register components from @nexvelt/ui-nuxt
    for (const path in NVComponents) {
      const mod = NVComponents[path]
      const name = path.match(/\/([^/]+)\.vue$/)![1]
      app.component(`NV${name}`, mod.default)
    }

    if (typeof window === 'undefined')
      return

    const settings = useStorage('nv-settings', {
      primaryColors: undefined as ThemeColors | undefined,
      grayColors: undefined as ThemeColors | undefined,
      fontSize: 15,
    })

    nexveltUIStyle = document.createElement('style')
    nexveltUIStyle.id = 'nexvelt-ui'
    document.head.appendChild(nexveltUIStyle)

    watchEffect(() => {
      const styleTag = document.getElementById('nexvelt-ui')
      if (styleTag) {
        styleTag.innerHTML = `
      :root {
          --font-size: ${settings.value.fontSize}px;
          ${Object.entries(settings.value.primaryColors || {}).map(([k, v]) => `${k}: ${v};`).join('\n')}
          ${Object.entries(settings.value.grayColors || {}).map(([k, v]) => `${k}: ${v};`).join('\n')}
      }
      `.replace(/\s*\n+\s*/g, '')
      }
    })
  },
}
