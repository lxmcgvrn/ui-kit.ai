'use client'

import { Form, FormSwitch } from '@ui-kit.ai/components'

export default function FormSwitchIsInvalid() {
    return (
        <Form onSubmit={() => undefined}>
            <FormSwitch
                isInvalid
                label='This is the label'
                name='notifications'
            />
        </Form>
    )
}
