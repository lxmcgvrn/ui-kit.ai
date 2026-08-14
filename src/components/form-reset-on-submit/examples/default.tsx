'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormResetOnSubmit, FormTextField } from '@ui-kit.ai/components'
import { z } from 'zod'

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
})

type FieldValues = z.infer<typeof schema>

export default function FormResetOnSubmitDefault() {
    return (
        <Form<FieldValues>
            onSubmit={async (data) => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000))
                alert(`Submitted: ${JSON.stringify(data, null, 2)}`)
            }}
            options={{ resolver: zodResolver(schema) }}
        >
            <FormTextField
                className='mb-4'
                name='name'
            >
                <input placeholder='Enter your name' />
            </FormTextField>

            <button type='submit'>Submit</button>

            {/* FormResetOnSubmit clears the form after a successful submit */}
            <FormResetOnSubmit />
        </Form>
    )
}
