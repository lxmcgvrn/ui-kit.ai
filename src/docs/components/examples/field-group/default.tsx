'use client'

import {
    FieldGroup,
    Input,
    TextField,
    TextFieldClearButton,
    TextFieldCopyButton,
    TextFieldVisibilityButton,
} from '@ui-kit.ai/components'

export default function FieldGroupDefault() {
    return (
        <FieldGroup>
            <TextField aria-label='City'>
                <Input
                    isBorderless
                    placeholder='Enter your city...'
                />
            </TextField>
            <TextFieldClearButton />
            <TextFieldVisibilityButton />
            <TextFieldCopyButton />
        </FieldGroup>
    )
}
