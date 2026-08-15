'use client'

import { RangeCalendar } from '@ui-kit.ai/components'

export default function RangeCalendarDisabled() {
    return (
        <RangeCalendar
            aria-label='Trip dates'
            isDisabled
        />
    )
}
