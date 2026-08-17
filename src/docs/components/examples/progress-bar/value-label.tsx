'use client'

import { ProgressBar } from '@ui-kit.ai/components'

export default function ProgressBarValueLabel() {
  return (
    <ProgressBar
      label='Files copied'
      maxValue={12}
      value={7}
      valueLabel='7 of 12'
    />
  )
}
