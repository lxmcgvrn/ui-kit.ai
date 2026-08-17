'use client'

import { ColorArea, ColorChannelFields, ColorPicker, Label } from '@ui-kit.ai/components'

export default function ColorChannelFieldsHsb() {
  return (
    <ColorPicker
      className='w-56'
      defaultValue='#5B5BD6'
    >
      <Label>Color</Label>
      <ColorArea
        colorSpace='hsb'
        xChannel='saturation'
        yChannel='brightness'
      />
      <ColorChannelFields colorSpace='hsb' />
    </ColorPicker>
  )
}
