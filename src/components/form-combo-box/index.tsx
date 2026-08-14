import type { ComponentProps } from 'react'
import type { Key as RACKey } from 'react-aria-components'

import { useController, useFormContext } from 'react-hook-form'

import type { OptionsSchema } from '../types/options'

import { ComboBox } from '../combo-box'
import { FieldError } from '../field-error'

export interface FormComboBoxProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>
    extends ComponentProps<typeof ComboBox<T>> {
    /** Field name in the surrounding `Form`. Required — throws when missing. */
    name?: string
}

/** Connects a `ComboBox` to the surrounding `Form`. */
export function FormComboBox<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>({
    children,
    ...props
}: FormComboBoxProps<T>) {
    if (props.name == null) throw new Error('FormComboBox requires a name prop')

    const { control } = useFormContext()

    const { field, fieldState } = useController({
        control,
        defaultValue: props.selectedKey ?? props.defaultSelectedKey,
        disabled: props.isDisabled,
        name: props.name,
    })

    const { disabled, name, onBlur, onChange, ref } = field
    const { error, invalid } = fieldState
    const selectedKey = (field.value ?? '') as RACKey

    return (
        <ComboBox
            {...props}
            isDisabled={disabled}
            isInvalid={invalid}
            name={name}
            onBlur={onBlur}
            onSelectionChange={(k) => {
                onChange(k)
                props.onSelectionChange?.(k)
            }}
            ref={ref}
            selectedKey={selectedKey}
            validationBehavior='aria' // Let React Hook Form handle validation instead of the browser.
        >
            {(rp) => {
                return (
                    <>
                        {typeof children === 'function' ? children(rp) : children}
                        <FieldError>{error?.message}</FieldError>
                    </>
                )
            }}
        </ComboBox>
    )
}
FormComboBox.displayName = 'FormComboBox'
