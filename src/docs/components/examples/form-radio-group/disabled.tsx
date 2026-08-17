'use client'

import { Description, Form, FormRadioGroup, Label, Radio } from '@ui-kit.ai/components'

export default function FormRadioGroupDisabled() {
    return (
        <Form onSubmit={() => undefined}>
            <FormRadioGroup
                isDisabled
                name='plan'
            >
                <Label>This is a label for a field</Label>
                <Radio
                    description='Optional description'
                    label='Item A'
                    value='item-a'
                />
                <Radio
                    description='Optional description'
                    label='Item B'
                    value='item-b'
                />
                <Description>This is a description for a field</Description>
            </FormRadioGroup>
        </Form>
    )
}
