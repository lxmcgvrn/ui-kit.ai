import type { ForwardedRef } from 'react'
import type {
    DateFieldProps as RACDateFieldProps,
    DateInputProps as RACDateInputProps,
    DateSegmentProps as RACDateSegmentProps,
    DateValue as RACDateValue,
} from 'react-aria-components'

import {
    composeRenderProps,
    DateField as RACDateField,
    DateInput as RACDateInput,
    DateSegment as RACDateSegment,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { fieldVariants } from '../styles/field-variants'

const dateInputStyles = tv({
    base: ['flex items-center', 'px-3', 'text-sm', 'w-full whitespace-nowrap'],
    extend: fieldVariants,
})

const dateSegmentStyles = tv({
    base: [
        'rounded-xs px-0.5',
        'tabular-nums caret-transparent',
        'forced-color-adjust-none',
        // The enclosing DateInput draws the focus ring for the whole field.
        '!outline-0',
        'type-literal:text-placeholder type-literal:px-0',
        'placeholder-shown:text-placeholder',
        'focus:bg-primary focus:text-accent',
        'disabled:text-placeholder',
    ],
})

/** Renders one editable segment; the default child of {@link DateInput}. */
const renderDateSegment: RACDateInputProps['children'] = (segment) => (
    <DateSegment segment={segment} />
)

export interface DateFieldProps<T extends RACDateValue = RACDateValue>
    extends RACDateFieldProps<T> {
    ref?: ForwardedRef<HTMLDivElement>
}

/** A date input the user edits segment by segment with the keyboard. */
export function DateField<T extends RACDateValue = RACDateValue>({
    children = <DateInput />,
    ref,
    ...props
}: DateFieldProps<T>) {
    return (
        <RACDateField<T>
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge('group invalid:error relative w-full', className)
            )}
            ref={ref}
        >
            {children}
        </RACDateField>
    )
}
DateField.displayName = 'DateField'

export interface DateInputProps extends Omit<RACDateInputProps, 'children'> {
    /** Renders each segment. Defaults to a `DateSegment`. */
    children?: RACDateInputProps['children']

    /** When `true`, DateInput renders without its border and background. */
    isBorderless?: boolean
    ref?: ForwardedRef<HTMLDivElement>
}

/** Groups the editable segments of a date or time field into one field. */
export function DateInput({
    children = renderDateSegment,
    isBorderless,
    ref,
    ...props
}: DateInputProps) {
    return (
        <RACDateInput
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                dateInputStyles({
                    ...renderProps,
                    className,
                    isBorderless,
                })
            )}
            data-variant-borderless={isBorderless}
            ref={ref}
        >
            {children}
        </RACDateInput>
    )
}
DateInput.displayName = 'DateInput'

export interface DateSegmentProps extends RACDateSegmentProps {
    ref?: ForwardedRef<HTMLDivElement>
}

/** A single unit of a date or time, editable by typing or arrow keys. */
export function DateSegment({ ref, ...props }: DateSegmentProps) {
    return (
        <RACDateSegment
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                dateSegmentStyles({
                    ...renderProps,
                    className,
                })
            )}
            ref={ref}
        />
    )
}
DateSegment.displayName = 'DateSegment'
