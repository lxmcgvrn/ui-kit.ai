'use client'

import { ColorSwatch } from '@ui-kit.ai/components'

import { PALETTE } from './palette'

export default function ColorSwatchCustomSize() {
  return (
    <div className='flex items-center gap-2'>
      {PALETTE.map((color) => (
        <ColorSwatch
          className='size-16'
          color={color}
          key={color}
        />
      ))}
    </div>
  )
}
