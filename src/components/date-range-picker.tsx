import type { ComponentProps, ForwardedRef, ReactNode } from 'react'
import type {
  ButtonProps as RACButtonProps,
  DateRangePickerProps as RACDateRangePickerProps,
  DateRangePickerRenderProps as RACDateRangePickerRenderProps,
  DateValue as RACDateValue,
} from 'react-aria-components'

import { LucideCalendar } from 'lucide-react'
import { useContext, useMemo } from 'react'
import {
  composeRenderProps,
  ButtonContext as RACButtonContext,
  DateRangePicker as RACDateRangePicker,
  DateRangePickerStateContext as RACDateRangePickerStateContext,
  DEFAULT_SLOT as RACDEFAULT_SLOT,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { DateInput } from './date-field'
import { FieldButton } from './field-button'
import { FieldGroup } from './field-group'
import { Popover, PopoverDialog } from './popover'
import { RangeCalendar } from './range-calendar'

export interface DateRangePickerProps<T extends RACDateValue = RACDateValue> extends RACDateRangePickerProps<T> {
  ref?: ForwardedRef<HTMLDivElement>
}

/** Two date fields plus a range calendar popover, for picking a span of dates. */
export function DateRangePicker<T extends RACDateValue = RACDateValue>({
  children = (
    <FieldGroup>
      <DateRangePickerInput />
      <DateRangePickerButton />
    </FieldGroup>
  ),
  ref,
  ...props
}: DateRangePickerProps<T>) {
  return (
    <RACDateRangePicker<T>
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge('group invalid:error relative w-full', className))}
      ref={ref}
    >
      {composeRenderProps<ReactNode, RACDateRangePickerRenderProps & { defaultChildren: ReactNode }, ReactNode>(children, (children) => (
        <>
          <DateRangePickerButtons>{children}</DateRangePickerButtons>
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

export interface DateRangePickerButtonProps extends Omit<ComponentProps<typeof FieldButton>, 'children'> {}

/** Opens the DateRangePicker popover. DateRangePicker wires up the press behaviour. */
export function DateRangePickerButton(props: DateRangePickerButtonProps) {
  return (
    <FieldButton {...props}>
      <LucideCalendar aria-hidden />
    </FieldButton>
  )
}
DateRangePickerButton.displayName = 'DateRangePickerButton'

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

/** Hands the composed buttons their slot props; the trigger keeps RAC's wiring. */
function DateRangePickerButtons({ children }: { children: ReactNode }) {
  return <RACButtonContext.Provider value={useDateRangePickerButtons()}>{children}</RACButtonContext.Provider>
}
DateRangePickerButtons.displayName = 'DateRangePickerButtons'

/** Slot props for the `FieldButtonClear` a caller composes in. */
function useDateRangePickerButtons() {
  const state = useContext(RACDateRangePickerStateContext)
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
