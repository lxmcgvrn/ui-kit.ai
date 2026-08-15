import type { ForwardedRef } from 'react'
import type {
    TimeFieldProps as RACTimeFieldProps,
    TimeValue as RACTimeValue,
} from 'react-aria-components'

import { composeRenderProps, TimeField as RACTimeField } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { DateInput } from '../date-field'

export interface TimeFieldProps<T extends RACTimeValue = RACTimeValue>
    extends RACTimeFieldProps<T> {
    ref?: ForwardedRef<HTMLDivElement>
}

/** A time input the user edits segment by segment with the keyboard. */
export function TimeField<T extends RACTimeValue = RACTimeValue>({
    children = <DateInput />,
    ref,
    ...props
}: TimeFieldProps<T>) {
    return (
        <RACTimeField<T>
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge('group invalid:error relative w-full', className)
            )}
            ref={ref}
        >
            {children}
        </RACTimeField>
    )
}
TimeField.displayName = 'TimeField'
