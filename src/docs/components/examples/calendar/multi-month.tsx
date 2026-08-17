'use client'

import { Calendar, CalendarGrid, CalendarHeader } from '@ui-kit.ai/components'

export default function CalendarMultiMonth() {
  return (
    <Calendar
      aria-label='Appointment date'
      visibleDuration={{ months: 2 }}
    >
      <CalendarHeader />
      <div className='flex gap-4'>
        <CalendarGrid />
        <CalendarGrid offset={{ months: 1 }} />
      </div>
    </Calendar>
  )
}
