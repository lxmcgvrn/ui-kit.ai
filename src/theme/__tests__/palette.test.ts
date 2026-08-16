import { expect, test } from 'vitest'

import type { Palette, Scheme, SeedColor, ThemeInput, Token } from '../palette'

import { apcaLc } from '../apca'
import { APCA_TIERS } from '../contrast'
import { DEFAULT_THEME, generateTheme, THEME_SETTINGS } from '../index'
import { intentPalettes, LC_SLACK, resolveTheme } from '../palette'

/** A near-black brand seed, whose fill takes a light accent. */
const DARK_SEED = '#111111'

/** A bright brand seed, whose fill takes a dark accent. */
const LIGHT_SEED = '#FFC53D'

/** Chromatic, but too mid-tone for any accent to reach its target. */
const UNREACHABLE_SEED = '#B89A80'

/** Two seeds far enough apart that a hue says which one drove a palette. */
const ORANGE_SEED = 'oklch(0.7 0.15 60)'
const TEAL_SEED = 'oklch(0.5 0.15 190)'

/** The theme's own brand seed, driving the run with no override in it. */
const BRAND_SEED = DEFAULT_THEME.colors.default

/** Light enough to read black text, dark enough to move the designed shade. */
const DIM_PAGE = 'oklch(0.93 0.02 267)'

/** Body text a shade off the page it sits on — readable at no size. */
const WASHED_TEXT = 'oklch(0.95 0.01 267)'

const TRANSLUCENT_BORDER = 'oklch(0.5 0.1 200 / 0.4)'

// Pins the generated CSS, so a regression in any shade shows up as a diff.
test.each(THEME_SETTINGS)('generateTheme at depth %s', (depth) => {
    expect(generateTheme({ ...DEFAULT_THEME, depth }).css).toMatchSnapshot()
})

test.each(THEME_SETTINGS)('generateTheme at radius %s', (radius) => {
    expect(generateTheme({ ...DEFAULT_THEME, radius }).css).toMatchSnapshot()
})

test.each(THEME_SETTINGS)('generateTheme at saturation %s', (saturation) => {
    expect(generateTheme({ ...DEFAULT_THEME, saturation }).css).toMatchSnapshot()
})

test('a theme with no radius set takes `some`', () => {
    expect(generateTheme(DEFAULT_THEME).css).toBe(
        generateTheme({ ...DEFAULT_THEME, radius: 'some' }).css
    )
})

test('hover darkens under a light accent', () => {
    const palette = seedPalette(DARK_SEED, 'light')

    expect(palette['text-accent'].l).toBeGreaterThan(palette['bg-primary'].l)
    expect(palette['bg-primary-hover'].l).toBeLessThan(palette['bg-primary'].l)
})

test('hover lightens under a dark accent', () => {
    const palette = seedPalette(LIGHT_SEED, 'light')

    expect(palette['text-accent'].l).toBeLessThan(palette['bg-primary'].l)
    expect(palette['bg-primary-hover'].l).toBeGreaterThan(palette['bg-primary'].l)
})

test('an accent that reaches its target keeps its tint', () => {
    expect(seedPalette(LIGHT_SEED, 'dark')['text-accent'].c).toBeGreaterThan(0)
})

test('an accent that cannot sheds it', () => {
    expect(seedPalette(UNREACHABLE_SEED, 'light')['text-accent'].c).toBe(0)
})

test('each scheme derives from its own seed', () => {
    const seed = { dark: TEAL_SEED, light: ORANGE_SEED }

    expect(seedPalette(seed, 'dark')['bg-tint'].h).toBe(190)
    expect(seedPalette(seed, 'light')['bg-tint'].h).toBe(60)
})

test('one seed drives both schemes', () => {
    expect(seedPalette(ORANGE_SEED, 'dark')).toEqual(
        seedPalette({ dark: ORANGE_SEED, light: ORANGE_SEED }, 'dark')
    )
})

test('text solves against an overridden page', () => {
    const palette = overriddenPalette('bg-base', DIM_PAGE)
    const text = palette['text-hi-contrast']

    expect(text.l).toBeLessThan(seedPalette(BRAND_SEED, 'light')['text-hi-contrast'].l)
    expect(Math.abs(apcaLc(text, palette['bg-base']))).toBeGreaterThanOrEqual(
        APCA_TIERS.bodyTextPreferred - LC_SLACK
    )
})

test('hover lifts off an overridden fill', () => {
    const palette = overriddenPalette('bg-primary', TEAL_SEED)

    expect(palette['bg-primary-hover'].h).toBe(190)
    expect(palette['bg-primary-hover'].l).toBeCloseTo(0.45, 4)
})

test('the accent clears an overridden fill', () => {
    const palette = overriddenPalette('bg-primary', TEAL_SEED)

    expect(Math.abs(apcaLc(palette['text-accent'], palette['bg-primary']))).toBeGreaterThanOrEqual(
        APCA_TIERS.contentText - LC_SLACK
    )
})

test('an unreadable override ships anyway', () => {
    expect(generateTheme(overrideInput('text-hi-contrast', WASHED_TEXT)).css).toContain(
        `--theme-default-text-hi-contrast: light-dark(${WASHED_TEXT}`
    )
})

test('an override keeps its alpha', () => {
    expect(generateTheme(overrideInput('border-default', TRANSLUCENT_BORDER)).css).toContain(
        `--theme-default-border-default: light-dark(${TRANSLUCENT_BORDER}`
    )
})

function overriddenPalette(token: Token, color: string): Palette {
    return intentPalettes(resolveTheme(overrideInput(token, color))).default.light
}

/** A theme handing the `default` intent one light token verbatim. */
function overrideInput(token: Token, color: string): ThemeInput {
    return { ...DEFAULT_THEME, overrides: { default: { [token]: { light: color } } } }
}

function seedPalette(seed: SeedColor, scheme: Scheme): Palette {
    const colors = { ...DEFAULT_THEME.colors, default: seed }

    return intentPalettes(resolveTheme({ ...DEFAULT_THEME, colors })).default[scheme]
}
