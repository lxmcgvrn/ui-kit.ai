'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
    Checkbox,
    ComboBoxButton,
    ComboBoxClearButton,
    ComboBoxFieldGroup,
    ComboBoxInput,
    Description,
    FieldGroup,
    Form,
    FormCheckboxGroup,
    FormComboBox,
    FormSubmitButton,
    FormTextField,
    Input,
    Label,
    TextFieldClearButton,
} from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'
import { LucideAtSign, LucideGlobe } from 'lucide-react'
import { z } from 'zod'

const schema = z.object({
    communication_preference: z.array(z.string()).min(1),
    country_of_residence: z.string().min(1, 'Select a country'),
    email: z.string().min(1, 'Email address is required'),
})

/**
 * Inferring the form's field values from the schema gives `onSubmit` and
 * `onError` a correctly typed argument, and keeps the `name` of every field in
 * sync with the shape of the data you expect back.
 */
type FieldValues = z.infer<typeof schema>

export default function FormDefault() {
    return (
        <Form<FieldValues>
            onError={(errors) => {
                alert(`Errors:\n\n${JSON.stringify(errors, null, 4)}`)
            }}
            onSubmit={async (data) => {
                await new Promise((resolve) => setTimeout(resolve, 1_000))
                alert(`Submitted:\n\n${JSON.stringify(data, null, 4)}`)
            }}
            options={{ resolver: zodResolver(schema) }}
        >
            <FormTextField
                className='mb-4'
                isRequired
                name='email'
                type='email'
            >
                <Label>Email address</Label>
                <FieldGroup>
                    <Input
                        icon={<LucideAtSign />}
                        isBorderless
                        placeholder='Enter your email address'
                    />
                    <TextFieldClearButton />
                </FieldGroup>
            </FormTextField>

            <FormComboBox
                className='mb-4'
                items={getMockOptions()}
                name='country_of_residence'
            >
                <Label>Country of residence</Label>
                <ComboBoxFieldGroup>
                    <ComboBoxInput
                        icon={<LucideGlobe />}
                        isBorderless
                        placeholder='Type to search...'
                    />
                    <ComboBoxClearButton />
                    <ComboBoxButton />
                </ComboBoxFieldGroup>
            </FormComboBox>

            <FormCheckboxGroup
                className='mb-4'
                defaultValue={['account_updates']}
                name='communication_preference'
            >
                <Label>Communication preferences</Label>
                <Checkbox
                    description='Necessary emails about your account & security.'
                    isDisabled
                    isRequired
                    label='Account updates'
                    value='account_updates'
                />
                <Checkbox
                    description='Max 1 email per month with updates from our team.'
                    label='Newsletter'
                    value='newsletter'
                />
                <Checkbox
                    description="Deals, discounts and suggestions we think you'll love."
                    label='Promotions and Offers'
                    value='promotions'
                />
                <Description>This is a description for a field</Description>
            </FormCheckboxGroup>

            <FormSubmitButton />
        </Form>
    )
}
