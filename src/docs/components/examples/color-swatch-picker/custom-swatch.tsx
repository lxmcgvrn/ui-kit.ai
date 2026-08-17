'use client'

import { ColorSwatch, ColorSwatchPicker, ColorSwatchPickerItem } from '@ui-kit.ai/components'

import { PALETTE } from './palette'

export default function ColorSwatchPickerCustomSwatch() {
  return (
    <ColorSwatchPicker
      aria-label='Accent color'
      defaultValue={PALETTE[0]}
    >
      {PALETTE.map((color) => (
        <ColorSwatchPickerItem
          color={color}
          key={color}
        >
          <ColorSwatch className='size-10 rounded-full' />
        </ColorSwatchPickerItem>
      ))}
    </ColorSwatchPicker>
  )
}
