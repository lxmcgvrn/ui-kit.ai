import type { ForwardedRef } from 'react'
import type { DateValue as RACDateValue, RangeCalendarProps as RACRangeCalendarProps } from 'react-aria-components'

import { composeRenderProps, RangeCalendar as RACRangeCalendar } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { CalendarGrid, CalendarHeader } from './calendar'

export interface RangeCalendarProps<T extends RACDateValue = RACDateValue> extends RACRangeCalendarProps<T> {
  ref?: ForwardedRef<HTMLDivElement>
}

/** A month grid of dates, of which the user picks a contiguous range. */
export function RangeCalendar<T extends RACDateValue = RACDateValue>({
  children = (
    <>
      <CalendarHeader />
      <CalendarGrid />
    </>
  ),
  ref,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <RACRangeCalendar<T>
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge('group text-hi-contrast w-fit', className))}
      ref={ref}
    >
      {children}
    </RACRangeCalendar>
  )
}
RangeCalendar.displayName = 'RangeCalendar'
