import type { Oklch } from 'culori'

import { clampChroma, converter, wcagContrast } from 'culori'

export type Intent = 'default' | 'error' | 'info' | 'success' | 'warning'

export interface Preset {
    input: ThemeInput
    label: string
    name: string
}

export interface ThemeInput {
    /** One seed per intent, in any CSS color syntax. Every shade derives from these. */
    colors: Record<Intent, string>

    /** Base radius in rem — the `md` step. Every other step scales with it. */
    radius: number
}

type Scheme = 'dark' | 'light'

interface Shade {
    alpha?: number
    chroma: number
    lightness: number
}

type SurfaceToken = Exclude<Token, 'bg-primary' | 'bg-primary-hover' | 'text-accent'>

type Token =
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

export const INTENTS: readonly Intent[] = ['default', 'error', 'info', 'success', 'warning']

export const DEFAULT_THEME: ThemeInput = {
    colors: {
        default: '#3E63DD',
        error: '#E54666',
        info: '#3E63DD',
        success: '#29A383',
        warning: '#FFC53D',
    },
    radius: 0.375,
}

export const PRESETS: readonly Preset[] = [
    {
        input: {
            colors: {
                default: '#FFA057',
                error: '#FF977D',
                info: '#FFA057',
                success: '#3E7949',
                warning: '#F6E2B4',
            },
            radius: 0.375,
        },
        label: 'Autumnal',
        name: 'autumnal',
    },
    {
        input: {
            colors: {
                default: '#2A7E68',
                error: '#C8462D',
                info: '#2A7E68',
                success: '#2A7E68',
                warning: '#F5B961',
            },
            radius: 0.375,
        },
        label: 'Boreal',
        name: 'boreal',
    },
    {
        input: {
            colors: {
                default: '#70B8FF',
                error: '#FF92AD',
                info: '#70B8FF',
                success: '#0BD8B6',
                warning: '#F6EEB4',
            },
            radius: 0.375,
        },
        label: 'Glacial',
        name: 'glacial',
    },
    {
        input: {
            colors: {
                default: '#111111',
                error: '#B54548',
                info: '#111111',
                success: '#30A46C',
                warning: '#FFC53D',
            },
            radius: 0.375,
        },
        label: 'Neutral',
        name: 'neutral',
    },
    {
        input: {
            colors: {
                default: '#591C47',
                error: '#E93D82',
                info: '#591C47',
                success: '#0BD8B6',
                warning: '#F6EEB4',
            },
            radius: 0.375,
        },
        label: 'Nocturnal',
        name: 'nocturnal',
    },
    {
        input: DEFAULT_THEME,
        label: 'Professional',
        name: 'professional',
    },
]

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

/** Chroma of `text-accent` before gamut clamping — a tint, not a flat black/white. */
const ACCENT_CHROMA = 0.05

/** A seed at least this chromatic renders the theme at full saturation. */
const REFERENCE_CHROMA = 0.15

/** Near-neutral ramp, worn by the `default` intent. */
const MUTED_SHADES: Record<SurfaceToken, Record<Scheme, Shade>> = {
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
const VIBRANT_SHADES: Record<SurfaceToken, Record<Scheme, Shade>> = {
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

/** Tailwind's own proportions, expressed against the `md` step. */
const RADIUS_STEPS: readonly [string, number][] = [
    ['xs', 1 / 3],
    ['sm', 2 / 3],
    ['md', 1],
    ['lg', 4 / 3],
    ['xl', 2],
    ['2xl', 8 / 3],
    ['3xl', 4],
    ['4xl', 16 / 3],
]

/** Token prefix → the CSS property its functional utility sets. */
const TOKEN_GROUPS: readonly [string, string][] = [
    ['bg', 'background-color'],
    ['border', 'border-color'],
    ['text', 'color'],
]

/** Which intent paints `--color-syntax-1` through `--color-syntax-4`. */
const SYNTAX_INTENTS: readonly Intent[] = ['info', 'default', 'error', 'success']

const TOKENS: readonly Token[] = [
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

const toOklch = converter('oklch')

/** The whole stylesheet: theme tokens, the radius scale, and the intent utilities. */
export function themeCss(input: ThemeInput): string {
    const palettes = intentPalettes(input)

    const lines = [
        '\t--color-*: initial; /* override/reset tailwind colors */',
        ...radiusVars(input.radius),
        ...INTENTS.flatMap((intent) =>
            TOKENS.map((token) => {
                const { dark, light } = palettes[intent]
                return `\t--theme-${intent}-${token}: light-dark(${formatOklch(light[token])}, ${formatOklch(dark[token])});`
            })
        ),
        ...syntaxVars(palettes),
    ]

    return `@theme {\n${lines.join('\n')}\n}\n${utilityBlocks()}`
}

/** Grey seeds must stay grey, so every shade's chroma rides on the seed's. */
function chromaScale(seed: Oklch): number {
    return Math.min(1, seed.c / REFERENCE_CHROMA)
}

function formatOklch({ alpha, c, h, l }: Oklch): string {
    const channels = [round(l, 4), round(c, 4), round(h ?? 0, 2)].join(' ')
    return alpha == null || alpha >= 1
        ? `oklch(${channels})`
        : `oklch(${channels} / ${String(alpha)})`
}

function intentPalettes(input: ThemeInput): Record<Intent, Record<Scheme, Record<Token, Oklch>>> {
    const entries = INTENTS.map((intent) => {
        const seed = toOklch(input.colors[intent])
        if (seed == null) {
            throw new Error(`Invalid ${intent} color: ${input.colors[intent]}`)
        }
        const isMuted = intent === 'default'
        return [
            intent,
            {
                dark: intentShades(seed, isMuted, 'dark'),
                light: intentShades(seed, isMuted, 'light'),
            },
        ] as const
    })

    return Object.fromEntries(entries) as Record<Intent, Record<Scheme, Record<Token, Oklch>>>
}

function intentShades(seed: Oklch, isMuted: boolean, scheme: Scheme): Record<Token, Oklch> {
    const hue = seed.h ?? 0
    const scale = chromaScale(seed)
    const table = isMuted ? MUTED_SHADES : VIBRANT_SHADES

    const surface = (token: SurfaceToken): Oklch => {
        const shade = table[token][scheme]
        return shadeColor({ ...shade, chroma: shade.chroma * scale }, hue)
    }

    const bgBase = surface('bg-base')
    const bgPrimary = solveLightness(
        { chroma: seed.c, lightness: seed.l },
        hue,
        bgBase,
        CONTRAST_TARGETS['bg-primary']
    )

    const onText = (token: 'text-hi-contrast' | 'text-lo-contrast' | 'text-placeholder'): Oklch => {
        const shade = table[token][scheme]
        return solveLightness(
            { ...shade, chroma: shade.chroma * scale },
            hue,
            bgBase,
            CONTRAST_TARGETS[token]
        )
    }

    return {
        'bg-base': bgBase,
        'bg-base-raised': surface('bg-base-raised'),
        'bg-primary': bgPrimary,
        'bg-primary-hover': shadeColor(
            { chroma: bgPrimary.c, lightness: Math.min(bgPrimary.l + HOVER_LIFT, 0.99) },
            hue
        ),
        'bg-tint': surface('bg-tint'),
        'border-default': surface('border-default'),
        'border-field': surface('border-field'),
        'border-field-hover': surface('border-field-hover'),
        'text-accent': textAccent(bgPrimary, hue, scale),
        'text-hi-contrast': onText('text-hi-contrast'),
        'text-lo-contrast': onText('text-lo-contrast'),
        'text-placeholder': onText('text-placeholder'),
    }
}

function radiusVars(radius: number): string[] {
    return RADIUS_STEPS.map(
        ([step, factor]) => `\t--radius-${step}: ${String(round(radius * factor, 4))}rem;`
    )
}

function round(value: number, places: number): number {
    return Number(value.toFixed(places))
}

/** Walks from `from` toward `to` for the first lightness clearing the target. */
function searchLightness(
    at: (lightness: number) => Oklch,
    bg: Oklch,
    target: number,
    from: number,
    to: number
): null | Oklch {
    if (wcagContrast(at(to), bg) < target) {
        return null
    }

    let fail = from
    let pass = to
    for (let step = 0; step < 24; step++) {
        const mid = (fail + pass) / 2
        if (wcagContrast(at(mid), bg) >= target) {
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
function solveLightness(shade: Shade, hue: number, bg: Oklch, target: number): Oklch {
    const at = (lightness: number): Oklch => shadeColor({ ...shade, lightness }, hue)

    if (wcagContrast(at(shade.lightness), bg) >= target) {
        return at(shade.lightness)
    }

    const away = shade.lightness < bg.l ? 0 : 1
    const back = 1 - away

    return (
        searchLightness(at, bg, target, shade.lightness, away) ??
        searchLightness(at, bg, target, bg.l, back) ??
        (wcagContrast(at(0), bg) >= wcagContrast(at(1), bg) ? at(0) : at(1))
    )
}

function syntaxVars(palettes: Record<Intent, Record<Scheme, Record<Token, Oklch>>>): string[] {
    return SYNTAX_INTENTS.map((intent, index) => {
        const { dark, light } = palettes[intent]
        const pair = `light-dark(${formatOklch(light['text-lo-contrast'])}, ${formatOklch(dark['text-lo-contrast'])})`
        return `\t--color-syntax-${String(index + 1)}: ${pair};`
    })
}

/** Sits on `bg-primary`, so it starts from whichever pole reads better there. */
function textAccent(bgPrimary: Oklch, hue: number, scale: number): Oklch {
    const chroma = ACCENT_CHROMA * scale
    const prefersDarkText =
        wcagContrast(shadeColor({ chroma, lightness: 0.02 }, hue), bgPrimary) >=
        wcagContrast(shadeColor({ chroma, lightness: 0.98 }, hue), bgPrimary)

    return solveLightness(
        { chroma, lightness: prefersDarkText ? 0.25 : 0.93 },
        hue,
        bgPrimary,
        CONTRAST_TARGETS['text-accent']
    )
}

function utilityBlocks(): string {
    const functional = TOKEN_GROUPS.map(([group, property]) => {
        const value = `--value(--theme-default-${group}-*, [color])`
        return `@utility ${group}-* {\n\t${property}: ${value};\n\t${property}: --alpha(${value} / calc(--modifier(integer) * 1%));\n}`
    })

    const remaps = INTENTS.filter((intent) => intent !== 'default').map((intent) => {
        const swaps = TOKENS.map(
            (token) => `\t--theme-default-${token}: var(--theme-${intent}-${token});`
        )
        return `@utility ${intent} {\n${swaps.join('\n')}\n}`
    })

    return [...functional, ...remaps].join('\n')
}
