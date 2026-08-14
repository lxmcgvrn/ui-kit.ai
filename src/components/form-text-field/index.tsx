import type { ComponentProps } from 'react'

import { useController, useFormContext } from 'react-hook-form'

import { FieldError } from '../field-error'
import { Input } from '../input'
import { TextField } from '../text-field'

/** `name` is required here: it binds the field to `react-hook-form`. */
export interface FormTextFieldProps extends Omit<ComponentProps<typeof TextField>, 'children'> {
    /** The field body. Defaults to a bare `Input`. */
    children?: ComponentProps<typeof TextField>['children']
}

/** A {@link TextField} bound to the surrounding `Form`. */
export function FormTextField({ children = <Input />, ...props }: FormTextFieldProps) {
    if (props.name == null) throw new Error('Form.TextField requires a name prop')

    const { control } = useFormContext()

    const {
        field: { disabled: isDisabled, name, onBlur, onChange, ref, ...field },
        fieldState: { error, invalid },
    } = useController({
        control,
        defaultValue: props.value ?? props.defaultValue,
        name: props.name,
    })

    const value: string = typeof field.value === 'string' ? field.value : ''

    return (
        <TextField
            {...props}
            defaultValue={value}
            isDisabled={isDisabled}
            isInvalid={invalid}
            name={name}
            onBlur={onBlur}
            onChange={(v) => {
                onChange(v)
                props.onChange?.(v)
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
        </TextField>
    )
}
FormTextField.displayName = 'FormTextField'
