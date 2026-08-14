import type { DEFAULT_COLOR_PALETTE_INPUT } from './palette'
import type { PRESETS } from './presets'
export { ColorPalette, DEFAULT_COLOR_PALETTE_INPUT } from './palette'
export { PRESETS } from './presets'
export { Color, type ColorPaletteInput } from './types'

// Explicit: the `.dts` bundle otherwise drops these.
export type DefaultColorPaletteInput = typeof DEFAULT_COLOR_PALETTE_INPUT
export type Presets = typeof PRESETS
