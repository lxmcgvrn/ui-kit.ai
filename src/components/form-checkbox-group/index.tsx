import { composeRenderProps } from 'react-aria-components'
import { useController, useFormContext } from 'react-hook-form'

import type { CheckboxGroupProps } from '../checkbox-group'

import { CheckboxGroup } from '../checkbox-group'
import { FieldError } from '../field-error'

export interface FormCheckboxGroupProps extends CheckboxGroupProps {
    /** Field name in the surrounding `Form`. Required — throws when missing. */
    name?: string
}

/** Connects a `CheckboxGroup` to the surrounding `Form`. */
export function FormCheckboxGroup({ children, ...props }: FormCheckboxGroupProps) {
    if (props.name == null) throw new Error('FormCheckboxGroup requires a name prop')

    const { control } = useFormContext()

    const { field, fieldState } = useController({
        control,
        defaultValue: props.value ?? props.defaultValue ?? [],
        name: props.name,
    })

    const { disabled: isDisabled, name, onBlur, onChange, ref } = field
    const { error, invalid } = fieldState
    const value = (field.value ?? []) as string[]

    return (
        <CheckboxGroup
            {...props}
            isDisabled={isDisabled}
            isInvalid={invalid}
            name={name}
            onBlur={onBlur}
            onChange={(k) => {
                onChange(k)
                props.onChange?.(k)
            }}
            ref={ref}
            validationBehavior='aria' // Let React Hook Form handle validation instead of the browser.
            value={value}
        >
            {composeRenderProps(children, (children) => (
                <>
                    {children}
                    <FieldError>{error?.message}</FieldError>
                </>
            ))}
        </CheckboxGroup>
    )
}
FormCheckboxGroup.displayName = 'FormCheckboxGroup'
