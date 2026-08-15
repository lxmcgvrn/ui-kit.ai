import type { ComponentProps, ForwardedRef } from 'react'
import type {
    CalendarCellProps as RACCalendarCellProps,
    CalendarCellRenderProps as RACCalendarCellRenderProps,
    CalendarGridProps as RACCalendarGridProps,
    CalendarProps as RACCalendarProps,
    DateValue as RACDateValue,
} from 'react-aria-components'

import { LucideChevronLeft, LucideChevronRight } from 'lucide-react'
import { useContext } from 'react'
import {
    composeRenderProps,
    Calendar as RACCalendar,
    CalendarCell as RACCalendarCell,
    CalendarGrid as RACCalendarGrid,
    CalendarGridBody as RACCalendarGridBody,
    CalendarGridHeader as RACCalendarGridHeader,
    CalendarHeaderCell as RACCalendarHeaderCell,
    Heading as RACHeading,
    RangeCalendarStateContext as RACRangeCalendarStateContext,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Button } from '../button'

const calendarCellStyles = tv({
    base: [
        'flex size-8 items-center justify-center',
        'text-sm',
        'cursor-pointer select-none',
        'forced-color-adjust-none',
        'transition-colors',
        'hover:bg-tint',
        'pressed:bg-tint',
        'outside-month:text-placeholder',
        'unavailable:text-placeholder unavailable:cursor-default unavailable:line-through',
        'disabled:text-placeholder disabled:cursor-not-allowed',
        'invalid:error',
    ],
    defaultVariants: {
        isRange: false,
        isToday: false,
    },
    variants: {
        isRange: {
            false: ['rounded-sm', 'selected:bg-primary selected:text-accent'],
            true: [
                'rounded-none',
                'selected:bg-tint',
                'selection-start:bg-primary selection-start:text-accent selection-start:rounded-s-sm',
                'selection-end:bg-primary selection-end:text-accent selection-end:rounded-e-sm',
            ],
        },
        isToday: {
            true: 'bg-tint font-medium',
        },
    },
})

export interface CalendarProps<T extends RACDateValue = RACDateValue> extends RACCalendarProps<T> {
    ref?: ForwardedRef<HTMLDivElement>
}

/** A month grid of dates, of which the user picks one. */
export function Calendar<T extends RACDateValue = RACDateValue>({
    children = (
        <>
            <CalendarHeader />
            <CalendarGrid />
        </>
    ),
    ref,
    ...props
}: CalendarProps<T>) {
    return (
        <RACCalendar<T>
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge('group text-hi-contrast w-fit', className)
            )}
            ref={ref}
        >
            {children}
        </RACCalendar>
    )
}
Calendar.displayName = 'Calendar'

export interface CalendarCellProps extends RACCalendarCellProps {
    ref?: ForwardedRef<HTMLTableCellElement>
}

/** One day within a {@link CalendarGrid}. Shared by Calendar and RangeCalendar. */
export function CalendarCell({ ref, ...props }: CalendarCellProps) {
    const isRange = useContext(RACRangeCalendarStateContext) != null

    return (
        <RACCalendarCell
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                calendarCellStyles({
                    ...renderProps,
                    className,
                    isRange,
                    isToday: isToday(renderProps.date),
                })
            )}
            ref={ref}
        />
    )
}
CalendarCell.displayName = 'CalendarCell'

export interface CalendarGridProps extends Omit<RACCalendarGridProps, 'children'> {
    ref?: ForwardedRef<HTMLTableElement>
}

/** A grid of weekday names and day cells for one month. */
export function CalendarGrid({ ref, ...props }: CalendarGridProps) {
    return (
        <RACCalendarGrid
            {...props}
            className={twMerge('border-separate border-spacing-0', props.className)}
            ref={ref}
        >
            <RACCalendarGridHeader>
                {(day) => (
                    <RACCalendarHeaderCell className='text-lo-contrast size-8 text-xs font-medium'>
                        {day}
                    </RACCalendarHeaderCell>
                )}
            </RACCalendarGridHeader>
            <RACCalendarGridBody>{(date) => <CalendarCell date={date} />}</RACCalendarGridBody>
        </RACCalendarGrid>
    )
}
CalendarGrid.displayName = 'CalendarGrid'

export interface CalendarHeaderProps extends Omit<ComponentProps<'header'>, 'children'> {}

/** The month title, flanked by the previous and next month buttons. */
export function CalendarHeader(props: CalendarHeaderProps) {
    return (
        <header
            {...props}
            className={twMerge('mb-2 flex items-center justify-between gap-1', props.className)}
        >
            <Button
                isIcon
                slot='previous'
                variant='tertiary'
            >
                <LucideChevronLeft aria-hidden />
            </Button>

            <RACHeading className='text-hi-contrast flex-1 text-center text-sm font-medium' />

            <Button
                isIcon
                slot='next'
                variant='tertiary'
            >
                <LucideChevronRight aria-hidden />
            </Button>
        </header>
    )
}
CalendarHeader.displayName = 'CalendarHeader'

/** RAC exposes no `isToday` render prop, so check the cell date against now. */
function isToday(date: RACCalendarCellRenderProps['date']) {
    const now = new Date()
    const cellDate = date.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone)

    return (
        cellDate.getDate() === now.getDate() &&
        cellDate.getMonth() === now.getMonth() &&
        cellDate.getFullYear() === now.getFullYear()
    )
}
