'use client'

import { ColorSlider } from '@ui-kit.ai/components'

export default function ColorSliderDisabled() {
  return (
    <ColorSlider
      channel='alpha'
      defaultValue='#5B5BD6'
      isDisabled
    />
  )
}
