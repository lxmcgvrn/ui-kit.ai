'use client'

import { Description, Label, Radio, RadioGroup } from '@ui-kit.ai/components'

export default function RadioGroupIsInvalid() {
  return (
    <RadioGroup isInvalid>
      <Label>This is a label for a field</Label>
      <Radio
        description='Optional description'
        label='Item A'
        value='item-a'
      />
      <Radio
        description='Optional description'
        label='Item B'
        value='item-b'
      />
      <Description>This is a description for a field</Description>
    </RadioGroup>
  )
}
