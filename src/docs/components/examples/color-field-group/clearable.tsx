'use client'

import { ColorFieldGroup, ColorFieldGroupClearButton, ColorSwatch, Description, FieldGroup, Input, Label } from '@ui-kit.ai/components'
import { useState } from 'react'

/** What the field falls back to, since a color field is never truly empty. */
const FALLBACK = '#5000ff'

export default function ColorFieldGroupClearable() {
  const [color, setColor] = useState(FALLBACK)

  return (
    <div className='w-64'>
      <ColorFieldGroup
        onChange={(picked) => {
          setColor(picked.toString('hex'))
        }}
        value={color}
      >
        <Label>Accent</Label>
        <FieldGroup>
          <Input
            icon={<ColorSwatch className='size-4 rounded-full' />}
            isBorderless
          />
          <ColorFieldGroupClearButton
            isDisabled={color === FALLBACK}
            onPress={() => {
              setColor(FALLBACK)
            }}
          />
        </FieldGroup>
        <Description>Clearing puts the color back to {FALLBACK}.</Description>
      </ColorFieldGroup>
    </div>
  )
}
