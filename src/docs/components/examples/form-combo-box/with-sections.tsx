'use client'

import {
  ComboBoxButton,
  ComboBoxFieldGroup,
  ComboBoxInput,
  Description,
  FieldButtonClear,
  Form,
  FormComboBox,
  Label,
} from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'
import { LucideSearch } from 'lucide-react'

export default function FormComboBoxWithSections() {
  return (
    <Form onSubmit={() => undefined}>
      <FormComboBox
        items={getMockOptions({ withIcon: true, withSections: true })}
        name='combobox'
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
      </FormComboBox>
    </Form>
  )
}
