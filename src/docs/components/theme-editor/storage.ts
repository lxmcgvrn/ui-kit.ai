import type { ThemeInput } from '@ui-kit.ai/theme'

import { DEPTHS, INTENTS, SATURATIONS } from '@ui-kit.ai/theme'

const STORAGE_KEY = 'ui-kit.theme'

export function clearStoredTheme() {
    if (typeof localStorage === 'undefined') return

    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch {
        // Storage is unavailable (private mode, blocked cookies) — nothing to do.
    }
}

export function readStoredTheme(): null | ThemeInput {
    if (typeof localStorage === 'undefined') return null

    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw == null) return null

        const parsed: unknown = JSON.parse(raw)

        return isThemeInput(parsed) ? parsed : null
    } catch {
        return null
    }
}

export function writeStoredTheme(input: ThemeInput) {
    if (typeof localStorage === 'undefined') return

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(input))
    } catch {
        // Storage is unavailable (private mode, blocked cookies) — nothing to do.
    }
}

function isThemeInput(value: unknown): value is ThemeInput {
    if (typeof value !== 'object' || value == null) return false

    const { colors, depth, radius, saturation } = value as Record<string, unknown>

    if (typeof radius !== 'number' || Number.isNaN(radius)) return false
    if (typeof colors !== 'object' || colors == null) return false

    // Themes saved before a knob existed are still good; they take the default.
    if (depth != null && !DEPTHS.some((candidate) => candidate === depth)) return false
    if (saturation != null && !SATURATIONS.some((candidate) => candidate === saturation)) {
        return false
    }

    const seeds = colors as Record<string, unknown>

    return INTENTS.every((intent) => typeof seeds[intent] === 'string')
}
