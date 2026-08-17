'use client'

import type { ComponentProps } from 'react'

import { ColorArea, ColorSlider } from '@ui-kit.ai/components'
import { useState } from 'react'

type OnColorChange = NonNullable<ComponentProps<typeof ColorArea>['onChange']>

export default function ColorAreaWithSliders() {
  const [value, setValue] = useState('#5B5BD6')

  const onChange: OnColorChange = (color) => {
    setValue(color.toString('hsl'))
  }

  return (
    <div className='flex w-48 flex-col gap-4'>
      <ColorArea
        className='w-full'
        colorSpace='hsb'
        onChange={onChange}
        value={value}
        xChannel='saturation'
        yChannel='brightness'
      />
      <ColorSlider
        aria-label='Hue'
        channel='hue'
        colorSpace='hsb'
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
