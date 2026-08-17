import type { Scheme, SeedColor } from '@ui-kit.ai/theme'
import type { Color as RACColor } from 'react-aria-components'

import { formatOklch } from '@ui-kit.ai/theme'
import { converter, formatRgb, parse } from 'culori'

/** Stands in for a color that will not parse, which the editor never stores. */
const FALLBACK = 'rgb(0, 0, 0)'

const toOklch = converter('oklch')

/** A dark seed of its own, rather than the light one carried over. */
export function hasOwnDarkSeed(seed: SeedColor) {
    return typeof seed !== 'string'
}

/** The seed a scheme paints from — a lone string serves both. */
export function seedFor(seed: SeedColor, scheme: Scheme) {
    return typeof seed === 'string' ? seed : seed[scheme]
}

/** The sRGB syntax that swatches and sliders read, which is as far as they get. */
export function toCssColor(color: string) {
    const parsed = parse(color)

    return parsed == null ? FALLBACK : formatRgb(parsed)
}

/** The oklch the theme carries, or nothing when the text is not a color. */
export function toThemeColor(color: string) {
    const parsed = toOklch(color)

    return parsed == null ? undefined : formatOklch(parsed)
}

/** A hex carries no alpha, so the opacity the colour already had rides along. */
export function withAlphaFrom(color: RACColor, source: RACColor) {
    return color.withChannelValue('alpha', source.getChannelValue('alpha'))
}

/** One scheme's new seed. Aiming the dark one splits the pair in two. */
export function withSeed(seed: SeedColor, scheme: Scheme, color: string): SeedColor {
    if (scheme === 'light' && typeof seed === 'string') return color

    const pair = typeof seed === 'string' ? { dark: seed, light: seed } : seed

    return { ...pair, [scheme]: color }
}
