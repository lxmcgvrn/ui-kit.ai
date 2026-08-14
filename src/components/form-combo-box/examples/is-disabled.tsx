'use client'

import {
    ComboBoxButton,
    ComboBoxClearButton,
    ComboBoxFieldGroup,
    ComboBoxInput,
    Description,
    Form,
    FormComboBox,
    Label,
} from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'
import { LucideSearch } from 'lucide-react'

export default function FormComboBoxIsDisabled() {
    return (
        <Form onSubmit={() => undefined}>
            <FormComboBox
                isDisabled
                items={getMockOptions({ withIcon: true, withSections: true })}
                name='combobox'
            >
                <Label>This is a label for a field</Label>
                <ComboBoxFieldGroup>
                    <ComboBoxInput
                        icon={<LucideSearch />}
                        isBorderless
                        placeholder='Type to search...'
                    />
                    <ComboBoxClearButton />
                    <ComboBoxButton />
                </ComboBoxFieldGroup>
                <Description>This is a description for a field</Description>
            </FormComboBox>
        </Form>
    )
}
