'use client'

import { Description, Label, Select, SelectButton } from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'

export default function FormSelectIsBorderless() {
  return (
    <Select
      items={getMockOptions({ withIcon: true, withSections: true })}
      name='select'
    >
      <Label>This is a label for a field</Label>
      <SelectButton isBorderless />
      <Description>This is a description for a field</Description>
    </Select>
  )
}
