import { useController, useFormContext } from 'react-hook-form'

import type { SwitchProps } from '../switch'

import { Switch } from '../switch'

export type FormSwitchProps = {
    /** Field name in the surrounding `Form`. Required — throws when missing. */
    name?: string
} & SwitchProps

/** Connects a `Switch` to the surrounding `Form` as a boolean field. */
export function FormSwitch(props: FormSwitchProps) {
    if (props.name == null) throw new Error('FormSwitch requires a name prop')

    const { control } = useFormContext()

    const { field, fieldState } = useController({
        control,
        defaultValue: props.isSelected ?? props.defaultSelected ?? false,
        name: props.name,
    })

    const { disabled: isDisabled, name, onBlur, onChange } = field
    const { invalid } = fieldState
    const isSelected = field.value === true

    return (
        <Switch
            {...props}
            isDisabled={isDisabled}
            isInvalid={invalid}
            isSelected={isSelected}
            name={name}
            onBlur={onBlur}
            onChange={(v) => {
                onChange(v)
                props.onChange?.(v)
            }}
        />
    )
}
FormSwitch.displayName = 'FormSwitch'
