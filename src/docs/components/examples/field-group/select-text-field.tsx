'use client'

import { FieldGroup, Input, Select, SelectButton, TextField } from '@ui-kit.ai/components'

export default function FieldGroupSelectTextField() {
    return (
        <FieldGroup>
            <Select
                aria-label='Country'
                className='border-r-mid border-r'
                items={[
                    {
                        id: 'ireland',
                        textValue: 'Ireland',
                    },
                    {
                        id: 'united-kingdom',
                        textValue: 'United Kingdom',
                    },
                ]}
                name='country'
            >
                {(rp) => (
                    <SelectButton
                        {...rp}
                        isBorderless
                    />
                )}
            </Select>

            <TextField aria-label='City'>
                <Input
                    isBorderless
                    placeholder='Enter your city...'
                />
            </TextField>
        </FieldGroup>
    )
}
