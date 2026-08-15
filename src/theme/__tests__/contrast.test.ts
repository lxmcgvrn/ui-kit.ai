import type { Oklch } from 'culori'

import { converter } from 'culori'
import { expect, test } from 'vitest'

import type { ContrastWarning, Scheme, SeedColor, Token } from '../palette'

import { apcaLc } from '../apca'
import { APCA_TIERS, compromiseLc, CONTRAST_POLICY } from '../contrast'
import {
    DEFAULT_SETTING,
    DEFAULT_THEME,
    generateTheme,
    INTENTS,
    PRESETS,
    THEME_SETTINGS,
    TOKENS,
} from '../index'
import { intentPalettes, LC_SLACK, resolveTheme, SCHEMES } from '../palette'
import { SYNTAX_INTENTS } from '../stylesheet'

/** A mid-tone tan fill: no lightness left for the accent to run to. */
const UNREACHABLE_SEED = '#B89A80'

/** Body text a shade off the page it sits on — readable at no size. */
const WASHED_TEXT = 'oklch(0.95 0.01 267)'

/** Every token the solver drives, each of which owns one or more grounds. */
const SOLVED_TOKENS = [...new Set(CONTRAST_POLICY.map(({ foreground }) => foreground))]

const toOklch = converter('oklch')

/** Every token of every intent, plus the syntax colors. */
const EXPECTED_VAR_COUNT = INTENTS.length * TOKENS.length + SYNTAX_INTENTS.length

/** Each knob swept against the other's default — a cross-product buys nothing. */
const SETTINGS = [
    ...THEME_SETTINGS.map((depth) => ({ depth, saturation: DEFAULT_SETTING })),
    ...THEME_SETTINGS.filter((setting) => setting !== DEFAULT_SETTING).map((saturation) => ({
        depth: DEFAULT_SETTING,
        saturation,
    })),
]

for (const { depth, saturation } of SETTINGS) {
    for (const preset of PRESETS) {
        test(`${preset.name} at depth ${depth}, saturation ${saturation} meets every contrast target`, () => {
            const vars = themeVars(generateTheme({ ...preset.input, depth, saturation }).css)
            expect(Object.keys(vars)).toHaveLength(EXPECTED_VAR_COUNT)

            for (const intent of INTENTS) {
                for (const scheme of SCHEMES) {
                    for (const foreground of SOLVED_TOKENS) {
                        expectTokenMeetsPolicy(
                            (token) => oklch(colorOf(vars, `--theme-${intent}-${token}`, scheme)),
                            foreground,
                            `${intent}/${scheme}`
                        )
                    }
                }
            }
        })
    }
}

test.each(PRESETS)('$name only warns where no color could have cleared the bar', (preset) => {
    const palettes = intentPalettes(resolveTheme(preset.input))

    for (const { background, intent, scheme, targetLc } of generateTheme(preset.input).warnings) {
        const ground = palettes[intent][scheme][background]

        expect(bestAchievableLc(ground), `${intent}/${scheme}`).toBeLessThan(targetLc)
    }
})

test('a workable brand color warns about nothing', () => {
    expect(warningsFor(DEFAULT_THEME.colors.default)).toHaveLength(0)
})

test('an override that breaks contrast still warns', () => {
    const overrides = { default: { 'text-hi-contrast': { light: WASHED_TEXT } } }

    expect(generateTheme({ ...DEFAULT_THEME, overrides }).warnings).toContainEqual(
        expect.objectContaining({
            background: 'bg-base',
            foreground: 'text-hi-contrast',
            intent: 'default',
            scheme: 'light',
        })
    )
})

test('a mid-tone brand color warns about the accent it cannot lift', () => {
    const warnings = warningsFor(UNREACHABLE_SEED)

    expect(warnings.length).toBeGreaterThan(0)
    for (const { achievedLc, foreground, targetLc } of warnings) {
        expect(foreground).toBe('text-accent')
        expect(achievedLc).toBeLessThan(targetLc)
    }
})

/** The most Lc any text can score on this ground, which is a pole or nothing. */
function bestAchievableLc(background: Oklch): number {
    return Math.max(
        Math.abs(apcaLc(oklch('#000'), background)),
        Math.abs(apcaLc(oklch('#fff'), background))
    )
}

function colorOf(vars: Record<string, Record<Scheme, string>>, name: string, scheme: Scheme) {
    const pair = vars[name]
    if (pair == null) {
        throw new Error(`Missing ${name}`)
    }

    return pair[scheme]
}

/** One ground out of reach makes the whole token a compromise, grounds and all. */
function expectTokenMeetsPolicy(
    colorOfToken: (token: Token) => Oklch,
    foreground: Token,
    where: string
): void {
    const text = colorOfToken(foreground)
    const grounds = CONTRAST_POLICY.filter((entry) => entry.foreground === foreground).map(
        ({ background, tier }) => ({
            background,
            color: colorOfToken(background),
            floor: compromiseLc(tier),
            target: APCA_TIERS[tier],
        })
    )
    const reachable = grounds.every(({ color, target }) => bestAchievableLc(color) >= target)

    for (const { background, color, floor, target } of grounds) {
        expect(
            Math.abs(apcaLc(text, color)),
            `${where}: ${foreground} on ${background}`
        ).toBeGreaterThanOrEqual(reachable ? target - LC_SLACK : floor)
    }
}

function oklch(color: string): Oklch {
    const parsed = toOklch(color)
    if (parsed == null) {
        throw new Error(`Invalid color: ${color}`)
    }

    return parsed
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

/** What the `default` intent reports when one brand color drives it. */
function warningsFor(seed: SeedColor): readonly ContrastWarning[] {
    const colors = { ...DEFAULT_THEME.colors, default: seed }

    return generateTheme({ ...DEFAULT_THEME, colors }).warnings.filter(
        ({ intent }) => intent === 'default'
    )
}
