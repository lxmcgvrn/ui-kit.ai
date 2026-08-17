'use client'

import { ColorSwatch } from '@ui-kit.ai/components'

import { PALETTE } from './palette'

export default function ColorSwatchDefault() {
  return (
    <div className='flex items-center gap-2'>
      {PALETTE.map((color) => (
        <ColorSwatch
          color={color}
          key={color}
        />
      ))}
    </div>
  )
}
