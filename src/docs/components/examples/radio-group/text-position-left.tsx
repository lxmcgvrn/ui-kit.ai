'use client'

import { Label, Radio, RadioGroup } from '@ui-kit.ai/components'

export default function RadioGroupTextPositionLeft() {
  return (
    <RadioGroup defaultValue='item-a'>
      <Label>This is a label for a field</Label>
      <Radio
        label='Item A'
        textPosition='left'
        value='item-a'
      />
      <Radio
        label='Item B'
        textPosition='left'
        value='item-b'
      />
    </RadioGroup>
  )
}
