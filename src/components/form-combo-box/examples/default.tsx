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
import { SearchIcon } from 'lucide-react'

export default function FormComboBoxDefault() {
    return (
        <Form onSubmit={() => {}}>
            <FormComboBox
                items={getMockOptions({ withIcon: true })}
                name='combobox'
            >
                <Label>This is a label for a field</Label>
                <ComboBoxFieldGroup>
                    <ComboBoxInput
                        icon={<SearchIcon />}
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
