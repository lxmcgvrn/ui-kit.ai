'use client'

import {
    FieldGroup,
    Form,
    FormNumberField,
    Input,
    Label,
    NumberFieldDecrementButton,
    NumberFieldIncrementButton,
} from '@ui-kit.ai/components'

export default function FormNumberFieldDefault() {
    return (
        <Form onSubmit={() => undefined}>
            <FormNumberField
                minValue={1}
                name='quantity'
            >
                <Label>This is a label for a field</Label>
                <FieldGroup>
                    <Input
                        isBorderless
                        placeholder='Enter a quantity'
                    />
                    <NumberFieldDecrementButton />
                    <NumberFieldIncrementButton />
                </FieldGroup>
            </FormNumberField>
        </Form>
    )
}
