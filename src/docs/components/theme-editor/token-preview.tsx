import type { Intent } from '@ui-kit.ai/theme'

import { INTENTS } from '@ui-kit.ai/theme'
import { tv } from 'tailwind-variants'

type CellVariant = 'bg' | 'border' | 'text'

interface TokenGroup {
    heading: string
    rows: TokenRow[]
    variant: CellVariant
}

interface TokenRow {
    /** The surface the swatch sits on, where it isn't the token's own default. */
    ground?: string

    /** Every token name doubles as its utility class, so this is both. */
    token: string
}

const GROUPS: TokenGroup[] = [
    {
        heading: 'Background',
        rows: [
            { token: 'bg-base' },
            { token: 'bg-base-raised' },
            { token: 'bg-tint' },
            { token: 'bg-primary' },
            { token: 'bg-primary-hover' },
        ],
        variant: 'bg',
    },
    {
        heading: 'Text',
        rows: [
            { token: 'text-hi-contrast' },
            { token: 'text-lo-contrast' },
            { token: 'text-placeholder' },
            // This token sits on `bg-primary`, so it samples there.
            { ground: 'bg-primary', token: 'text-accent' },
        ],
        variant: 'text',
    },
    {
        heading: 'Border',
        rows: [
            { token: 'border-default' },
            { token: 'border-field' },
            { token: 'border-field-hover' },
        ],
        variant: 'border',
    },
]

const cellStyles = tv({
    base: ['flex size-6 items-center justify-center', 'rounded-sm', 'text-[0.625rem] leading-none'],
    variants: {
        variant: {
            bg: 'border-default border',
            // 2px, not the house hairline: a border *is* the sample here.
            border: 'bg-base border-2',
            text: 'bg-base border-default border',
        },
    },
})

/** An abridged token reference. Cells read the injected vars, so they self-paint. */
export function TokenPreview() {
    return (
        <section className='border-default flex flex-col gap-4 border-t pt-6'>
            {GROUPS.map(({ heading, rows, variant }) => (
                <div
                    className='flex flex-col gap-1'
                    key={heading}
                >
                    <h3 className='text-lo-contrast mb-1 text-sm font-medium'>{heading}</h3>

                    {rows.map((row) => (
                        <div
                            className='grid grid-cols-[1fr_repeat(5,1.5rem)] items-center gap-1'
                            key={row.token}
                        >
                            <code className='text-placeholder truncate font-mono text-xs'>
                                {row.token}
                            </code>

                            {INTENTS.map((intent) => (
                                <Cell
                                    intent={intent}
                                    key={intent}
                                    row={row}
                                    variant={variant}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </section>
    )
}

/** One swatch, wrapped in the intent utility that remaps its tokens. */
function Cell({ intent, row, variant }: { intent: Intent; row: TokenRow; variant: CellVariant }) {
    return (
        <span className={intent === 'default' ? undefined : intent}>
            <span
                aria-hidden
                className={cellStyles({ class: [row.ground, row.token], variant })}
            >
                {variant === 'text' ? 'Aa' : null}
            </span>
        </span>
    )
}
