'use client'

import { ColorWheel } from '@ui-kit.ai/components'

export default function ColorWheelDisabled() {
  return (
    <ColorWheel
      defaultValue='hsl(240, 60%, 60%)'
      isDisabled
    />
  )
}
