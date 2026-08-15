import type { ThemeOverrides } from '@ui-kit.ai/theme'

import type { TokenAddress } from './tokens'

/** The hand-picked color at an address, if the user set one. */
export function overrideAt(overrides: ThemeOverrides | undefined, address: TokenAddress) {
    const { intent, scheme, token } = address

    return overrides?.[intent]?.[token]?.[scheme]
}

/** Drops one hand-picked color, and any branch it leaves empty behind it. */
export function withoutOverride(
    overrides: ThemeOverrides | undefined,
    address: TokenAddress
): ThemeOverrides | undefined {
    const { intent, scheme, token } = address
    const forIntent = overrides?.[intent]
    const forToken = forIntent?.[token]

    if (overrides == null || forIntent == null || forToken == null) return overrides

    const schemes = omit(forToken, scheme)
    const tokens = schemes == null ? omit(forIntent, token) : { ...forIntent, [token]: schemes }

    return tokens == null ? omit(overrides, intent) : { ...overrides, [intent]: tokens }
}

export function withOverride(
    overrides: ThemeOverrides | undefined,
    address: TokenAddress,
    color: string
): ThemeOverrides {
    const { intent, scheme, token } = address
    const forIntent = overrides?.[intent] ?? {}

    return {
        ...overrides,
        [intent]: { ...forIntent, [token]: { ...forIntent[token], [scheme]: color } },
    }
}

/** The record without one key, or nothing at all once that emptied it. */
function omit<T extends object>(record: T, key: string): T | undefined {
    const rest = Object.entries(record).filter(([entry]) => entry !== key)

    return rest.length === 0 ? undefined : (Object.fromEntries(rest) as T)
}
