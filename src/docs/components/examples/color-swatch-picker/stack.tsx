'use client'

import { ColorSwatchPicker, ColorSwatchPickerItem } from '@ui-kit.ai/components'

import { PALETTE } from './palette'

export default function ColorSwatchPickerStack() {
  return (
    <ColorSwatchPicker
      aria-label='Accent color'
      defaultValue={PALETTE[0]}
      layout='stack'
    >
      {PALETTE.map((color) => (
        <ColorSwatchPickerItem
          color={color}
          key={color}
        />
      ))}
    </ColorSwatchPicker>
  )
}
