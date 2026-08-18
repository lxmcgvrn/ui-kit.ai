'use client'

import { ComboBox, ComboBoxButton, ComboBoxFieldGroup, ComboBoxInput, Description, FieldButtonClear, Label } from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'
import { LucideSearch } from 'lucide-react'

export default function ComboBoxSections() {
  return (
    <ComboBox
      items={getMockOptions<'listbox'>({
        withIcon: true,
        withSections: true,
      })}
    >
      <Label>This is a label for a field</Label>
      <ComboBoxFieldGroup>
        <ComboBoxInput
          icon={<LucideSearch />}
          isBorderless
          placeholder='Type to search...'
        />
        <FieldButtonClear />
        <ComboBoxButton />
      </ComboBoxFieldGroup>
      <Description>This is a description for a field</Description>
    </ComboBox>
  )
}
