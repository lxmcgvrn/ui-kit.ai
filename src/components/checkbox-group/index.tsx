import type { CheckboxGroupProps as RACCheckboxGroupProps } from 'react-aria-components'

import { type ForwardedRef } from 'react'
import { CheckboxGroup as RACCheckboxGroup } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

/**
 * Props accepted by {@link CheckboxGroup}. Everything `react-aria-components`'
 * `CheckboxGroup` accepts, plus a ref to the group element.
 */
export interface CheckboxGroupProps extends RACCheckboxGroupProps {
    ref?: ForwardedRef<HTMLDivElement>
}

/**
 * A checkbox group allows a user to select multiple items from a list of options.
 */
export const CheckboxGroup = ({ ref, ...props }: CheckboxGroupProps) => {
    return (
        <RACCheckboxGroup
            {...props}
            className={(renderProps) =>
                twMerge(
                    'group',
                    props.isInvalid === true ? 'error' : '',
                    typeof props.className === 'function'
                        ? props.className(renderProps)
                        : props.className
                )
            }
            ref={ref}
        >
            {props.children}
        </RACCheckboxGroup>
    )
}
CheckboxGroup.displayName = 'CheckboxGroup'
