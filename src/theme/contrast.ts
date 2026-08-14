import type { Token } from './palette'

export type ApcaTier = keyof typeof APCA_TIERS

/** One pairing the palette solves, and the bar it has to clear. */
export interface ContrastRequirement {
    /** The token the foreground sits on. */
    background: Token

    /** The token whose lightness the solver drives. */
    foreground: Token

    /** Why this pairing lands on this tier. */
    rationale: string

    /** Names the bar; `APCA_TIERS` carries the Lc. */
    tier: ApcaTier
}

/** Steps of the APCA readability criterion, in Lc. */
export const APCA_TIERS = {
    /** Lc 75 — the floor for body text. Fits short, heavier strings. */
    bodyTextMinimum: 75,

    /** Lc 90 — the preferred bar for body text, at any size or weight. */
    bodyTextPreferred: 90,

    /** Lc 60 — content text: headings, labels, and other short strings. */
    contentText: 60,

    /** Lc 30 — the floor for large solid elements, like a button's fill. */
    solidElement: 30,

    /** Lc 45 — spot readable: text a reader glances at rather than reads. */
    spotReadable: 45,
} as const

/** Tiers from strongest to weakest, for walking down one step. */
const TIER_LADDER: readonly ApcaTier[] = [
    'bodyTextPreferred',
    'bodyTextMinimum',
    'contentText',
    'spotReadable',
    'solidElement',
]

/** One tier down — the worst the theme will ship when `tier` is out of reach. */
export function compromiseLc(tier: ApcaTier): number {
    const below = TIER_LADDER[TIER_LADDER.indexOf(tier) + 1]

    return APCA_TIERS[below ?? tier]
}

/** Every pairing the palette solves for, with the tier each one has to clear. */
export const CONTRAST_POLICY: readonly ContrastRequirement[] = [
    {
        background: 'bg-base',
        foreground: 'text-hi-contrast',
        rationale: 'Sets the page in paragraphs, so it takes the preferred bar.',
        tier: 'bodyTextPreferred',
    },
    {
        background: 'bg-base',
        foreground: 'text-lo-contrast',
        rationale: 'Secondary strings stay short; paragraphs belong at hi-contrast.',
        tier: 'contentText',
    },
    {
        background: 'bg-base',
        foreground: 'text-placeholder',
        rationale: 'A placeholder has to recede, and the reader only glances at it.',
        tier: 'spotReadable',
    },
    {
        background: 'bg-primary',
        foreground: 'text-accent',
        rationale: 'Fill labels are short and semibold at sizes the library fixes.',
        tier: 'contentText',
    },
    {
        background: 'bg-primary-hover',
        foreground: 'text-accent',
        rationale: 'Hover passes in a moment, so the lifted fill clears a lower bar.',
        tier: 'spotReadable',
    },
    {
        background: 'bg-base',
        foreground: 'bg-primary',
        rationale: 'The fill is a shape, not text: it only has to read as distinct.',
        tier: 'solidElement',
    },
]

/** The Lc a pairing has to clear. Throws when the policy leaves it out. */
export function requiredLc(foreground: Token, background: Token): number {
    const requirement = CONTRAST_POLICY.find(
        (entry) => entry.background === background && entry.foreground === foreground
    )
    if (requirement == null) {
        throw new Error(`No contrast policy for ${foreground} on ${background}`)
    }

    return APCA_TIERS[requirement.tier]
}
