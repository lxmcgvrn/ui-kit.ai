import type { ThemeInput } from '@ui-kit.ai/theme'

import { INTENTS, SCHEMES, THEME_SETTINGS, TOKENS } from '@ui-kit.ai/theme'
import { parse } from 'culori'

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

/** A colour the engine can read. Anything else would throw on the next paint. */
function isColor(value: unknown) {
    return typeof value === 'string' && parse(value) != null
}

/** Every entry is a known key carrying a value the branch below accepts. */
function isKeyedBy(value: unknown, keys: readonly string[], isValue: (value: unknown) => boolean) {
    if (typeof value !== 'object' || value == null) return false

    return Object.entries(value).every(
        ([key, entry]) => keys.some((known) => known === key) && isValue(entry)
    )
}

/** Themes saved before a knob existed are still good; they take the default. */
function isKnownSetting(value: unknown) {
    return value == null || THEME_SETTINGS.some((setting) => setting === value)
}

/** Hand-picked colours, keyed intent, then token, then scheme. */
function isOverrides(value: unknown) {
    if (value == null) return true

    return isKeyedBy(value, INTENTS, isTokenOverrides)
}

/** A seed is one colour for both schemes, or one aimed at each. */
function isSeed(value: unknown) {
    if (isColor(value)) return true
    if (typeof value !== 'object' || value == null) return false

    const pair = value as Record<string, unknown>

    return SCHEMES.every((scheme) => isColor(pair[scheme]))
}

function isThemeInput(value: unknown): value is ThemeInput {
    if (typeof value !== 'object' || value == null) return false

    const { colors, depth, overrides, radius, saturation } = value as Record<string, unknown>

    if (radius != null && (typeof radius !== 'number' || Number.isNaN(radius))) return false
    if (typeof colors !== 'object' || colors == null) return false
    if (!isKnownSetting(depth) || !isKnownSetting(saturation)) return false
    if (!isOverrides(overrides)) return false

    const seeds = colors as Record<string, unknown>

    return INTENTS.every((intent) => isSeed(seeds[intent]))
}

function isTokenOverrides(value: unknown) {
    return isKeyedBy(value, TOKENS, (schemes) => isKeyedBy(schemes, SCHEMES, isColor))
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
