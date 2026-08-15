import type { Intent, Scheme, Token } from '@ui-kit.ai/theme'

/** One color the editor can reach: a token, in a scheme, under an intent. */
export interface TokenAddress {
    intent: Intent
    scheme: Scheme
    token: Token
}

/** A family of tokens, headed the way the card lists it. */
export interface TokenGroup {
    heading: string
    tokens: readonly Token[]
}

/** The token without its family, which the group heading already names. */
export function toShortToken(token: Token) {
    return token.slice(token.indexOf('-') + 1)
}

/** Every token, in the three families a card walks through. */
export const TOKEN_GROUPS: readonly TokenGroup[] = [
    {
        heading: 'Backgrounds',
        tokens: ['bg-base', 'bg-base-raised', 'bg-tint', 'bg-primary', 'bg-primary-hover'],
    },
    {
        heading: 'Borders',
        tokens: ['border-default', 'border-field', 'border-field-hover'],
    },
    {
        heading: 'Text',
        tokens: ['text-hi-contrast', 'text-lo-contrast', 'text-placeholder', 'text-accent'],
    },
]
