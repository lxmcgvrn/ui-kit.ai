'use client'

import { formatOklch } from '@ui-kit.ai/theme'

import type { TokenAddress } from './tokens'
import type { ThemeEditorController } from './use-theme-input'

import { TOKEN_CHANNELS } from './color-picker-button'
import { ColorRowField } from './color-row-field'
import { CARD_ROW } from './field'
import { toShortToken } from './tokens'

/** Twelve tokens under one seed, so the rows run a size below it. */
const COMPACT = 'h-7 [--height-ui-element:1.75rem] [&_input]:h-7 [&_input]:text-xs'

export interface TokenRowProps {
    address: TokenAddress
    theme: ThemeEditorController
}

/** One token's colour in one scheme, derived until the user picks otherwise. */
export function TokenRow({ address, theme }: TokenRowProps) {
    const { intent, scheme, token } = address
    const isOverridden = theme.override(address) != null

    return (
        <div className={CARD_ROW}>
            <code
                className='text-placeholder truncate font-mono text-xs'
                title={token}
            >
                {toShortToken(token)}
            </code>

            <ColorRowField
                channels={TOKEN_CHANNELS}
                className={COMPACT}
                isDerived={!isOverridden}
                label={`${token}, ${scheme}`}
                onChange={(color) => {
                    theme.setOverride(address, color)
                }}
                onClear={
                    isOverridden
                        ? () => {
                              theme.clearOverride(address)
                          }
                        : undefined
                }
                value={formatOklch(theme.palettes[intent][scheme][token])}
            />
        </div>
    )
}
