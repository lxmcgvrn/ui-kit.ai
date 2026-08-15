'use client'

import type { Scheme } from '@ui-kit.ai/theme'

import { useTheme } from 'next-themes'

export interface ColorScheme {
    /** The scheme the page wears, with the site's `system` setting resolved. */
    scheme: Scheme

    /** Dresses the whole site in a scheme, the site's own toggle included. */
    selectScheme: (scheme: Scheme) => void
}

/** The site's light/dark setting, as the editor reads and writes it. */
export function useColorScheme(): ColorScheme {
    const { resolvedTheme, setTheme } = useTheme()

    return { scheme: resolvedTheme === 'dark' ? 'dark' : 'light', selectScheme: setTheme }
}
