import { wcagContrast } from 'culori'
import { expect, test } from 'vitest'

import { INTENTS, PRESETS, themeCss } from '../index'

type Scheme = 'dark' | 'light'

// Every text token, against the background it actually sits on.
const PAIRS = [
    { background: 'bg-base', foreground: 'text-hi-contrast', target: 7 },
    { background: 'bg-base', foreground: 'text-lo-contrast', target: 4.5 },
    { background: 'bg-base', foreground: 'text-placeholder', target: 3 },
    { background: 'bg-base', foreground: 'bg-primary', target: 3 },
    { background: 'bg-primary', foreground: 'text-accent', target: 4.5 },
] as const

const SCHEMES: readonly Scheme[] = ['dark', 'light']

/** 12 tokens per intent, plus the four syntax colors. */
const EXPECTED_VAR_COUNT = INTENTS.length * 12 + 4

for (const preset of PRESETS) {
    test(`${preset.name} meets every contrast target`, () => {
        const vars = themeVars(themeCss(preset.input))
        expect(Object.keys(vars)).toHaveLength(EXPECTED_VAR_COUNT)

        for (const intent of INTENTS) {
            for (const scheme of SCHEMES) {
                for (const { background, foreground, target } of PAIRS) {
                    const fg = colorOf(vars, `--theme-${intent}-${foreground}`, scheme)
                    const bg = colorOf(vars, `--theme-${intent}-${background}`, scheme)

                    expect(
                        wcagContrast(fg, bg),
                        `${intent}/${scheme}: ${foreground} on ${background}`
                    ).toBeGreaterThanOrEqual(target)
                }
            }
        }
    })
}

function colorOf(vars: Record<string, Record<Scheme, string>>, name: string, scheme: Scheme) {
    const pair = vars[name]
    if (pair == null) {
        throw new Error(`Missing ${name}`)
    }

    return pair[scheme]
}

/** Reads the emitted stylesheet, so the assertions cover what actually ships. */
function themeVars(css: string): Record<string, Record<Scheme, string>> {
    const vars: Record<string, Record<Scheme, string>> = {}

    for (const [, name, light, dark] of css.matchAll(
        /(--[a-z][a-z0-9-]*): light-dark\((oklch\([^)]*\)), (oklch\([^)]*\))\);/g
    )) {
        if (name == null || light == null || dark == null) {
            continue
        }
        vars[name] = { dark, light }
    }

    return vars
}
