'use client'

import { Slider, SliderOutput, SliderThumb, SliderTrack } from '@ui-kit.ai/components'

export default function SliderVertical() {
  return (
    <Slider
      aria-label='Volume'
      className='h-48'
      defaultValue={60}
      orientation='vertical'
    >
      <SliderTrack>
        <SliderThumb />
      </SliderTrack>
      <SliderOutput />
    </Slider>
  )
}
