import type { Intent, Scheme, Token } from '@ui-kit.ai/theme'

/** One color the editor can reach: a token, in a scheme, under an intent. */
export interface TokenAddress {
    intent: Intent
    scheme: Scheme
    token: Token
}

/** Every token a seed generates, in the order the tree lists them. */
export const TREE_TOKENS: readonly Token[] = [
    'bg-base',
    'bg-base-raised',
    'bg-tint',
    'bg-primary',
    'bg-primary-hover',
    'border-default',
    'border-field',
    'border-field-hover',
    'text-accent',
    'text-hi-contrast',
    'text-lo-contrast',
    'text-placeholder',
]
