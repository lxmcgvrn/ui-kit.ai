import type { ComponentProps, ForwardedRef, ReactNode } from 'react'
import type {
  DatePickerProps as RACDatePickerProps,
  DatePickerRenderProps as RACDatePickerRenderProps,
  DateValue as RACDateValue,
} from 'react-aria-components'

import { LucideCalendar } from 'lucide-react'
import { composeRenderProps, DatePicker as RACDatePicker } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Calendar } from './calendar'
import { DateInput } from './date-field'
import { FieldButton } from './field-button'
import { FieldGroup } from './field-group'
import { Popover, PopoverDialog } from './popover'

export interface DatePickerProps<T extends RACDateValue = RACDateValue> extends RACDatePickerProps<T> {
  ref?: ForwardedRef<HTMLDivElement>
}

/** A date field plus a calendar popover, for typing or picking a date. */
export function DatePicker<T extends RACDateValue = RACDateValue>({
  children = <DatePickerFieldGroup />,
  ref,
  ...props
}: DatePickerProps<T>) {
  return (
    <RACDatePicker<T>
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge('group invalid:error relative w-full !outline-0', className))}
      ref={ref}
    >
      {composeRenderProps<ReactNode, RACDatePickerRenderProps & { defaultChildren: ReactNode }, ReactNode>(children, (children) => (
        <>
          {children}
          <Popover className='w-fit'>
            <PopoverDialog>
              <Calendar />
            </PopoverDialog>
          </Popover>
        </>
      ))}
    </RACDatePicker>
  )
}
DatePicker.displayName = 'DatePicker'

export interface DatePickerButtonProps extends Omit<ComponentProps<typeof FieldButton>, 'children'> {}

/** Opens the DatePicker popover. DatePicker wires up the press behaviour. */
export function DatePickerButton(props: DatePickerButtonProps) {
  return (
    <FieldButton {...props}>
      <LucideCalendar aria-hidden />
    </FieldButton>
  )
}
DatePickerButton.displayName = 'DatePickerButton'

export interface DatePickerFieldGroupProps extends ComponentProps<typeof FieldGroup> {}

/** Wraps the DatePicker's date input and its calendar button. */
export function DatePickerFieldGroup({
  children = (
    <>
      <DateInput isBorderless />
      <DatePickerButton />
    </>
  ),
  ...props
}: DatePickerFieldGroupProps) {
  return <FieldGroup {...props}>{children}</FieldGroup>
}
DatePickerFieldGroup.displayName = 'DatePickerFieldGroup'
