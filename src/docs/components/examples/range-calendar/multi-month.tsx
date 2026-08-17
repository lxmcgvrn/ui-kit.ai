'use client'

import { CalendarGrid, CalendarHeader, RangeCalendar } from '@ui-kit.ai/components'

export default function RangeCalendarMultiMonth() {
    return (
        <RangeCalendar
            aria-label='Trip dates'
            visibleDuration={{ months: 2 }}
        >
            <CalendarHeader />
            <div className='flex gap-4'>
                <CalendarGrid />
                <CalendarGrid offset={{ months: 1 }} />
            </div>
        </RangeCalendar>
    )
}
