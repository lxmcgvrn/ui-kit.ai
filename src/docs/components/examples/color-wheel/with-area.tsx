'use client'

import type { ComponentProps } from 'react'

import { ColorArea, ColorWheel } from '@ui-kit.ai/components'
import { useState } from 'react'

type OnColorChange = NonNullable<ComponentProps<typeof ColorWheel>['onChange']>

export default function ColorWheelWithArea() {
  const [value, setValue] = useState('hsl(240, 60%, 60%)')

  const onChange: OnColorChange = (color) => {
    setValue(color.toString('hsl'))
  }

  return (
    <ColorWheel
      onChange={onChange}
      value={value}
    >
      <ColorArea
        className='size-full'
        colorSpace='hsb'
        onChange={onChange}
        value={value}
        xChannel='saturation'
        yChannel='brightness'
      />
    </ColorWheel>
  )
}
