'use client'

import { formatOklch } from '@ui-kit.ai/theme'
import { tv } from 'tailwind-variants'

import type { TokenAddress } from './tokens'
import type { ThemeEditorController } from './use-theme-input'

import {
    ColourField,
    ColourFieldClearButton,
    ColourFieldInput,
    ColourFieldPicker,
    ColourFieldSwatch,
} from './colour-field'
import { ContrastIcon } from './contrast-icon'

/** The elbow and trunk that hang a leaf off its intent, in the theme hairline. */
const leafStyles = tv({
    slots: {
        chip: [
            'inline-block max-w-full align-middle',
            'overflow-hidden text-ellipsis whitespace-nowrap',
            'bg-tint border-field text-lo-contrast rounded-sm border px-1.5 py-0.5',
            // The important beats the docs' unlayered `code { font-size: 92% }`.
            'font-mono text-xs!',
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

export interface TokenLeafProps {
    address: TokenAddress
    controller: ThemeEditorController

    /** The first elbow reaches up to meet the root it hangs from. */
    isFirst: boolean

    /** The last elbow rounds off and drops its tail. */
    isLast: boolean
}

/** One derived token: where it hangs, its name, and the colour it holds. */
export function TokenLeaf({ address, controller, isFirst, isLast }: TokenLeafProps) {
    const { intent, scheme, token } = address
    const isOverridden = controller.override(address) != null
    const message = controller.contrast.messageAt(address)
    const styles = leafStyles({ isFirst, isLast })
    const colour = formatOklch(controller.palettes[intent][scheme][token])

    const onChange = (color: string) => {
        controller.setOverride(address, color)
    }

    return (
        <div className={styles.row()}>
            <span className={styles.gutter()}>
                <span className={styles.elbow()} />
                <span className={styles.trunk()} />
            </span>

            <span className='min-w-0 flex-1 self-center overflow-hidden pr-2'>
                <code className={styles.chip()}>--{token}</code>
            </span>

            {message == null ? null : <ContrastIcon message={message} />}

            <ColourField isGenerated={!isOverridden}>
                <ColourFieldSwatch value={colour} />

                <ColourFieldInput
                    isReadOnly={!isOverridden}
                    label={`--${token}, ${scheme}`}
                    onChange={onChange}
                    value={colour}
                />

                {isOverridden ? (
                    <ColourFieldClearButton
                        onPress={() => {
                            controller.clearOverride(address)
                        }}
                    />
                ) : null}

                <ColourFieldPicker
                    hasAlpha
                    onChange={onChange}
                    value={colour}
                />
            </ColourField>
        </div>
    )
}
