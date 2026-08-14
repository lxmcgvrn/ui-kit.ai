import type { GroupProps as RACGroupProps } from 'react-aria-components'

import { type ForwardedRef } from 'react'
import { composeRenderProps, Group as RACGroup } from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { fieldVariants } from '../styles/field-variants'

const fieldGroupStyles = tv({
    base: ['group relative', 'flex items-center', 'overflow-hidden'],
    extend: fieldVariants,
})

export interface FieldGroupProps extends RACGroupProps {
    /** When `true` the group is rendered without its border and background. */
    isBorderless?: boolean
    ref?: ForwardedRef<HTMLDivElement>
}

/** A set of related controls, styled as a single field. */
export function FieldGroup({ isBorderless, ref, ...props }: FieldGroupProps) {
    return (
        <RACGroup
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                fieldGroupStyles({
                    ...renderProps,
                    className,
                    isBorderless,
                })
            )}
            data-variant-borderless={isBorderless}
            ref={ref}
        />
    )
}
FieldGroup.displayName = 'FieldGroup'
