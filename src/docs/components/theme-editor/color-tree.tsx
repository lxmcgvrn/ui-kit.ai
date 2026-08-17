'use client'

import type { Intent, Scheme, Token } from '@ui-kit.ai/theme'

import { Button, Label, TagButton, Tooltip, TooltipTrigger } from '@ui-kit.ai/components'
import { formatOklch, INTENTS } from '@ui-kit.ai/theme'
import { LucideChevronRight, LucideInfo } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { TokenAddress } from './overrides'
import type { ThemeEditorController } from './use-theme-input'

import { hasOwnDarkSeed, seedFor } from './color'
import { ColorFieldHex, FieldButtonClear, FieldButtonPicker, FieldGroupColor } from './color-field'
import { ROOT_CONTRAST_MESSAGE } from './contrast-report'
import { countOverrides } from './overrides'

/** The intents, named the way the page talks about them. */
const INTENT_LABELS: Record<Intent, string> = {
    default: 'Primary',
    error: 'Error',
    info: 'Info',
    success: 'Success',
    warning: 'Warning',
}

/** Every token a seed generates, in the order the tree lists them. */
const TREE_TOKENS: readonly Token[] = [
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

const nodeStyles = tv({
    slots: {
        label: 'mb-0 flex-none',
        leaves: 'mt-1 flex flex-col gap-1',
        row: 'flex min-h-8 items-center gap-2',
    },
})

/** The elbow and trunk that hang a leaf off its intent, in the theme hairline. */
const leafStyles = tv({
    slots: {
        chip: [
            'inline-block max-w-full align-middle',
            'overflow-hidden text-ellipsis whitespace-nowrap',
            'bg-tint border-field rounded-sm border px-1.5 py-0.5',
            'font-mono text-xs font-normal',
        ],
        // The gutter is a chevron wide, so the trunk drops from the chevron's centre.
        elbow: 'border-field absolute left-4 w-4 border-b border-l',
        gutter: 'relative w-(--height-ui-element) flex-none',
        row: 'hover:bg-base-raised flex min-h-8 items-stretch rounded-md',

        // Overshoots the row gap below, so the trunk reads as continuous.
        trunk: 'border-field absolute top-4 -bottom-1 left-4 border-l',
    },
    variants: {
        isFirst: {
            false: { elbow: 'top-0 h-4' },

            // The first elbow reaches up over the gap to meet the root it hangs from.
            true: { elbow: '-top-1 h-5' },
        },
        isLast: {
            false: {},

            // The branch ends here: the elbow rounds off and the trunk drops.
            true: { elbow: 'rounded-bl-xs', trunk: 'hidden' },
        },
    },
})

export interface ColorTreeProps {
    controller: ThemeEditorController
    scheme: Scheme
}

interface IntentNodeProps extends ColorTreeProps {
    intent: Intent
    isExpanded: boolean
    onToggle: () => void
}

interface TokenLeafProps {
    address: TokenAddress
    controller: ThemeEditorController

    /** The first elbow reaches up to meet the root it hangs from. */
    isFirst: boolean

    /** The last elbow rounds off and drops its tail. */
    isLast: boolean
}

/** Five seeds, and the sixty tokens they generate, as one 4px-pitched tree. */
export function ColorTree({ controller, scheme }: ColorTreeProps) {
    /* One branch at a time: twelve leaves are already most of the drawer. */
    const [expanded, setExpanded] = useState<Intent>()

    return (
        <div className='flex flex-col gap-1'>
            {INTENTS.map((intent) => (
                <IntentNode
                    controller={controller}
                    intent={intent}
                    isExpanded={expanded === intent}
                    key={intent}
                    onToggle={() => {
                        setExpanded((current) => (current === intent ? undefined : intent))
                    }}
                    scheme={scheme}
                />
            ))}
        </div>
    )
}

/** Flags a color that missed its contrast target, and says so on hover. */
function ButtonContrastWarning({ message }: { message: string }) {
    return (
        <TooltipTrigger>
            <Button
                aria-label='Contrast warning'
                intent='error'
                isIcon
                variant='tertiary'
            >
                <LucideInfo />
            </Button>

            <Tooltip>
                {/* The warning is a sentence, so it wraps instead of running off. */}
                <span className='block max-w-64'>{message}</span>
            </Tooltip>
        </TooltipTrigger>
    )
}

/** One intent's seed, and — once opened — the twelve tokens it generates. */
function IntentNode({ controller, intent, isExpanded, onToggle, scheme }: IntentNodeProps) {
    const { label, leaves, row } = nodeStyles()
    const name = INTENT_LABELS[intent]
    const seed = controller.input.colors[intent]

    // The dark scheme mirrors the light seed until the user aims it elsewhere.
    const isMirroring = scheme === 'dark' && !hasOwnDarkSeed(seed)
    const overrides = countOverrides(controller.input.overrides, intent, scheme)
    const color = seedFor(seed, scheme)

    const onChange = (color: string) => {
        controller.setColor(intent, scheme, color)
    }

    return (
        <div>
            <ColorFieldHex
                className={row()}
                isReadOnly={isMirroring}
                onChange={onChange}
                value={color}
            >
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

                <Label className={label()}>{name}</Label>

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
                    <ButtonContrastWarning message={ROOT_CONTRAST_MESSAGE} />
                ) : null}

                <FieldGroupColor
                    isGenerated={isMirroring}
                    value={color}
                >
                    {scheme === 'dark' && !isMirroring ? (
                        <FieldButtonClear
                            onPress={() => {
                                controller.clearDarkSeed(intent)
                            }}
                        />
                    ) : null}

                    <FieldButtonPicker
                        hasAlpha={false}
                        onChange={onChange}
                        value={color}
                    />
                </FieldGroupColor>
            </ColorFieldHex>

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

/** One derived token: where it hangs, its name, and the color it holds. */
function TokenLeaf({ address, controller, isFirst, isLast }: TokenLeafProps) {
    const { intent, scheme, token } = address
    const isOverridden = controller.override(address) != null
    const message = controller.contrast.messageAt(address)
    const styles = leafStyles({ isFirst, isLast })
    const color = formatOklch(controller.palettes[intent][scheme][token])

    const onChange = (color: string) => {
        controller.setOverride(address, color)
    }

    return (
        <ColorFieldHex
            className={styles.row()}
            isReadOnly={!isOverridden}
            onChange={onChange}
            value={color}
        >
            <span className={styles.gutter()}>
                <span className={styles.elbow()} />
                <span className={styles.trunk()} />
            </span>

            <span className='min-w-0 flex-1 self-center overflow-hidden pr-2'>
                <Label className='mb-0 min-w-0'>
                    <span className={styles.chip()}>--{token}</span>
                </Label>
            </span>

            {message == null ? null : <ButtonContrastWarning message={message} />}

            <FieldGroupColor
                isGenerated={!isOverridden}
                value={color}
            >
                {isOverridden ? (
                    <FieldButtonClear
                        onPress={() => {
                            controller.clearOverride(address)
                        }}
                    />
                ) : null}

                <FieldButtonPicker
                    hasAlpha
                    onChange={onChange}
                    value={color}
                />
            </FieldGroupColor>
        </ColorFieldHex>
    )
}
