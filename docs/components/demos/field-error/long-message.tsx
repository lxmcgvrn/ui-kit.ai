'use client'

import { Form, FormTextField, Input, Label } from '@ui-kit.ai/components'

export default function FieldErrorLongMessage() {
    return (
        <Form
            onSubmit={() => undefined}
            options={{
                errors: {
                    name: {
                        message:
                            'This is a longer error message that might wrap to multiple lines. It should still be readable and not cause any layout issues.',
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
