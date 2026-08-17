'use client'

import { Meter } from '@ui-kit.ai/components'

export default function MeterFormatted() {
  return (
    <Meter
      formatOptions={{ currency: 'GBP', style: 'currency' }}
      label='Spend this month'
      maxValue={500}
      value={320}
    />
  )
}
