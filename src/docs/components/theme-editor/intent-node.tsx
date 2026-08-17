'use client'

import type { Intent, Scheme } from '@ui-kit.ai/theme'

import { Button, TagButton, Tooltip, TooltipTrigger } from '@ui-kit.ai/components'
import { LucideChevronRight } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { ThemeEditorController } from './use-theme-input'

import { hasOwnDarkSeed, seedFor } from './color'
import {
    ColourField,
    ColourFieldClearButton,
    ColourFieldInput,
    ColourFieldPicker,
    ColourFieldSwatch,
} from './colour-field'
import { ContrastIcon } from './contrast-icon'
import { ROOT_CONTRAST_MESSAGE } from './contrast-report'
import { countOverrides } from './overrides'
import { TokenLeaf } from './token-leaf'
import { TREE_TOKENS } from './tokens'

/** The intents, named the way the page talks about them. */
const INTENT_LABELS: Record<Intent, string> = {
    default: 'Primary',
    error: 'Error',
    info: 'Info',
    success: 'Success',
    warning: 'Warning',
}

const nodeStyles = tv({
    slots: {
        label: 'flex-none text-sm font-medium',
        leaves: 'mt-1 flex flex-col gap-1',
        row: 'flex min-h-8 items-center gap-2',
    },
})

const { label, leaves, row } = nodeStyles()

export interface IntentNodeProps {
    controller: ThemeEditorController
    intent: Intent
    isExpanded: boolean
    onToggle: () => void
    scheme: Scheme
}

/** One intent's seed, and — once opened — the twelve tokens it generates. */
export function IntentNode({ controller, intent, isExpanded, onToggle, scheme }: IntentNodeProps) {
    const name = INTENT_LABELS[intent]
    const seed = controller.input.colors[intent]

    // The dark scheme mirrors the light seed until the user aims it elsewhere.
    const isMirroring = scheme === 'dark' && !hasOwnDarkSeed(seed)
    const overrides = countOverrides(controller.input.overrides, intent, scheme)
    const colour = seedFor(seed, scheme)

    const onChange = (color: string) => {
        controller.setColor(intent, scheme, color)
    }

    return (
        <div>
            <div className={row()}>
                <Button
                    aria-expanded={isExpanded}
                    aria-label={`${name} tokens`}
                    isIcon
                    onPress={onToggle}
                    variant='tertiary'
                >
                    <LucideChevronRight
                        className={twMerge(
                            'transition-transform duration-150 ease-out',
                            isExpanded && 'rotate-90'
                        )}
                    />
                </Button>

                <span className={label()}>{name}</span>

                {overrides === 0 ? null : (
                    <TooltipTrigger>
                        <TagButton
                            onPress={() => {
                                controller.clearIntentOverrides(intent, scheme)
                            }}
                        >
                            +{overrides} overrides
                        </TagButton>

                        <Tooltip>Clear overrides</Tooltip>
                    </TooltipTrigger>
                )}

                <span className='flex-1' />

                {controller.contrast.fails(intent, scheme) ? (
                    <ContrastIcon message={ROOT_CONTRAST_MESSAGE} />
                ) : null}

                <ColourField isGenerated={isMirroring}>
                    <ColourFieldSwatch value={colour} />

                    <ColourFieldInput
                        isReadOnly={isMirroring}
                        label={`${name} seed, ${scheme}`}
                        onChange={onChange}
                        value={colour}
                    />

                    {scheme === 'dark' && !isMirroring ? (
                        <ColourFieldClearButton
                            onPress={() => {
                                controller.clearDarkSeed(intent)
                            }}
                        />
                    ) : null}

                    <ColourFieldPicker
                        hasAlpha={false}
                        onChange={onChange}
                        value={colour}
                    />
                </ColourField>
            </div>

            {isExpanded ? (
                <div className={leaves()}>
                    {TREE_TOKENS.map((token, index) => (
                        <TokenLeaf
                            address={{ intent, scheme, token }}
                            controller={controller}
                            isFirst={index === 0}
                            isLast={index === TREE_TOKENS.length - 1}
                            key={token}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    )
}
