'use client'

import {
    ComboBox,
    ComboBoxButton,
    ComboBoxClearButton,
    ComboBoxFieldGroup,
    ComboBoxInput,
    Description,
    Label,
} from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'
import { SearchIcon } from 'lucide-react'

export default function ComboBoxDisabled() {
    return (
        <ComboBox
            isDisabled
            items={getMockOptions<'listbox'>({
                withIcon: true,
                withSections: true,
            })}
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
        </ComboBox>
    )
}
