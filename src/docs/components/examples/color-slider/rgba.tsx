'use client'

import { ColorSlider } from '@ui-kit.ai/components'

export default function ColorSliderRgba() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <ColorSlider
        channel='red'
        defaultValue='#5B5BD6'
      />
      <ColorSlider
        channel='green'
        defaultValue='#5B5BD6'
      />
      <ColorSlider
        channel='blue'
        defaultValue='#5B5BD6'
      />
      <ColorSlider
        channel='alpha'
        defaultValue='#5B5BD6'
      />
    </div>
  )
}
