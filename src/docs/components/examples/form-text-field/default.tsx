'use client'

import { FieldButtonClear, FieldGroup, Form, FormTextField, Input, Label } from '@ui-kit.ai/components'
import { LucideAtSign } from 'lucide-react'

export default function FormTextFieldDefault() {
  return (
    <Form onSubmit={() => undefined}>
      <FormTextField name='email'>
        <Label>This is a label for a field</Label>
        <FieldGroup>
          <Input
            icon={<LucideAtSign />}
            isBorderless
            placeholder='Enter your email address'
          />
          <FieldButtonClear />
        </FieldGroup>
      </FormTextField>
    </Form>
  )
}
