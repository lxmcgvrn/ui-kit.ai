import type { FieldErrorProps as RACFieldErrorProps } from 'react-aria-components'

import { type ForwardedRef } from 'react'
import { composeRenderProps, FieldError as RACFieldError } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export interface FieldErrorProps extends RACFieldErrorProps {
    ref?: ForwardedRef<HTMLDivElement>
}

/** A field error displays validation errors for a field within a form. */
export function FieldError({ ref, ...props }: FieldErrorProps) {
    return (
        <RACFieldError
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge('error text-lo-contrast block text-sm font-medium', 'mt-1', className)
            )}
            ref={ref}
        />
    )
}
FieldError.displayName = 'FieldError'
