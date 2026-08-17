'use client'

import { Label, Slider, SliderOutput, SliderThumb, SliderTrack } from '@ui-kit.ai/components'

export default function SliderDefault() {
  return (
    <Slider defaultValue={40}>
      <div className='flex items-center justify-between'>
        <Label>This is a label for a field</Label>
        <SliderOutput />
      </div>
      <SliderTrack>
        <SliderThumb />
      </SliderTrack>
    </Slider>
  )
}
