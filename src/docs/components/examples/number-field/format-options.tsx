'use client'

import {
    FieldGroup,
    Input,
    Label,
    NumberField,
    NumberFieldDecrementButton,
    NumberFieldIncrementButton,
} from '@ui-kit.ai/components'

export default function NumberFieldFormatOptions() {
    return (
        <NumberField
            defaultValue={25}
            formatOptions={{ currency: 'GBP', currencyDisplay: 'code', style: 'currency' }}
            minValue={0}
            step={5}
        >
            <Label>Budget</Label>
            <FieldGroup>
                <Input isBorderless />
                <NumberFieldDecrementButton />
                <NumberFieldIncrementButton />
            </FieldGroup>
        </NumberField>
    )
}
