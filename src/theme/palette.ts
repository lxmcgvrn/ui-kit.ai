import type { Oklch } from 'culori'

import { clampChroma, converter, wcagContrast } from 'culori'

export type Intent = 'default' | 'error' | 'info' | 'success' | 'warning'

/** One palette per color scheme, for one intent. */
export type IntentPalette = Record<Scheme, Palette>

export type Palette = Record<Token, Oklch>

/** Every intent's palettes, which together are the whole theme's colors. */
export type Palettes = Record<Intent, IntentPalette>

export type Scheme = 'dark' | 'light'

export interface ThemeInput {
    /** One seed per intent, in any CSS color syntax. Every shade derives from these. */
    colors: Record<Intent, string>

    /** How much the surfaces lift off the page: shadows, edge highlights, gradients. */
    depth?: ThemeSetting

    /** Base radius in rem — the `md` step. Every other step scales with it. */
    radius: number

    /** How much of the seed's hue bleeds into backgrounds, borders and body text. */
    saturation?: ThemeSetting
}

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

/** Everything one depth setting paints, in the units the stylesheet wants. */
export interface DepthTreatment {
    /** A lit top edge over a shaded bottom one. */
    edgeHighlight: string

    /** 1 paints the gradient on primary fills; 0 slides it out of the box. */
    gradientAlpha: 0 | 1

    /** Worn by buttons and fields. `some` is Tailwind's own `shadow-xs`. */
    smallShadow: string

    /** Letterpress under type on primary fills. */
    textShadow: string
}

/** A theme with every optional knob resolved to a setting. */
export interface ResolvedTheme extends ThemeInput {
    depth: ThemeSetting
    saturation: ThemeSetting
}

interface Ground {
    color: Oklch

    /** The ratio the token has to clear here. */
    target: number
}

/** Every background a token sits on. The first one also aims the search. */
type Grounds = readonly [Ground, ...Ground[]]

/** Everything a single palette's derivation turns on, beyond the seed. */
interface Knobs {
    saturation: ThemeSetting
    scheme: Scheme
}

interface Shade {
    alpha?: number
    chroma: number
    lightness: number
}

type ShadeTable = Record<SurfaceToken, Record<Scheme, Shade>>

/** Tokens read straight off a shade table, rather than solved from the seed. */
type SurfaceToken = Exclude<Token, 'bg-primary' | 'bg-primary-hover' | 'text-accent'>

/** The lit top edge's color; `lots`' text shadow casts the same light. */
const EDGE_LIGHT = 'light-dark(oklch(1 0 0 / 0.3), oklch(1 0 0 / 0.16))'

const FLAT_SHADOW = '0 0 #0000'

export const DEPTH_TREATMENTS: Record<ThemeSetting, DepthTreatment> = {
    lots: {
        edgeHighlight: [
            `inset 0 1px 0 0 ${EDGE_LIGHT}`,
            'inset 0 -1px 0 0 light-dark(oklch(0 0 0 / 0.12), oklch(0 0 0 / 0.22))',
        ].join(', '),
        gradientAlpha: 1,
        smallShadow: '0 1px 2px 0 rgb(0 0 0 / 0.09)',
        textShadow: `0 1px 0 ${EDGE_LIGHT}`,
    },
    none: {
        edgeHighlight: FLAT_SHADOW,
        gradientAlpha: 0,
        smallShadow: FLAT_SHADOW,
        textShadow: 'none',
    },
    some: {
        edgeHighlight: FLAT_SHADOW,
        gradientAlpha: 0,
        smallShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        textShadow: 'none',
    },
}

/** Chroma of `text-accent` before gamut clamping — a tint, not a flat black/white. */
const ACCENT_CHROMA = 0.05

/** The solver drives each token to this ratio against its own background. */
const CONTRAST_TARGETS = {
    'bg-primary': 3,
    'text-accent': 4.5,
    'text-hi-contrast': 7,
    'text-lo-contrast': 4.5,
    'text-placeholder': 3,
} as const

/** How far `bg-primary-hover` lifts off `bg-primary`, in oklch lightness. */
const HOVER_LIFT = 0.05

/** No text clears 4.5 on a mid fill, so lifted fills hold the UI ratio. */
const LIFTED_TARGET = 3

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
        saturation: input.saturation ?? DEFAULT_SETTING,
    }
}

/** Grey seeds must stay grey, so every shade's chroma rides on the seed's. */
function chromaScale(seed: Oklch): number {
    return Math.min(1, seed.c / REFERENCE_CHROMA)
}

/** How far a color clears its worst ground: 1 sits on target. */
function headroom(color: Oklch, grounds: Grounds): number {
    return Math.min(...grounds.map(({ color: bg, target }) => wcagContrast(color, bg) / target))
}

function intentPalette(theme: ResolvedTheme, intent: Intent): IntentPalette {
    const seed = toOklch(theme.colors[intent])
    if (seed == null) {
        throw new Error(`Invalid ${intent} color: ${theme.colors[intent]}`)
    }

    const table = intent === 'default' ? MUTED_SHADES : VIBRANT_SHADES

    return {
        dark: schemePalette(seed, table, { ...theme, scheme: 'dark' }),
        light: schemePalette(seed, table, { ...theme, scheme: 'light' }),
    }
}

function round(value: number, places: number): number {
    return Number(value.toFixed(places))
}

function schemePalette(seed: Oklch, table: ShadeTable, knobs: Knobs): Palette {
    const { saturation, scheme } = knobs
    const hue = seed.h ?? 0
    const scale = chromaScale(seed)
    const bleed = SATURATION_SCALES[saturation]

    // `bg-tint` is the seed's own wash, so the saturation knob passes it by.
    const surface = (token: SurfaceToken, multiplier = bleed): Oklch => {
        const shade = table[token][scheme]

        return shadeColor({ ...shade, chroma: shade.chroma * scale * multiplier }, hue)
    }

    const bgBase = surface('bg-base')
    const bgPrimary = solveLightness({ chroma: seed.c, lightness: seed.l }, hue, [
        { color: bgBase, target: CONTRAST_TARGETS['bg-primary'] },
    ])

    const onText = (token: 'text-hi-contrast' | 'text-lo-contrast' | 'text-placeholder'): Oklch => {
        const shade = table[token][scheme]

        return solveLightness({ ...shade, chroma: shade.chroma * scale * bleed }, hue, [
            { color: bgBase, target: CONTRAST_TARGETS[token] },
        ])
    }

    const bgPrimaryHover = shadeColor(
        { chroma: bgPrimary.c, lightness: Math.min(bgPrimary.l + HOVER_LIFT, 0.99) },
        hue
    )

    const accentGrounds: Grounds = [
        { color: bgPrimary, target: CONTRAST_TARGETS['text-accent'] },
        { color: bgPrimaryHover, target: LIFTED_TARGET },
    ]

    return {
        'bg-base': bgBase,
        'bg-base-raised': surface('bg-base-raised'),
        'bg-primary': bgPrimary,
        'bg-primary-hover': bgPrimaryHover,
        'bg-tint': surface('bg-tint', 1),
        'border-default': surface('border-default'),
        'border-field': surface('border-field'),
        'border-field-hover': surface('border-field-hover'),
        'text-accent': textAccent(accentGrounds, hue, scale),
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
        (headroom(at(0), grounds) >= headroom(at(1), grounds) ? at(0) : at(1))
    )
}

/** Sits on every primary fill, so it starts from whichever pole reads better. */
function textAccent(grounds: Grounds, hue: number, scale: number): Oklch {
    const chroma = ACCENT_CHROMA * scale
    const prefersDarkText =
        headroom(shadeColor({ chroma, lightness: 0.02 }, hue), grounds) >=
        headroom(shadeColor({ chroma, lightness: 0.98 }, hue), grounds)

    return solveLightness({ chroma, lightness: prefersDarkText ? 0.25 : 0.93 }, hue, grounds)
}
