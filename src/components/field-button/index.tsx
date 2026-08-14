import type { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

import { Button } from '../button'

export interface FieldButtonProps
    extends Omit<ComponentProps<typeof Button>, 'excludeFromTabOrder' | 'isIcon' | 'variant'> {}

/** An icon button for use inside a `FieldGroup`. */
export function FieldButton({ ...props }: FieldButtonProps) {
    return (
        <Button
            isIcon
            variant='tertiary'
            {...props}
            className={(rp) =>
                twMerge(
                    '!size-6',
                    'align-middle',
                    'text-placeholder',
                    'group-invalid:error',
                    'last-of-type:mr-1 [&:not(:last-of-type)]:mr-px',
                    '[&_svg]:size-3 [&_svg]:shrink-0',
                    typeof props.className === 'function' ? props.className(rp) : props.className
                )
            }
            excludeFromTabOrder
        />
    )
}
FieldButton.displayName = 'FieldButton'
