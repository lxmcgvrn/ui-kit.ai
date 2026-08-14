import type { ThemeInput } from '@ui-kit.ai/theme'

import { INTENTS, THEME_SETTINGS } from '@ui-kit.ai/theme'

const STORAGE_KEY = 'ui-kit.theme'

export function clearStoredTheme() {
    tolerateBlockedStorage(() => {
        localStorage.removeItem(STORAGE_KEY)
    })
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
    tolerateBlockedStorage(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(input))
    })
}

/** Themes saved before a knob existed are still good; they take the default. */
function isKnownSetting(value: unknown) {
    return value == null || THEME_SETTINGS.some((setting) => setting === value)
}

function isThemeInput(value: unknown): value is ThemeInput {
    if (typeof value !== 'object' || value == null) return false

    const { colors, depth, radius, saturation } = value as Record<string, unknown>

    if (radius != null && (typeof radius !== 'number' || Number.isNaN(radius))) return false
    if (typeof colors !== 'object' || colors == null) return false
    if (!isKnownSetting(depth) || !isKnownSetting(saturation)) return false

    const seeds = colors as Record<string, unknown>

    return INTENTS.every((intent) => typeof seeds[intent] === 'string')
}

/** Storage throws in private mode and with cookies blocked. */
function tolerateBlockedStorage(write: () => void) {
    if (typeof localStorage === 'undefined') return

    try {
        write()
    } catch {
        // The theme does not survive a reload, which is the whole cost.
    }
}
