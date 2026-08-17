import type { ContrastWarning, Intent, Scheme, ThemeOverrides, Token } from '@ui-kit.ai/theme'

import type { TokenAddress } from './overrides'

import { overrideAt } from './overrides'

/** Where the engine's contrast complaints land in the tree. */
export interface ContrastReport {
    /** Whether anything under this intent and scheme missed its target. */
    fails: (intent: Intent, scheme: Scheme) => boolean

    /** What went wrong at one token, which is either half of a failing pair. */
    messageAt: (address: TokenAddress) => string | undefined
}

/** What a root icon says: open the branch, the detail is on the leaves. */
export const ROOT_CONTRAST_MESSAGE =
    'There are some contrast & accessibility issues with colors in this theme, expand to learn more.'

/** Nudges the reader at the half they can actually undo. */
const OVERRIDDEN_SUFFIX = ' One of them is overridden — clear it and the engine will solve it.'

/** Each pairing the engine checks, named the way a reader would name it. */
const SUBJECTS: Partial<Record<`${Token} on ${Token}`, string>> = {
    'bg-primary on bg-base': 'the button fill',
    'text-accent on bg-primary': 'button label',
    'text-accent on bg-primary-hover': 'hovered button label',
    'text-hi-contrast on bg-base': 'body text',
    'text-lo-contrast on bg-base': 'secondary text',
    'text-placeholder on bg-base': 'placeholder text',
}

/** Turns the engine's warnings into the two lookups the tree renders icons from. */
export function toContrastReport(
    warnings: readonly ContrastWarning[],
    overrides: ThemeOverrides | undefined
): ContrastReport {
    const intents = new Set<string>()
    const messages = new Map<string, string>()

    for (const warning of warnings) {
        const { background, foreground, intent, scheme } = warning
        const message = toMessage(warning, overrides)

        intents.add(intentKey(intent, scheme))

        // The first complaint about a token speaks for it; the rest repeat the advice.
        for (const token of [foreground, background]) {
            const key = tokenKey({ intent, scheme, token })

            if (!messages.has(key)) messages.set(key, message)
        }
    }

    return {
        fails: (intent, scheme) => intents.has(intentKey(intent, scheme)),
        messageAt: (address) => messages.get(tokenKey(address)),
    }
}

function intentKey(intent: Intent, scheme: Scheme) {
    return `${intent}:${scheme}`
}

/** Whether the reader hand-picked either half, which is the half to clear. */
function isOverridden(warning: ContrastWarning, overrides: ThemeOverrides | undefined) {
    const { background, foreground, intent, scheme } = warning

    return [foreground, background].some(
        (token) => overrideAt(overrides, { intent, scheme, token }) != null
    )
}

/** Whole Lc points, unsigned — a target names a distance, not a direction. */
function lc(value: number) {
    return Math.round(Math.abs(value)).toString()
}

function subject({ background, foreground }: ContrastWarning) {
    const pairing = `${foreground} on ${background}` as const

    return SUBJECTS[pairing] ?? pairing
}

function tokenKey({ intent, scheme, token }: TokenAddress) {
    return `${intent}:${scheme}:${token}`
}

function toMessage(warning: ContrastWarning, overrides: ThemeOverrides | undefined) {
    const { achievedLc, background, foreground, targetLc } = warning

    const complaint = `Not enough contrast between --${foreground} and --${background} — Lc ${lc(achievedLc)} where ${subject(warning)} needs Lc ${lc(targetLc)}.`

    return isOverridden(warning, overrides) ? complaint + OVERRIDDEN_SUFFIX : complaint
}
