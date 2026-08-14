import { expect, test } from 'vitest'

import type { Palette, Scheme } from '../palette'

import { DEFAULT_THEME, generateTheme, THEME_SETTINGS } from '../index'
import { intentPalettes, resolveTheme } from '../palette'

/** A near-black brand seed, whose fill takes a light accent. */
const DARK_SEED = '#111111'

/** A bright brand seed, whose fill takes a dark accent. */
const LIGHT_SEED = '#FFC53D'

/** Chromatic, but too mid-tone for any accent to reach its target. */
const UNREACHABLE_SEED = '#B89A80'

// Pins the generated CSS, so a regression in any shade shows up as a diff.
test.each(THEME_SETTINGS)('generateTheme at depth %s', (depth) => {
    expect(generateTheme({ ...DEFAULT_THEME, depth }).css).toMatchSnapshot()
})

test.each(THEME_SETTINGS)('generateTheme at saturation %s', (saturation) => {
    expect(generateTheme({ ...DEFAULT_THEME, saturation }).css).toMatchSnapshot()
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

function seedPalette(seed: string, scheme: Scheme): Palette {
    const colors = { ...DEFAULT_THEME.colors, default: seed }

    return intentPalettes(resolveTheme({ ...DEFAULT_THEME, colors })).default[scheme]
}
