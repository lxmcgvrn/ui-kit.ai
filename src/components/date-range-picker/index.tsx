import type { ComponentProps, ForwardedRef, ReactNode } from 'react'
import type {
    DateRangePickerProps as RACDateRangePickerProps,
    DateRangePickerRenderProps as RACDateRangePickerRenderProps,
    DateValue as RACDateValue,
} from 'react-aria-components'

import { LucideCalendar } from 'lucide-react'
import { composeRenderProps, DateRangePicker as RACDateRangePicker } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { DateInput } from '../date-field'
import { FieldButton } from '../field-button'
import { FieldGroup } from '../field-group'
import { Popover, PopoverDialog } from '../popover'
import { RangeCalendar } from '../range-calendar'

export interface DateRangePickerProps<T extends RACDateValue = RACDateValue>
    extends RACDateRangePickerProps<T> {
    ref?: ForwardedRef<HTMLDivElement>
}

/** Two date fields plus a range calendar popover, for picking a span of dates. */
export function DateRangePicker<T extends RACDateValue = RACDateValue>({
    children = <DateRangePickerFieldGroup />,
    ref,
    ...props
}: DateRangePickerProps<T>) {
    return (
        <RACDateRangePicker<T>
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge('group invalid:error relative w-full !outline-0', className)
            )}
            ref={ref}
        >
            {composeRenderProps<
                ReactNode,
                RACDateRangePickerRenderProps & { defaultChildren: ReactNode },
                ReactNode
            >(children, (children) => (
                <>
                    {children}
                    <Popover className='w-fit'>
                        <PopoverDialog>
                            <RangeCalendar />
                        </PopoverDialog>
                    </Popover>
                </>
            ))}
        </RACDateRangePicker>
    )
}
DateRangePicker.displayName = 'DateRangePicker'

export interface DateRangePickerButtonProps
    extends Omit<ComponentProps<typeof FieldButton>, 'children'> {}

/** Opens the DateRangePicker popover. DateRangePicker wires up the press behaviour. */
export function DateRangePickerButton(props: DateRangePickerButtonProps) {
    return (
        <FieldButton {...props}>
            <LucideCalendar aria-hidden />
        </FieldButton>
    )
}
DateRangePickerButton.displayName = 'DateRangePickerButton'

export interface DateRangePickerFieldGroupProps extends ComponentProps<typeof FieldGroup> {}

/** Wraps the DateRangePicker's start and end inputs and its calendar button. */
export function DateRangePickerFieldGroup({
    children = (
        <>
            <DateRangePickerInput />
            <DateRangePickerButton />
        </>
    ),
    ...props
}: DateRangePickerFieldGroupProps) {
    return <FieldGroup {...props}>{children}</FieldGroup>
}
DateRangePickerFieldGroup.displayName = 'DateRangePickerFieldGroup'

export interface DateRangePickerInputProps extends Omit<ComponentProps<'div'>, 'children'> {}

/** The start and end date inputs, separated by a dash. */
export function DateRangePickerInput(props: DateRangePickerInputProps) {
    return (
        <div
            {...props}
            className={twMerge('flex flex-1 items-center gap-1 px-3', props.className)}
        >
            <DateInput
                className='w-auto px-0'
                isBorderless
                slot='start'
            />
            <span
                aria-hidden
                className='text-placeholder text-sm'
            >
                –
            </span>
            <DateInput
                className='w-auto px-0'
                isBorderless
                slot='end'
            />
        </div>
    )
}
DateRangePickerInput.displayName = 'DateRangePickerInput'
