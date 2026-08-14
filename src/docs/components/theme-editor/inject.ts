import type { Depth, ThemeInput } from '@ui-kit.ai/theme'

import { DEFAULT_DEPTH, themeCss } from '@ui-kit.ai/theme'

const STYLE_ID = 'theme-editor-override'

/** Each primary fill, paired with the lighter stop that tops its gradient. */
const GRADIENTS: readonly [string, string][] = [
    ['bg-primary', 'bg-primary-hover'],
    ['bg-primary-hover', 'depth-primary-brighter'],
]

/** Appends the generated theme to `&lt;head>`, after the bundled stylesheet. */
export function applyThemeCss(input: ThemeInput) {
    if (typeof document === 'undefined') return

    styleElement().textContent = toRuntimeCss(themeCss(input))
    paintGradients(input.depth ?? DEFAULT_DEPTH)
}

export function removeThemeCss() {
    if (typeof document === 'undefined') return

    document.getElementById(STYLE_ID)?.remove()
    // The site ships at the default depth, which paints no gradient.
    paintGradients(DEFAULT_DEPTH)
}

/** Runs `visit` over every rule that carries declarations, nesting included. */
function eachStyle(rules: CSSRuleList, visit: (style: CSSStyleDeclaration) => void) {
    for (const rule of Array.from(rules)) {
        const { cssRules, style } = rule as Partial<CSSGroupingRule & CSSStyleRule>

        if (style != null) visit(style)
        if (cssRules != null) eachStyle(cssRules, visit)
    }
}

/** No compiler runs here, so patch the rules Tailwind already built. */
function paintGradients(depth: Depth) {
    for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList
        try {
            rules = sheet.cssRules
        } catch {
            // A cross-origin sheet, which is never ours.
            continue
        }

        eachStyle(rules, (style) => {
            // Matching on the fill catches `hover:` and `pressed:` too.
            const fill = GRADIENTS.find(
                ([token]) => style.backgroundColor === `var(--theme-default-${token})`
            )
            if (fill == null) return

            const [token, from] = fill
            style.setProperty(
                'background-image',
                depth === 'lots'
                    ? `linear-gradient(to bottom, var(--theme-default-${from}), var(--theme-default-${token}))`
                    : ''
            )
        })
    }
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
