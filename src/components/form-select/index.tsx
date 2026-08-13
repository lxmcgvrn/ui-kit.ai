import type { ComponentProps } from 'react'

import { useController, useFormContext } from 'react-hook-form'

import type { OptionsSchema } from '../types/options'

import { FieldError } from '../field-error'
import { Select } from '../select'

/**
 * Props accepted by {@link FormSelect} — every `Select` prop, wired to
 * `react-hook-form` through `name`.
 */
export interface FormSelectProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>
    extends ComponentProps<typeof Select<T>> {
    /**
     * The field this select is registered under in the surrounding `Form`. The
     * component throws when it is missing.
     */
    name?: string
}

/**
 * A `FormSelect` connects a `Select` to a `Form` component using `react-hook-form`.
 */
export function FormSelect<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>({
    children,
    ...props
}: FormSelectProps<T>) {
    if (props.name == null) throw new Error('FormSelect requires a name prop')

    const { control } = useFormContext()

    const {
        field: { disabled: isDisabled, name, onBlur, onChange, ref, value = '' },
        fieldState: { error, invalid },
    } = useController({
        control,
        defaultValue: props.selectedKey ?? props.defaultSelectedKey,
        name: props.name,
    })

    return (
        <Select
            {...props}
            isDisabled={isDisabled}
            isInvalid={invalid}
            name={name}
            onBlur={onBlur}
            onSelectionChange={(k) => {
                onChange(k)
                props.onSelectionChange?.(k)
            }}
            ref={ref}
            selectedKey={value ?? ''}
            validationBehavior='aria' // Let React Hook Form handle validation instead of the browser.
        >
            {(renderProps) => {
                return (
                    <>
                        {typeof children === 'function' ? children(renderProps) : children}
                        <FieldError>{error?.message}</FieldError>
                    </>
                )
            }}
        </Select>
    )
}
FormSelect.displayName = 'FormSelect'
