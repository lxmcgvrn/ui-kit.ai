'use client'

import { Meter } from '@ui-kit.ai/components'

const ERROR_AT = 90
const WARNING_AT = 70

export default function MeterThresholds() {
  return (
    <div className='flex w-full flex-col gap-4'>
      {[45, 78, 96].map((value) => (
        <Meter
          intent={intentFor(value)}
          key={value}
          label='Storage used'
          value={value}
        />
      ))}
    </div>
  )
}

/** Past 70% the meter warns; past 90% it turns to an error. */
function intentFor(percentage: number) {
  if (percentage >= ERROR_AT) return 'error' as const
  if (percentage >= WARNING_AT) return 'warning' as const

  return undefined
}
