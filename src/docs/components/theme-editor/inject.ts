import type { ThemeInput } from '@ui-kit.ai/theme'

import { themeCss } from '@ui-kit.ai/theme'

const STYLE_ID = 'theme-editor-override'

/** Appends the generated theme to `&lt;head>`, after the bundled stylesheet. */
export function applyThemeCss(input: ThemeInput) {
    if (typeof document === 'undefined') return

    styleElement().textContent = toRuntimeCss(themeCss(input))
}

export function removeThemeCss() {
    if (typeof document === 'undefined') return

    document.getElementById(STYLE_ID)?.remove()
}

function styleElement() {
    const existing = document.getElementById(STYLE_ID)
    if (existing instanceof HTMLStyleElement) return existing

    const created = document.createElement('style')
    created.id = STYLE_ID
    document.head.append(created)

    return created
}

/* Tailwind resolves `@theme`, `@utility` and `--color-*` at build time. */
function toRuntimeCss(css: string) {
    const [themeBlock = ''] = css.split('@utility')

    return themeBlock
        .split('\n')
        .filter((line) => !line.includes('--color-*'))
        .join('\n')
        .replace('@theme {', ':root {')
}
