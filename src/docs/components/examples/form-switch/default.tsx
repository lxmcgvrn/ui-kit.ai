'use client'

import { Form, FormSwitch } from '@ui-kit.ai/components'

export default function FormSwitchDefault() {
  return (
    <Form onSubmit={() => undefined}>
      <FormSwitch
        description='Optional description'
        label='This is the label'
        name='notifications'
      />
    </Form>
  )
}
