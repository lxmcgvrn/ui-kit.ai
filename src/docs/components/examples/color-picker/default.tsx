'use client'

import { ColorArea, ColorPicker, ColorSlider, ColorSwatchPicker, ColorSwatchPickerItem, Label } from '@ui-kit.ai/components'

export default function ColorPickerDefault() {
  return (
    <ColorPicker defaultValue='#A00'>
      <Label>Color</Label>
      <ColorArea
        colorSpace='hsb'
        xChannel='saturation'
        yChannel='brightness'
      />
      <ColorSlider
        channel='hue'
        colorSpace='hsb'
      />
      <ColorSwatchPicker>
        <ColorSwatchPickerItem color='#A00' />
        <ColorSwatchPickerItem color='#f80' />
        <ColorSwatchPickerItem color='#008' />
      </ColorSwatchPicker>
    </ColorPicker>
  )
}
