'use client'

import { FieldButtonClear, Label, Select, SelectButton } from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'

export default function SelectClearable() {
  return (
    <Select items={getMockOptions<'listbox'>({ withIcon: true })}>
      <Label>This is a label for a field</Label>
      {/* The trigger is a button, so the clear button overlays it instead of nesting. */}
      <SelectButton className='pr-13' />
      <FieldButtonClear className='absolute right-7 bottom-1.5' />
    </Select>
  )
}
