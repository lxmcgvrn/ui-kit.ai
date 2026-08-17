import type { ThemeInput } from './palette'

/** A theme the editor can start from, named for the picker. */
export interface Preset {
  input: ThemeInput
  label: string
  name: string
}

export const DEFAULT_THEME: ThemeInput = {
  colors: {
    default: 'oklch(0.5438 0.191 267.01)',
    error: 'oklch(0.6284 0.1949 13.15)',
    info: 'oklch(0.5438 0.191 267.01)',
    success: 'oklch(0.6422 0.115 170.73)',
    warning: 'oklch(0.8537 0.1572 84.13)',
  },
}

export const PRESETS: readonly Preset[] = [
  {
    input: {
      colors: {
        default: 'oklch(0.7888 0.1434 56.21)',
        error: 'oklch(0.7794 0.131 34.91)',
        info: 'oklch(0.7888 0.1434 56.21)',
        success: 'oklch(0.5229 0.0973 148.32)',
        warning: 'oklch(0.9178 0.0636 87.27)',
      },
    },
    label: 'Autumnal',
    name: 'autumnal',
  },
  {
    input: {
      colors: {
        default: 'oklch(0.5365 0.0875 172.23)',
        error: 'oklch(0.5716 0.1702 32.92)',
        info: 'oklch(0.5365 0.0875 172.23)',
        success: 'oklch(0.5365 0.0875 172.23)',
        warning: 'oklch(0.8238 0.1259 74.94)',
      },
    },
    label: 'Boreal',
    name: 'boreal',
  },
  {
    input: {
      colors: {
        default: 'oklch(0.7642 0.1257 249.46)',
        error: 'oklch(0.7825 0.1338 4.74)',
        info: 'oklch(0.7642 0.1257 249.46)',
        success: 'oklch(0.7886 0.1467 175.73)',
        warning: 'oklch(0.9415 0.0748 101.11)',
      },
    },
    label: 'Glacial',
    name: 'glacial',
  },
  {
    input: {
      colors: {
        default: 'oklch(0.1776 0 0)',
        error: 'oklch(0.5436 0.1458 21.76)',
        info: 'oklch(0.1776 0 0)',
        success: 'oklch(0.6406 0.1329 157.68)',
        warning: 'oklch(0.8537 0.1572 84.13)',
      },
    },
    label: 'Neutral',
    name: 'neutral',
  },
  {
    input: {
      colors: {
        default: 'oklch(0.338 0.1047 341.18)',
        error: 'oklch(0.6341 0.213 1.28)',
        info: 'oklch(0.338 0.1047 341.18)',
        success: 'oklch(0.7886 0.1467 175.73)',
        warning: 'oklch(0.9415 0.0748 101.11)',
      },
    },
    label: 'Nocturnal',
    name: 'nocturnal',
  },
  {
    input: DEFAULT_THEME,
    label: 'Professional',
    name: 'professional',
  },
]
