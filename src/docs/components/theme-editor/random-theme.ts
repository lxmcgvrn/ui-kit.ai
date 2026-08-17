import type { Intent } from '@ui-kit.ai/theme'

import { INTENTS } from '@ui-kit.ai/theme'

import type { ThemeEditorController } from './use-theme-input'

/** One hue family's tasteful range, so a roll still reads as that intent. */
interface SeedRange {
    chroma: readonly [number, number]
    hue: readonly [number, number]
    lightness: readonly [number, number]
}

/* Ranges follow the shipped presets' own spread, so a roll looks intentional. */
const BRAND_RANGE: SeedRange = { chroma: [0.12, 0.2], hue: [0, 360], lightness: [0.55, 0.78] }
const ERROR_RANGE: SeedRange = { chroma: [0.13, 0.21], hue: [-10, 40], lightness: [0.55, 0.78] }
const SUCCESS_RANGE: SeedRange = { chroma: [0.1, 0.16], hue: [140, 180], lightness: [0.55, 0.78] }
const WARNING_RANGE: SeedRange = { chroma: [0.07, 0.15], hue: [65, 105], lightness: [0.83, 0.94] }

/** Rolls a random palette into the controller, the same way picking a preset does. */
export function applyRandomTheme(controller: ThemeEditorController) {
    const colors = randomThemeColors()

    for (const intent of INTENTS) {
        controller.setColor(intent, 'light', colors[intent])
        // Starts both schemes aligned — no stale hand-picked dark seed left behind.
        controller.clearDarkSeed(intent)
    }
}

/** A fresh seed per intent — default and info share a brand roll, as presets do. */
export function randomThemeColors(): Record<Intent, string> {
    const brand = randomSeed(BRAND_RANGE)

    return {
        default: brand,
        error: randomSeed(ERROR_RANGE),
        info: brand,
        success: randomSeed(SUCCESS_RANGE),
        warning: randomSeed(WARNING_RANGE),
    }
}

function randomBetween([min, max]: readonly [number, number]): number {
    return min + Math.random() * (max - min)
}

function randomSeed({ chroma, hue, lightness }: SeedRange): string {
    const l = randomBetween(lightness).toFixed(4)
    const c = randomBetween(chroma).toFixed(4)
    const h = (((randomBetween(hue) % 360) + 360) % 360).toFixed(2)

    return `oklch(${l} ${c} ${h})`
}
