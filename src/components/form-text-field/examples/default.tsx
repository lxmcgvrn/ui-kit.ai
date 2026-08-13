'use client'

import {
    FieldGroup,
    Form,
    FormTextField,
    Input,
    Label,
    TextFieldClearButton,
} from '@ui-kit.ai/components'
import { AtSignIcon } from 'lucide-react'

export default function FormTextFieldDefault() {
    return (
        <Form onSubmit={() => {}}>
            <FormTextField name='email'>
                <Label>This is a label for a field</Label>
                <FieldGroup>
                    <Input
                        icon={<AtSignIcon />}
                        isBorderless
                        placeholder='Enter your email address'
                    />
                    <TextFieldClearButton />
                </FieldGroup>
            </FormTextField>
        </Form>
    )
}
