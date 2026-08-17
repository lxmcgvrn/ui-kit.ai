'use client'

import { Calendar } from '@ui-kit.ai/components'

export default function CalendarReadOnly() {
  return (
    <Calendar
      aria-label='Appointment date'
      isReadOnly
    />
  )
}
