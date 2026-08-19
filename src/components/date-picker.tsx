import type { ComponentProps, ForwardedRef, ReactNode } from 'react'
import type {
  ButtonProps as RACButtonProps,
  DatePickerProps as RACDatePickerProps,
  DatePickerRenderProps as RACDatePickerRenderProps,
  DateValue as RACDateValue,
} from 'react-aria-components'

import { LucideCalendar } from 'lucide-react'
import { useContext, useMemo } from 'react'
import {
  composeRenderProps,
  ButtonContext as RACButtonContext,
  DatePicker as RACDatePicker,
  DatePickerStateContext as RACDatePickerStateContext,
  DEFAULT_SLOT as RACDEFAULT_SLOT,
} from 'react-aria-components'
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
  children = (
    <FieldGroup>
      <DateInput isBorderless />
      <DatePickerButton />
    </FieldGroup>
  ),
  ref,
  ...props
}: DatePickerProps<T>) {
  return (
    <RACDatePicker<T>
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge('group invalid:error relative w-full', className))}
      ref={ref}
    >
      {composeRenderProps<ReactNode, RACDatePickerRenderProps & { defaultChildren: ReactNode }, ReactNode>(children, (children) => (
        <>
          <DatePickerButtons>{children}</DatePickerButtons>
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

/** Hands the composed buttons their slot props; the trigger keeps RAC's wiring. */
function DatePickerButtons({ children }: { children: ReactNode }) {
  return <RACButtonContext.Provider value={useDatePickerButtons()}>{children}</RACButtonContext.Provider>
}
DatePickerButtons.displayName = 'DatePickerButtons'

/** Slot props for the `FieldButtonClear` a caller composes in. */
function useDatePickerButtons() {
  const state = useContext(RACDatePickerStateContext)
  const trigger = useContext(RACButtonContext)
  const isEmpty = state?.value == null

  return useMemo(() => {
    /* RAC hands the trigger its props through ButtonContext plain, never as slots. */
    const triggerProps: RACButtonProps = trigger != null && !('slots' in trigger) ? (trigger as RACButtonProps) : {}

    return {
      slots: {
        clear: {
          'data-empty': isEmpty || undefined,
          isDisabled: isEmpty || triggerProps.isDisabled === true,
          onPress: () => state?.setValue(null),
        },
        [RACDEFAULT_SLOT]: triggerProps,
      },
    }
  }, [isEmpty, state, trigger])
}
