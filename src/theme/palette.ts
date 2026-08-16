import type { Oklch } from 'culori'

import { clampChroma, converter } from 'culori'

import { apcaLc } from './apca'
import { APCA_TIERS, CONTRAST_POLICY, requiredLc } from './contrast'

/** A pairing the solver could not bring up to its policy tier. */
export interface ContrastWarning {
    achievedLc: number
    background: Token
    foreground: Token
    intent: Intent
    scheme: Scheme
    targetLc: number
}

export type Intent = 'default' | 'error' | 'info' | 'success' | 'warning'

/** One palette per color scheme, for one intent. */
export type IntentPalette = Record<Scheme, Palette>

export type Palette = Record<Token, Oklch>

/** Every intent's palettes, which together are the whole theme's colors. */
export type Palettes = Record<Intent, IntentPalette>

export type Scheme = 'dark' | 'light'

/** One brand color for both schemes, or one per scheme to re-aim each. */
export type SeedColor = Record<Scheme, string> | string

export interface ThemeInput {
    /** One seed per intent, in any CSS color syntax. Every shade derives from these. */
    colors: Record<Intent, SeedColor>

    /** How much the surfaces lift off the page: shadows, edge highlights, gradients. */
    depth?: ThemeSetting

    /** Colors to take verbatim, in place of the ones derivation would reach. */
    overrides?: ThemeOverrides

    /** How far the corners round. Large surfaces round less hard than small ones. */
    radius?: ThemeSetting

    /** How much of the seed's hue bleeds into backgrounds, borders and body text. */
    saturation?: ThemeSetting
}

/** Hand-picked colors, by intent, then token, then scheme. */
export type ThemeOverrides = Partial<Record<Intent, TokenOverrides>>

/** How far a knob turns up. */
export type ThemeSetting = 'lots' | 'none' | 'some'

export type Token =
    | 'bg-base'
    | 'bg-base-raised'
    | 'bg-primary'
    | 'bg-primary-hover'
    | 'bg-tint'
    | 'border-default'
    | 'border-field'
    | 'border-field-hover'
    | 'text-accent'
    | 'text-hi-contrast'
    | 'text-lo-contrast'
    | 'text-placeholder'

/** The look every knob falls back to when the theme leaves it out. */
export const DEFAULT_SETTING: ThemeSetting = 'some'

export const INTENTS: readonly Intent[] = ['default', 'error', 'info', 'success', 'warning']

/** Rounding a solved shade to 4 places costs a hair of the Lc it scored. */
export const LC_SLACK = 0.1

export const SCHEMES: readonly Scheme[] = ['dark', 'light']

/** Weakest to strongest, the way the editor's sliders run. */
export const THEME_SETTINGS: readonly ThemeSetting[] = ['none', 'some', 'lots']

export const TOKENS: readonly Token[] = [
    'bg-base',
    'bg-base-raised',
    'bg-primary',
    'bg-primary-hover',
    'bg-tint',
    'border-default',
    'border-field',
    'border-field-hover',
    'text-accent',
    'text-hi-contrast',
    'text-lo-contrast',
    'text-placeholder',
]

/** A theme with every optional knob resolved to a setting. */
export interface ResolvedTheme extends ThemeInput {
    depth: ThemeSetting
    radius: ThemeSetting
    saturation: ThemeSetting
}

interface Ground {
    color: Oklch

    /** The APCA Lc the token has to clear here. */
    target: number
}

/** Every background a token sits on. The first one also aims the search. */
type Grounds = readonly [Ground, ...Ground[]]

/** Everything a single palette's derivation turns on, beyond the seed. */
interface Knobs {
    overrides: SchemeOverrides
    saturation: ThemeSetting
    scheme: Scheme
}

/** One scheme's slice of the overrides, parsed and ready to drop in. */
type SchemeOverrides = Partial<Record<Token, Oklch>>

interface Shade {
    alpha?: number
    chroma: number
    lightness: number
}

type ShadeTable = Record<SurfaceToken, Record<Scheme, Shade>>

/** Tokens read straight off a shade table, rather than solved from the seed. */
type SurfaceToken = Exclude<Token, 'bg-primary' | 'bg-primary-hover' | 'text-accent'>

/** One intent's overrides, before a scheme picks its side of each token. */
type TokenOverrides = Partial<Record<Token, Partial<Record<Scheme, string>>>>

/** Chroma of `text-accent` before gamut clamping — a tint, not a flat black/white. */
const ACCENT_CHROMA = 0.05

/** The accent picks a side by scoring both poles against the fill. */
const ACCENT_POLES = { dark: 0.02, light: 0.98 }

/** It then searches out from that side's most tinted readable lightness. */
const ACCENT_STARTS = { dark: 0.25, light: 0.93 }

/** How far `bg-primary-hover` moves off `bg-primary`, in oklch lightness. */
const HOVER_LIFT = 0.05

/** Hover stops short of the poles, where a move stops reading as a move. */
const HOVER_RANGE = { max: 0.99, min: 0.01 }

/** A seed at least this chromatic renders the theme at full saturation. */
const REFERENCE_CHROMA = 0.15

/** Multiplies the chroma of every derived shade. `none` still keeps a hint. */
const SATURATION_SCALES: Record<ThemeSetting, number> = {
    lots: 1.75,
    none: 0.35,
    some: 1,
}

const SEARCH_STEPS = 24

/** Near-neutral ramp, worn by the `default` intent. */
const MUTED_SHADES: ShadeTable = {
    'bg-base': {
        dark: { chroma: 0.004, lightness: 0.179 },
        light: { chroma: 0.002, lightness: 0.992 },
    },
    'bg-base-raised': {
        dark: { chroma: 0.005, lightness: 0.212 },
        light: { chroma: 0.003, lightness: 0.983 },
    },
    'bg-tint': {
        dark: { chroma: 0.009, lightness: 0.274 },
        light: { chroma: 0.005, lightness: 0.936 },
    },
    'border-default': {
        dark: { alpha: 0.11, chroma: 0.04, lightness: 0.895 },
        light: { alpha: 0.09, chroma: 0.07, lightness: 0.167 },
    },
    'border-field': {
        dark: { alpha: 0.15, chroma: 0.042, lightness: 0.91 },
        light: { alpha: 0.12, chroma: 0.08, lightness: 0.176 },
    },
    'border-field-hover': {
        dark: { alpha: 0.19, chroma: 0.04, lightness: 0.911 },
        light: { alpha: 0.15, chroma: 0.074, lightness: 0.167 },
    },
    'text-hi-contrast': {
        dark: { chroma: 0.003, lightness: 0.952 },
        light: { chroma: 0.013, lightness: 0.239 },
    },
    'text-lo-contrast': {
        dark: { chroma: 0.012, lightness: 0.765 },
        light: { chroma: 0.015, lightness: 0.499 },
    },
    'text-placeholder': {
        dark: { chroma: 0.015, lightness: 0.579 },
        light: { chroma: 0.014, lightness: 0.614 },
    },
}

/** Saturated ramp, worn by every intent that carries meaning. */
const VIBRANT_SHADES: ShadeTable = {
    'bg-base': {
        dark: { chroma: 0.022, lightness: 0.2 },
        light: { chroma: 0.006, lightness: 0.991 },
    },
    'bg-base-raised': {
        dark: { chroma: 0.028, lightness: 0.222 },
        light: { chroma: 0.011, lightness: 0.98 },
    },
    'bg-tint': {
        dark: { chroma: 0.085, lightness: 0.36 },
        light: { chroma: 0.033, lightness: 0.95 },
    },
    'border-default': {
        dark: { alpha: 0.34, chroma: 0.17, lightness: 0.72 },
        light: { alpha: 0.12, chroma: 0.18, lightness: 0.6 },
    },
    'border-field': {
        dark: { alpha: 0.42, chroma: 0.165, lightness: 0.72 },
        light: { alpha: 0.18, chroma: 0.18, lightness: 0.6 },
    },
    'border-field-hover': {
        dark: { alpha: 0.49, chroma: 0.16, lightness: 0.72 },
        light: { alpha: 0.24, chroma: 0.18, lightness: 0.6 },
    },
    'text-hi-contrast': {
        dark: { chroma: 0.045, lightness: 0.93 },
        light: { chroma: 0.09, lightness: 0.35 },
    },
    'text-lo-contrast': {
        dark: { chroma: 0.11, lightness: 0.85 },
        light: { chroma: 0.175, lightness: 0.52 },
    },
    'text-placeholder': {
        dark: { chroma: 0.17, lightness: 0.72 },
        light: { chroma: 0.19, lightness: 0.6 },
    },
}

const toOklch = converter('oklch')

/** Every pairing the solved palettes ship below its policy tier. */
export function contrastWarnings(palettes: Palettes): readonly ContrastWarning[] {
    return INTENTS.flatMap((intent) =>
        SCHEMES.flatMap((scheme) =>
            CONTRAST_POLICY.flatMap(({ background, foreground, tier }) => {
                const palette = palettes[intent][scheme]
                const achievedLc = Math.abs(apcaLc(palette[foreground], palette[background]))
                const targetLc = APCA_TIERS[tier]

                return achievedLc >= targetLc - LC_SLACK
                    ? []
                    : [{ achievedLc, background, foreground, intent, scheme, targetLc }]
            })
        )
    )
}

/** Serializes an oklch color the way the stylesheet carries it. */
export function formatOklch({ alpha, c, h, l }: Oklch): string {
    const channels = [round(l, 4), round(c, 4), round(h ?? 0, 2)].join(' ')

    return alpha == null || alpha >= 1
        ? `oklch(${channels})`
        : `oklch(${channels} / ${String(alpha)})`
}

/** Every intent's light and dark palette, derived from the theme's seeds. */
export function intentPalettes(theme: ResolvedTheme): Palettes {
    const entries = INTENTS.map((intent) => [intent, intentPalette(theme, intent)] as const)

    return Object.fromEntries(entries) as Palettes
}

/** Fills in whichever knobs the caller left out. */
export function resolveTheme(input: ThemeInput): ResolvedTheme {
    return {
        ...input,
        depth: input.depth ?? DEFAULT_SETTING,
        radius: input.radius ?? DEFAULT_SETTING,
        saturation: input.saturation ?? DEFAULT_SETTING,
    }
}

/** Grey seeds must stay grey, so every shade's chroma rides on the seed's. */
function chromaScale(seed: Oklch): number {
    return Math.min(1, seed.c / REFERENCE_CHROMA)
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

/** How far a color clears its worst ground: 1 sits on target. */
function headroom(color: Oklch, grounds: Grounds): number {
    // APCA's sign reports polarity, not size, so the targets ignore it.
    return Math.min(...grounds.map(({ color: bg, target }) => Math.abs(apcaLc(color, bg)) / target))
}

function intentPalette(theme: ResolvedTheme, intent: Intent): IntentPalette {
    const seed = theme.colors[intent]
    const table = intent === 'default' ? MUTED_SHADES : VIBRANT_SHADES
    const overrides = theme.overrides?.[intent] ?? {}

    const palette = (scheme: Scheme): Palette =>
        schemePalette(parseColor(seedFor(seed, scheme), `${intent} ${scheme} color`), table, {
            overrides: schemeOverrides(overrides, scheme, intent),
            saturation: theme.saturation,
            scheme,
        })

    return { dark: palette('dark'), light: palette('light') }
}

/** Reads a color the theme supplies, naming it when culori cannot parse it. */
function parseColor(color: string, label: string): Oklch {
    const parsed = toOklch(color)
    if (parsed == null) {
        throw new Error(`Invalid ${label}: ${color}`)
    }

    return parsed
}

/** Which pole reads better on the fill — the side `text-accent` starts from. */
function prefersDarkText(fill: Oklch, hue: number, chroma: number): boolean {
    const lcAt = (lightness: number): number =>
        Math.abs(apcaLc(shadeColor({ chroma, lightness }, hue), fill))

    return lcAt(ACCENT_POLES.dark) >= lcAt(ACCENT_POLES.light)
}

function round(value: number, places: number): number {
    return Number(value.toFixed(places))
}

/** One intent's overrides for one scheme, in the color space derivation works in. */
function schemeOverrides(
    overrides: TokenOverrides,
    scheme: Scheme,
    intent: Intent
): SchemeOverrides {
    const entries = TOKENS.flatMap((token) => {
        const color = overrides[token]?.[scheme]

        return color == null
            ? []
            : [[token, parseColor(color, `${intent} ${scheme} ${token} override`)] as const]
    })

    return Object.fromEntries(entries)
}

// Overrides land as derivation reaches each token, so everything below follows.
function schemePalette(seed: Oklch, table: ShadeTable, knobs: Knobs): Palette {
    const { overrides, saturation, scheme } = knobs
    const hue = seed.h ?? 0
    const scale = chromaScale(seed)
    const bleed = SATURATION_SCALES[saturation]

    const chosen = (token: Token, derive: () => Oklch): Oklch => overrides[token] ?? derive()

    // `bg-tint` is the seed's own wash, so the saturation knob passes it by.
    const surface = (token: SurfaceToken, multiplier = bleed): Oklch =>
        chosen(token, () => {
            const shade = table[token][scheme]

            return shadeColor({ ...shade, chroma: shade.chroma * scale * multiplier }, hue)
        })

    const bgBase = surface('bg-base')
    const bgPrimary = chosen('bg-primary', () =>
        solveLightness({ chroma: seed.c, lightness: seed.l }, hue, [
            { color: bgBase, target: requiredLc('bg-primary', 'bg-base') },
        ])
    )

    const onText = (token: 'text-hi-contrast' | 'text-lo-contrast' | 'text-placeholder'): Oklch =>
        chosen(token, () => {
            const shade = table[token][scheme]

            return solveLightness({ ...shade, chroma: shade.chroma * scale * bleed }, hue, [
                { color: bgBase, target: requiredLc(token, 'bg-base') },
            ])
        })

    const accentChroma = ACCENT_CHROMA * scale
    const darkAccent = prefersDarkText(bgPrimary, hue, accentChroma)

    // Hover moves away from the accent's pole, which is where its headroom is.
    const lift = darkAccent ? HOVER_LIFT : -HOVER_LIFT
    const bgPrimaryHover = chosen('bg-primary-hover', () =>
        shadeColor(
            {
                chroma: bgPrimary.c,
                lightness: clamp(bgPrimary.l + lift, HOVER_RANGE.min, HOVER_RANGE.max),
            },
            bgPrimary.h ?? hue
        )
    )

    const accentGrounds: Grounds = [
        { color: bgPrimary, target: requiredLc('text-accent', 'bg-primary') },
        { color: bgPrimaryHover, target: requiredLc('text-accent', 'bg-primary-hover') },
    ]
    const accentShade: Shade = {
        chroma: accentChroma,
        lightness: darkAccent ? ACCENT_STARTS.dark : ACCENT_STARTS.light,
    }

    return {
        'bg-base': bgBase,
        'bg-base-raised': surface('bg-base-raised'),
        'bg-primary': bgPrimary,
        'bg-primary-hover': bgPrimaryHover,
        'bg-tint': surface('bg-tint', 1),
        'border-default': surface('border-default'),
        'border-field': surface('border-field'),
        'border-field-hover': surface('border-field-hover'),
        'text-accent': chosen('text-accent', () => solveLightness(accentShade, hue, accentGrounds)),
        'text-hi-contrast': onText('text-hi-contrast'),
        'text-lo-contrast': onText('text-lo-contrast'),
        'text-placeholder': onText('text-placeholder'),
    }
}

/** Walks from `from` toward `to` for the first lightness clearing the target. */
function searchLightness(
    at: (lightness: number) => Oklch,
    grounds: Grounds,
    from: number,
    to: number
): null | Oklch {
    if (headroom(at(to), grounds) < 1) {
        return null
    }

    let fail = from
    let pass = to
    for (let step = 0; step < SEARCH_STEPS; step++) {
        const mid = (fail + pass) / 2
        if (headroom(at(mid), grounds) >= 1) {
            pass = mid
        } else {
            fail = mid
        }
    }

    return at(pass)
}

/** Which brand color aims this scheme. A lone string aims both. */
function seedFor(seed: SeedColor, scheme: Scheme): string {
    return typeof seed === 'string' ? seed : seed[scheme]
}

/** Rounds to what CSS will carry, so a solved contrast survives serialization. */
function shadeColor({ alpha, chroma, lightness }: Shade, hue: number): Oklch {
    const clamped = clampChroma({ alpha, c: chroma, h: hue, l: lightness, mode: 'oklch' }, 'oklch')

    return {
        ...clamped,
        c: round(clamped.c, 4),
        h: round(hue, 2),
        l: round(clamped.l, 4),
    }
}

// Contrast is a V in lightness, so search outward from the designed shade.
function solveLightness(shade: Shade, hue: number, grounds: Grounds): Oklch {
    const at = (lightness: number): Oklch => shadeColor({ ...shade, lightness }, hue)
    const [{ color: ground }] = grounds

    if (headroom(at(shade.lightness), grounds) >= 1) {
        return at(shade.lightness)
    }

    const away = shade.lightness < ground.l ? 0 : 1
    const back = 1 - away

    return (
        searchLightness(at, grounds, shade.lightness, away) ??
        searchLightness(at, grounds, ground.l, back) ??
        // An unreachable target ships a pole, where the gamut sheds any tint.
        (headroom(at(0), grounds) >= headroom(at(1), grounds) ? at(0) : at(1))
    )
}
