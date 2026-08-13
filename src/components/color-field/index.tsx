import type { ForwardedRef } from 'react'
import type { ColorFieldProps as RACColorFieldProps } from 'react-aria-components'

import { ColorField as RACColorField } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Input } from '../input'

/**
 * Props accepted by {@link ColorField}. Everything `react-aria-components`'
 * `ColorField` accepts, plus a forwarded ref.
 */
export interface ColorFieldProps extends RACColorFieldProps {
    /**
     * A ref forwarded to the underlying `<input />` element.
     */
    ref?: ForwardedRef<HTMLInputElement>
}

/**
 * A color field allows users to edit a hex color or individual color channel value.
 */
export function ColorField({ children = <Input />, ref, ...props }: ColorFieldProps) {
    return (
        <RACColorField
            {...props}
            className={(rp) =>
                twMerge(
                    'group relative w-full grow',
                    typeof props.className === 'function' ? props.className(rp) : props.className
                )
            }
            ref={ref}
        >
            {(renderProps) => (typeof children === 'function' ? children(renderProps) : children)}
        </RACColorField>
    )
}
ColorField.displayName = 'ColorField'
