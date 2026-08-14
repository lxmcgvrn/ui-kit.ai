import type { Oklch } from 'culori'

import { clampChroma, converter, wcagContrast } from 'culori'

export type Depth = 'lots' | 'none' | 'some'

export type Intent = 'default' | 'error' | 'info' | 'success' | 'warning'

export interface Preset {
    input: ThemeInput
    label: string
    name: string
}

export type Saturation = 'lots' | 'none' | 'some'

export interface ThemeInput {
    /** One seed per intent, in any CSS color syntax. Every shade derives from these. */
    colors: Record<Intent, string>

    /** How much the surfaces lift off the page: shadows, edge highlights, gradients. */
    depth?: Depth

    /** Base radius in rem — the `md` step. Every other step scales with it. */
    radius: number

    /** How much of the seed's hue bleeds into backgrounds, borders and body text. */
    saturation?: Saturation
}

interface Ground {
    color: Oklch

    /** The ratio the token has to clear here. */
    target: number
}

/** Every background a token sits on. The first one also aims the search. */
type Grounds = readonly [Ground, ...Ground[]]

type Scheme = 'dark' | 'light'

interface Shade {
    alpha?: number
    chroma: number
    lightness: number
}

type SurfaceToken = Exclude<
    Token,
    'bg-primary' | 'bg-primary-hover' | 'depth-primary-brighter' | 'text-accent'
>

type Token =
    | 'bg-base'
    | 'bg-base-raised'
    | 'bg-primary'
    | 'bg-primary-hover'
    | 'bg-tint'
    | 'border-default'
    | 'border-field'
    | 'border-field-hover'
    | 'depth-primary-brighter'
    | 'text-accent'
    | 'text-hi-contrast'
    | 'text-lo-contrast'
    | 'text-placeholder'

/** Weakest to strongest, the way the editor's slider runs. */
export const DEPTHS: readonly Depth[] = ['none', 'some', 'lots']

/** Today's look: a hairline drop shadow, and flat fills. */
export const DEFAULT_DEPTH: Depth = 'some'

/** Weakest to strongest, the way the editor's slider runs. */
export const SATURATIONS: readonly Saturation[] = ['none', 'some', 'lots']

/** Today's look: the seed's hue tints the surfaces at full strength. */
export const DEFAULT_SATURATION: Saturation = 'some'

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

/** No text clears 4.5 on a mid fill, so lifted fills hold the UI ratio. */
const LIFTED_TARGET = 3

/** The lit top edge's color; `lots`' text shadow casts the same light. */
const EDGE_LIGHT = 'light-dark(oklch(1 0 0 / 0.3), oklch(1 0 0 / 0.16))'

/** `--inset-shadow-depth`: a lit top edge over a shaded bottom one. */
const EDGE_HIGHLIGHTS: Record<Depth, string> = {
    lots: [
        `inset 0 1px 0 0 ${EDGE_LIGHT}`,
        'inset 0 -1px 0 0 light-dark(oklch(0 0 0 / 0.12), oklch(0 0 0 / 0.22))',
    ].join(', '),
    none: '0 0 #0000',
    some: '0 0 #0000',
}

/** `--depth-text-shadow`: letterpress under type on primary fills. */
const TEXT_SHADOWS: Record<Depth, string> = {
    lots: `0 1px 0 ${EDGE_LIGHT}`,
    none: 'none',
    some: 'none',
}

/** `--shadow-xs`, worn by buttons and fields. `some` is Tailwind's own value. */
const SMALL_SHADOWS: Record<Depth, string> = {
    lots: '0 1px 2px 0 rgb(0 0 0 / 0.09)',
    none: '0 0 #0000',
    some: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
}

/** Chroma of `text-accent` before gamut clamping — a tint, not a flat black/white. */
const ACCENT_CHROMA = 0.05

/** A seed at least this chromatic renders the theme at full saturation. */
const REFERENCE_CHROMA = 0.15

/** Multiplies the chroma of every derived shade. `none` still keeps a hint. */
const SATURATION_SCALES: Record<Saturation, number> = {
    lots: 1.75,
    none: 0.35,
    some: 1,
}

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
    'depth-primary-brighter',
    'text-accent',
    'text-hi-contrast',
    'text-lo-contrast',
    'text-placeholder',
]

const toOklch = converter('oklch')

/** The whole stylesheet: theme tokens, the radius scale, and the intent utilities. */
export function themeCss(input: ThemeInput): string {
    const depth = input.depth ?? DEFAULT_DEPTH
    const palettes = intentPalettes(input, depth, input.saturation ?? DEFAULT_SATURATION)

    const lines = [
        '\t--color-*: initial; /* override/reset tailwind colors */',
        ...radiusVars(input.radius),
        ...depthVars(depth),
        ...INTENTS.flatMap((intent) =>
            TOKENS.map((token) => {
                const { dark, light } = palettes[intent]
                return `\t--theme-${intent}-${token}: light-dark(${formatOklch(light[token])}, ${formatOklch(dark[token])});`
            })
        ),
        ...syntaxVars(palettes),
    ]

    return `@theme {\n${lines.join('\n')}\n}\n${utilityBlocks(depth)}`
}

/** Grey seeds must stay grey, so every shade's chroma rides on the seed's. */
function chromaScale(seed: Oklch): number {
    return Math.min(1, seed.c / REFERENCE_CHROMA)
}

/** Tailwind inlines shadow values, so the knobs hide behind their own vars. */
function depthVars(depth: Depth): string[] {
    return [
        `\t--depth-small-shadow: ${SMALL_SHADOWS[depth]};`,
        `\t--depth-edge-highlight: ${EDGE_HIGHLIGHTS[depth]};`,
        `\t--depth-text-shadow: ${TEXT_SHADOWS[depth]};`,
        '\t--shadow-xs: var(--depth-small-shadow);',
        '\t--inset-shadow-depth: var(--depth-edge-highlight);',
    ]
}

function formatOklch({ alpha, c, h, l }: Oklch): string {
    const channels = [round(l, 4), round(c, 4), round(h ?? 0, 2)].join(' ')
    return alpha == null || alpha >= 1
        ? `oklch(${channels})`
        : `oklch(${channels} / ${String(alpha)})`
}

/** Twins of the functional `bg-*`. They add the gradient and letterpress. */
function gradientUtilities(depth: Depth): string[] {
    // Spell the stops out here. A `:root` alias loses the intent remap.
    const fill = (token: Token, from: Token) =>
        [
            `@utility ${token} {`,
            `\tbackground-color: var(--theme-default-${token});`,
            ...(depth === 'lots'
                ? [
                      `\tbackground-image: linear-gradient(to bottom, var(--theme-default-${from}), var(--theme-default-${token}));`,
                  ]
                : []),
            '\ttext-shadow: var(--depth-text-shadow);',
            '}',
        ].join('\n')

    return [
        fill('bg-primary', 'bg-primary-hover'),
        fill('bg-primary-hover', 'depth-primary-brighter'),
    ]
}

/** How far a color clears its worst ground: 1 sits on target. */
function headroom(color: Oklch, grounds: Grounds): number {
    return Math.min(...grounds.map(({ color: bg, target }) => wcagContrast(color, bg) / target))
}

function intentPalettes(
    input: ThemeInput,
    depth: Depth,
    saturation: Saturation
): Record<Intent, Record<Scheme, Record<Token, Oklch>>> {
    const entries = INTENTS.map((intent) => {
        const seed = toOklch(input.colors[intent])
        if (seed == null) {
            throw new Error(`Invalid ${intent} color: ${input.colors[intent]}`)
        }
        const isMuted = intent === 'default'
        return [
            intent,
            {
                dark: intentShades(seed, isMuted, 'dark', depth, saturation),
                light: intentShades(seed, isMuted, 'light', depth, saturation),
            },
        ] as const
    })

    return Object.fromEntries(entries) as Record<Intent, Record<Scheme, Record<Token, Oklch>>>
}

function intentShades(
    seed: Oklch,
    isMuted: boolean,
    scheme: Scheme,
    depth: Depth,
    saturation: Saturation
): Record<Token, Oklch> {
    const hue = seed.h ?? 0
    const scale = chromaScale(seed)
    const bleed = SATURATION_SCALES[saturation]
    const table = isMuted ? MUTED_SHADES : VIBRANT_SHADES

    // `bg-tint` is the seed's own wash, so the saturation knob passes it by.
    const surface = (token: SurfaceToken, multiplier = bleed): Oklch => {
        const shade = table[token][scheme]
        return shadeColor({ ...shade, chroma: shade.chroma * scale * multiplier }, hue)
    }

    const bgBase = surface('bg-base')
    const bgPrimary = solveLightness({ chroma: seed.c, lightness: seed.l }, hue, [
        { color: bgBase, target: CONTRAST_TARGETS['bg-primary'] },
    ])

    const lift = (steps: number): Oklch =>
        shadeColor(
            { chroma: bgPrimary.c, lightness: Math.min(bgPrimary.l + HOVER_LIFT * steps, 0.99) },
            hue
        )

    const onText = (token: 'text-hi-contrast' | 'text-lo-contrast' | 'text-placeholder'): Oklch => {
        const shade = table[token][scheme]
        return solveLightness({ ...shade, chroma: shade.chroma * scale * bleed }, hue, [
            { color: bgBase, target: CONTRAST_TARGETS[token] },
        ])
    }

    const bgPrimaryHover = lift(1)
    const brighter = lift(2)

    // Under `lots` the brighter stop reaches behind text too, so it joins the solve.
    const accentGrounds: Grounds = [
        { color: bgPrimary, target: CONTRAST_TARGETS['text-accent'] },
        { color: bgPrimaryHover, target: LIFTED_TARGET },
        ...(depth === 'lots' ? [{ color: brighter, target: LIFTED_TARGET }] : []),
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
        'depth-primary-brighter': brighter,
        'text-accent': textAccent(accentGrounds, hue, scale),
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
    grounds: Grounds,
    from: number,
    to: number
): null | Oklch {
    if (headroom(at(to), grounds) < 1) {
        return null
    }

    let fail = from
    let pass = to
    for (let step = 0; step < 24; step++) {
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

function syntaxVars(palettes: Record<Intent, Record<Scheme, Record<Token, Oklch>>>): string[] {
    return SYNTAX_INTENTS.map((intent, index) => {
        const { dark, light } = palettes[intent]
        const pair = `light-dark(${formatOklch(light['text-lo-contrast'])}, ${formatOklch(dark['text-lo-contrast'])})`
        return `\t--color-syntax-${String(index + 1)}: ${pair};`
    })
}

/** Sits on every primary fill, so it starts from whichever pole reads better. */
function textAccent(grounds: Grounds, hue: number, scale: number): Oklch {
    const chroma = ACCENT_CHROMA * scale
    const prefersDarkText =
        headroom(shadeColor({ chroma, lightness: 0.02 }, hue), grounds) >=
        headroom(shadeColor({ chroma, lightness: 0.98 }, hue), grounds)

    return solveLightness({ chroma, lightness: prefersDarkText ? 0.25 : 0.93 }, hue, grounds)
}

function utilityBlocks(depth: Depth): string {
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

    return [...functional, ...gradientUtilities(depth), ...remaps].join('\n')
}
