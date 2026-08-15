import type { Block } from './css'
import type {
    ContrastWarning,
    Intent,
    IntentPalette,
    Palettes,
    ResolvedTheme,
    ThemeInput,
    ThemeSetting,
    Token,
} from './palette'

import { rule, utility } from './css'
import {
    contrastWarnings,
    formatOklch,
    intentPalettes,
    INTENTS,
    resolveTheme,
    TOKENS,
} from './palette'

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

/** A stylesheet, its colors, and every contrast target they fell short of. */
export interface GeneratedTheme {
    css: string
    palettes: Palettes
    warnings: readonly ContrastWarning[]
}

type VarEntry = [property: `--${string}`, value: string]

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

/** The utility name Tailwind matches, and the property it paints. */
const FUNCTIONAL_UTILITIES: readonly [name: string, block: Block][] = [
    ['bg-*', { backgroundColor: tokenValue('bg') }],
    ['border-*', { borderColor: tokenValue('border') }],
    ['text-*', { color: tokenValue('text') }],
]

/** Tailwind's own proportions, expressed against the `md` step. */
const RADIUS_STEPS: readonly [step: string, factor: number][] = [
    ['xs', 1 / 3],
    ['sm', 2 / 3],
    ['md', 1],
    ['lg', 4 / 3],
    ['xl', 2],
    ['2xl', 8 / 3],
    ['3xl', 4],
    ['4xl', 16 / 3],
]

/** The fill's own rim: `bg-primary` pulled toward black, never a neutral. */
const RIM = `color-mix(in oklab, ${fill('bg-primary')}, black 15%)`

/** Every layer of the interactive primary fill, in one class. */
const SURFACE_PRIMARY: Block = {
    // Hover goes flat: the surface lights up rather than lifting again.
    '&[data-hovered]': {
        backgroundColor: fill('bg-primary-hover'),
        backgroundImage: 'none',
    },
    '&[data-pressed]': {
        backgroundColor: fill('bg-primary'),
        backgroundImage: gradient('bg-primary-hover', 'bg-primary'),
    },
    backgroundColor: fill('bg-primary'),
    backgroundImage: gradient('bg-primary-hover', 'bg-primary'),
    // Side longhands, not the shorthand: sorted properties must not override.
    borderBottomColor: edgeMix('black'),
    borderLeftColor: RIM,
    borderRightColor: RIM,
    borderTopColor: edgeMix('white'),
    boxShadow: 'var(--depth-edge-highlight), var(--depth-small-shadow)',
    color: fill('text-accent'),
    textShadow: 'var(--depth-text-shadow)',
}

/** Which intent paints `--color-syntax-1` through `--color-syntax-4`. */
export const SYNTAX_INTENTS: readonly Intent[] = ['info', 'default', 'error', 'success']

/** The whole stylesheet: theme tokens, the radius scale, and the intent utilities. */
export function generateTheme(input: ThemeInput): GeneratedTheme {
    const theme = resolveTheme(input)
    const palettes = intentPalettes(theme)

    return {
        css: [
            rule('@theme', themeBlock(theme, palettes)),
            ...FUNCTIONAL_UTILITIES.map(([name, block]) => utility(name, block)),
            utility('surface-primary', SURFACE_PRIMARY),
            ...INTENTS.filter((intent) => intent !== 'default').map(remapUtility),
        ].join('\n'),
        palettes,
        warnings: contrastWarnings(palettes),
    }
}

/** Tailwind inlines shadow values, so the knobs hide behind their own vars. */
function depthVars(depth: ThemeSetting): Block {
    const { edgeHighlight, gradientAlpha, smallShadow, textShadow } = DEPTH_TREATMENTS[depth]

    return {
        '--depth-edge-highlight': edgeHighlight,
        '--depth-gradient-alpha': gradientAlpha,
        '--depth-small-shadow': smallShadow,
        '--depth-text-shadow': textShadow,
        '--inset-shadow-depth': 'var(--depth-edge-highlight)',
        '--shadow-xs': 'var(--depth-small-shadow)',
    }
}

/** At `lots` the rim lightens up top and darkens below; flat depths collapse. */
function edgeMix(toward: 'black' | 'white'): string {
    return `color-mix(in oklab, ${RIM}, ${toward} calc(var(--depth-gradient-alpha) * 12%))`
}

/** Reads the token off the element, so an intent remap can swap it out. */
function fill(token: Token): string {
    return `var(--theme-default-${token})`
}

/** The fade slides up out of the box as `--depth-gradient-alpha` falls to 0. */
function gradient(from: Token, to: Token): string {
    const slide = 'var(--depth-gradient-alpha) * 100%'

    return `linear-gradient(to bottom, ${fill(from)} calc(${slide} - 100%), ${fill(to)} calc(${slide}))`
}

function lightDark(palette: IntentPalette, token: Token): string {
    return `light-dark(${formatOklch(palette.light[token])}, ${formatOklch(palette.dark[token])})`
}

function radiusVars(radius: number): Block {
    return varBlock(
        RADIUS_STEPS.map(([step, factor]): VarEntry => [`--radius-${step}`, rem(radius * factor)])
    )
}

/** Trims the float noise a fractional step leaves behind. */
function rem(length: number): string {
    return `${String(Number(length.toFixed(4)))}rem`
}

/** Repoints every `default` token at this intent's, for everything below. */
function remapUtility(intent: Intent): string {
    const swaps = TOKENS.map(
        (token): VarEntry => [`--theme-default-${token}`, `var(--theme-${intent}-${token})`]
    )

    return utility(intent, varBlock(swaps))
}

function syntaxVars(palettes: Palettes): Block {
    return varBlock(
        SYNTAX_INTENTS.map(
            (intent, index): VarEntry => [
                `--color-syntax-${String(index + 1)}`,
                lightDark(palettes[intent], 'text-lo-contrast'),
            ]
        )
    )
}

function themeBlock(theme: ResolvedTheme, palettes: Palettes): Block {
    return {
        // Drops Tailwind's own palette, leaving the theme tokens to stand alone.
        '--color-*': 'initial',
        ...radiusVars(theme.radius),
        ...depthVars(theme.depth),
        ...tokenVars(palettes),
        ...syntaxVars(palettes),
    }
}

/** The plain color, then the same color under an opacity modifier like `/80`. */
function tokenValue(prefix: string): readonly string[] {
    const value = `--value(--theme-default-${prefix}-*, [color])`

    return [value, `--alpha(${value} / calc(--modifier(integer) * 1%))`]
}

function tokenVars(palettes: Palettes): Block {
    return varBlock(
        INTENTS.flatMap((intent) =>
            TOKENS.map(
                (token): VarEntry => [
                    `--theme-${intent}-${token}`,
                    lightDark(palettes[intent], token),
                ]
            )
        )
    )
}

function varBlock(entries: readonly VarEntry[]): Block {
    const block: Block = {}
    for (const [property, value] of entries) {
        block[property] = value
    }

    return block
}
