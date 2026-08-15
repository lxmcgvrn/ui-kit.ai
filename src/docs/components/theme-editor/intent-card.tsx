'use client'

import type { Intent, Scheme } from '@ui-kit.ai/theme'

import { Card, Disclosure, DisclosureButton, DisclosurePanel } from '@ui-kit.ai/components'
import { twMerge } from 'tailwind-merge'

import type { ThemeEditorController } from './use-theme-input'

import { hasOwnDarkSeed, seedFor } from './color'
import { SEED_CHANNELS } from './color-picker-button'
import { ColorRowField } from './color-row-field'
import { CARD_ROW, toLabel } from './field'
import { TokenRow } from './token-row'
import { TOKEN_GROUPS } from './tokens'

export interface IntentCardProps {
    intent: Intent
    isExpanded: boolean
    onExpandedChange: (isExpanded: boolean) => void
    scheme: Scheme
    theme: ThemeEditorController
}

/** One intent's seed, and every shade the engine derives from it. */
export function IntentCard({
    intent,
    isExpanded,
    onExpandedChange,
    scheme,
    theme,
}: IntentCardProps) {
    const label = toLabel(intent)
    const seed = theme.input.colors[intent]

    // The dark scheme mirrors the light seed until the user aims it elsewhere.
    const isAimed = scheme === 'light' || hasOwnDarkSeed(seed)

    return (
        <Card>
            <Disclosure
                className='gap-0'
                isExpanded={isExpanded}
                onExpandedChange={onExpandedChange}
            >
                <div className={twMerge(CARD_ROW, 'p-3')}>
                    <span className='text-hi-contrast truncate text-sm font-medium'>{label}</span>

                    <ColorRowField
                        channels={SEED_CHANNELS}
                        isDerived={!isAimed}
                        label={`${label} seed, ${scheme}`}
                        onChange={(color) => {
                            theme.setColor(intent, scheme, color)
                        }}
                        onClear={
                            isAimed && scheme === 'dark'
                                ? () => {
                                      theme.clearDarkSeed(intent)
                                  }
                                : undefined
                        }
                        value={seedFor(seed, scheme)}
                    />

                    <DisclosureButton
                        aria-label={`${label} tokens`}
                        isIcon
                    />
                </div>

                <p
                    aria-live='polite'
                    className='error text-lo-contrast px-3 pb-3 text-sm font-medium empty:hidden'
                >
                    {theme.contrastError(intent)}
                </p>

                {/* A collapsed panel keeps its own box, so the padding goes inside it. */}
                <DisclosurePanel>
                    <div className='border-default flex flex-col gap-4 border-t p-3'>
                        {TOKEN_GROUPS.map(({ heading, tokens }) => (
                            <div
                                className='flex flex-col gap-1'
                                key={heading}
                            >
                                <h4 className='text-lo-contrast text-xs font-medium'>{heading}</h4>

                                {tokens.map((token) => (
                                    <TokenRow
                                        address={{ intent, scheme, token }}
                                        key={token}
                                        theme={theme}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </Card>
    )
}
