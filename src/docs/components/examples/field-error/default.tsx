'use client'

import { Form, FormTextField, Input, Label } from '@ui-kit.ai/components'

export default function FieldErrorDefault() {
  return (
    <Form
      onSubmit={() => undefined}
      options={{
        errors: {
          name: {
            message: 'Full name is required',
            type: 'invalid_type',
          },
        },
      }}
    >
      <FormTextField name='name'>
        <Label className='opacity-50'>Full Name</Label>
        <Input
          className='opacity-50'
          placeholder='e.g. John Doe'
        />
      </FormTextField>
    </Form>
  )
}
