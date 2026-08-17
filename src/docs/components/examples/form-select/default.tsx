'use client'

import { Description, Form, FormSelect, Label, SelectButton } from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'

export default function FormSelectDefault() {
  return (
    <Form onSubmit={() => undefined}>
      <FormSelect
        items={getMockOptions({ withIcon: true })}
        name='select'
      >
        <Label>This is a label for a field</Label>
        <SelectButton />
        <Description>This is a description for a field</Description>
      </FormSelect>
    </Form>
  )
}
