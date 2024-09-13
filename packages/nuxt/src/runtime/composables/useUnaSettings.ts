import { useStorage } from '@vueuse/core'
import { watchEffect } from 'vue'
import { defu } from 'defu'
import { useAppConfig } from 'nuxt/app'
import type { UnaSettings } from '../types'
import { useUnaThemes } from './useUnaThemes'

export function useUnaSettings() {
  const { una } = useAppConfig()
  const { getPrimaryColors, getGrayColors } = useUnaThemes()

  const defaultSettings: UnaSettings = {
    primaryColors: getPrimaryColors(una.primary),
    grayColors: getGrayColors(una.gray),
    primary: una.primary,
    gray: una.gray,
    radius: una.radius,
    fontSize: una.fontSize,
  } as const

  const settings = useStorage<UnaSettings>('una-settings', defaultSettings, undefined, {
    mergeDefaults: defu,
  })

  watchEffect(() => {
    settings.value.primaryColors = getPrimaryColors(settings.value.primary || una.primary)
    settings.value.grayColors = getGrayColors(settings.value.gray || una.gray)
  })

  function reset() {
    settings.value.primary = defaultSettings.primary
    settings.value.gray = defaultSettings.gray
    settings.value.fontSize = defaultSettings.fontSize
    settings.value.radius = defaultSettings.radius
  }

  return {
    defaultSettings,
    settings,
    reset,
  }
}
