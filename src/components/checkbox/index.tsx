import type { CheckboxProps as RACCheckboxProps } from 'react-aria-components'

import { LucideCheck, LucideMinus } from 'lucide-react'
import { composeRenderProps, Checkbox as RACCheckbox } from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { Description } from '../description'
import { Label } from '../label'

export type CheckboxProps = Omit<RACCheckboxProps, 'children'> &
    (
        | {
              description?: string
              label: string
              textPosition?: 'left' | 'right'
          }
        | {
              description?: string
              label?: never
              textPosition?: never
          }
    )

const checkboxContainerStyles = tv({
    base: [
        'flex gap-3',
        'items-center',
        '-mx-1 px-1',
        'rounded-sm transition',
        'group',
        '[[role=group]_&]:mb-1',
        '[[role=group]_&]:last-of-type:mb-2',
        'hover:cursor-pointer disabled:cursor-not-allowed',
        'invalid:error',
    ],
})

const boxStyles = tv({
    base: [
        'bg-base',
        'border-field border',
        'size-4',
        'transition-colors',
        'flex flex-shrink-0 items-center justify-center',
        'rounded-sm',
        // disabled
        'group-disabled:opacity-50',
        // hover
        'group-hover:bg-tint',
        'group-hover:border-field-hover',
        // checked, either way
        'group-selected:surface-primary',
        'group-indeterminate:surface-primary',
    ],
})

const iconStyles = tv({
    base: [
        'size-3',
        'transition-colors',
        'stroke-transparent',
        // hover
        'group-hover:stroke-[var(--theme-default-text-lo-contrast)]',
        'group-hover/row:stroke-[var(--theme-default-text-lo-contrast)]',
        'group-selected:stroke-[var(--theme-default-text-accent)]',
        'group-indeterminate:stroke-[var(--theme-default-text-accent)]',
    ],
})

/** Marks an individual item as selected. */
export function Checkbox({ description, label, textPosition = 'right', ...props }: CheckboxProps) {
    return (
        <RACCheckbox
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                checkboxContainerStyles({
                    ...renderProps,
                    className,
                })
            )}
        >
            {(renderProps) => (
                <>
                    {textPosition === 'left' && label != null ? (
                        <CheckboxLabel
                            description={description}
                            label={label}
                        />
                    ) : null}

                    <div className={boxStyles()}>
                        {renderProps.isIndeterminate ? (
                            <LucideMinus
                                aria-hidden
                                className={iconStyles()}
                            />
                        ) : (
                            <LucideCheck
                                aria-hidden
                                className={iconStyles()}
                            />
                        )}
                    </div>

                    {textPosition === 'right' && label != null ? (
                        <CheckboxLabel
                            description={description}
                            label={label}
                        />
                    ) : null}
                </>
            )}
        </RACCheckbox>
    )
}
Checkbox.displayName = 'Checkbox'

function CheckboxLabel({ description, label }: { description?: string; label: string }) {
    return (
        <div>
            <Label className='text-hi-contrast mb-0 flex items-center gap-1'>{label}</Label>
            {description != null ? (
                <Description className='!mt-0'>{description}</Description>
            ) : null}
        </div>
    )
}
CheckboxLabel.displayName = 'CheckboxLabel'
