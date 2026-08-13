import { useController, useFormContext } from 'react-hook-form'

import type { CheckboxGroupProps } from '../checkbox-group'

import { CheckboxGroup } from '../checkbox-group'
import { FieldError } from '../field-error'

/**
 * Props accepted by {@link FormCheckboxGroup} — every {@link CheckboxGroupProps}
 * prop, wired to `react-hook-form` through `name`.
 */
export interface FormCheckboxGroupProps extends CheckboxGroupProps {
    /**
     * The field this group is registered under in the surrounding `Form`. The
     * component throws when it is missing.
     */
    name?: string
}

/**
 * A `FormCheckboxGroup` connects a `CheckboxGroup` to a `Form` component using `react-hook-form`.
 */
export function FormCheckboxGroup({ children, ...props }: FormCheckboxGroupProps) {
    if (props.name == null) throw new Error('FormCheckboxGroup requires a name prop')

    const { control } = useFormContext()

    const {
        field: { disabled: isDisabled, name, onBlur, onChange, ref, value = '' },
        fieldState: { error, invalid },
    } = useController({
        control,
        defaultValue: props.value ?? props.defaultValue ?? [],
        name: props.name,
    })

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
            {(renderProps) => {
                return (
                    <>
                        {typeof children === 'function' ? children(renderProps) : children}
                        <FieldError>{error?.message}</FieldError>
                    </>
                )
            }}
        </CheckboxGroup>
    )
}
FormCheckboxGroup.displayName = 'FormCheckboxGroup'
