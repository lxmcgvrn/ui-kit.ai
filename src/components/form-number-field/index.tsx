import type { ComponentProps, ReactNode } from 'react'
import type { NumberFieldRenderProps as RACNumberFieldRenderProps } from 'react-aria-components'

import { composeRenderProps } from 'react-aria-components'
import { useController, useFormContext } from 'react-hook-form'

import { FieldError } from '../field-error'
import { Input } from '../input'
import { NumberField } from '../number-field'

/** `name` binds the field to `react-hook-form`; omitting it throws. */
export interface FormNumberFieldProps extends Omit<ComponentProps<typeof NumberField>, 'children'> {
    /** The field body. Defaults to a bare `Input`. */
    children?: ComponentProps<typeof NumberField>['children']
}

/** A {@link NumberField} bound to the surrounding `Form`. */
export function FormNumberField({ children = <Input />, ...props }: FormNumberFieldProps) {
    if (props.name == null) throw new Error('FormNumberField requires a name prop')

    const { control } = useFormContext()

    const {
        field: { disabled: isDisabled, name, onBlur, onChange, ref, ...field },
        fieldState: { error, invalid },
    } = useController({
        control,
        defaultValue: props.value ?? props.defaultValue,
        name: props.name,
    })

    // `NaN` is how RAC's NumberField spells "empty" for a controlled value.
    const value: number = typeof field.value === 'number' ? field.value : NaN

    return (
        <NumberField
            {...props}
            isDisabled={isDisabled}
            isInvalid={invalid}
            name={name}
            onBlur={onBlur}
            onChange={(v) => {
                onChange(Number.isNaN(v) ? null : v)
                props.onChange?.(v)
            }}
            ref={ref}
            validationBehavior='aria' // Let React Hook Form handle validation instead of the browser.
            value={value}
        >
            {composeRenderProps<
                ReactNode,
                RACNumberFieldRenderProps & { defaultChildren: ReactNode },
                ReactNode
            >(children, (children) => (
                <>
                    {children}
                    <FieldError>{error?.message}</FieldError>
                </>
            ))}
        </NumberField>
    )
}
FormNumberField.displayName = 'FormNumberField'
