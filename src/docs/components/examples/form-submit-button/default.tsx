'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldGroup, Form, FormSubmitButton, FormTextField, Input, Label, TextFieldClearButton } from '@ui-kit.ai/components'
import { LucideAtSign } from 'lucide-react'
import { z } from 'zod'

const schema = z.object({
  email_address: z.string().min(1, 'Email address is required'),
})

type FieldValues = z.input<typeof schema>

export default function FormSubmitButtonDefault() {
  return (
    <Form<FieldValues>
      className='flex flex-col'
      onSubmit={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }}
      options={{ resolver: zodResolver(schema) }}
    >
      <FormTextField
        className='mb-4'
        name='email_address'
      >
        <Label>This is a label for a field</Label>
        <FieldGroup>
          <Input
            icon={<LucideAtSign />}
            isBorderless
            placeholder='Enter your email address'
          />
          <TextFieldClearButton />
        </FieldGroup>
      </FormTextField>
      <FormSubmitButton className='ml-auto'>Submit</FormSubmitButton>
    </Form>
  )
}
