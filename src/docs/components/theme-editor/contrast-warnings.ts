import type { ContrastWarning, Intent, Token } from '@ui-kit.ai/theme'

/** One message per intent whose seed misses a contrast target. */
export type ContrastErrors = Partial<Record<Intent, string>>

/** Each pairing the engine checks, named the way the page shows it. */
const SUBJECTS: Partial<Record<`${Token} on ${Token}`, string>> = {
    'bg-primary on bg-base': 'The button fill',
    'text-accent on bg-primary': 'Button label',
    'text-accent on bg-primary-hover': 'Hovered button label',
    'text-hi-contrast on bg-base': 'Body text',
    'text-lo-contrast on bg-base': 'Secondary text',
    'text-placeholder on bg-base': 'Placeholder text',
}

/** Folds the engine's warnings into one message per intent field. */
export function toContrastErrors(warnings: readonly ContrastWarning[]): ContrastErrors {
    const errors: ContrastErrors = {}

    for (const [intent, group] of groupByIntent(warnings)) {
        errors[intent] = toMessage(group)
    }

    return errors
}

function groupByIntent(warnings: readonly ContrastWarning[]) {
    const groups = new Map<Intent, ContrastWarning[]>()

    for (const warning of warnings) {
        const group = groups.get(warning.intent) ?? []

        group.push(warning)
        groups.set(warning.intent, group)
    }

    return groups
}

/** Whole Lc points, unsigned — a target names a distance, not a direction. */
function lc(value: number) {
    return Math.round(Math.abs(value))
}

function shortfall(warning: ContrastWarning) {
    return lc(warning.targetLc) - lc(warning.achievedLc)
}

function subject({ background, foreground }: ContrastWarning) {
    const pairing = `${foreground} on ${background}` as const

    return SUBJECTS[pairing] ?? pairing
}

/** The worst shortfall speaks for the intent; the rest are the same advice twice. */
function toMessage(group: readonly ContrastWarning[]) {
    const worst = group.reduce((worst, warning) =>
        shortfall(warning) > shortfall(worst) ? warning : worst
    )

    const achieved = lc(worst.achievedLc).toString()
    const target = lc(worst.targetLc).toString()

    // One failing scheme is worth naming; both failing points at the colour.
    const scheme = group.every(({ scheme }) => scheme === worst.scheme)
        ? ` in ${worst.scheme} mode`
        : ''

    return `${subject(worst)} contrast reaches Lc ${achieved} of the Lc ${target} target${scheme} — pick a darker or lighter shade.`
}
