import { composeRenderProps } from 'react-aria-components'
import { useController, useFormContext } from 'react-hook-form'

import type { RadioGroupProps } from './radio-group'

import { FieldError } from './field-error'
import { RadioGroup } from './radio-group'

export interface FormRadioGroupProps extends RadioGroupProps {
  /** Field name in the surrounding `Form`. Required — throws when missing. */
  name?: string
}

/** Connects a `RadioGroup` to the surrounding `Form`. */
export function FormRadioGroup({ children, ...props }: FormRadioGroupProps) {
  if (props.name == null) throw new Error('FormRadioGroup requires a name prop')

  const { control } = useFormContext()

  const { field, fieldState } = useController({
    control,
    defaultValue: props.value ?? props.defaultValue ?? null,
    name: props.name,
  })

  const { disabled: isDisabled, name, onBlur, onChange, ref } = field
  const { error, invalid } = fieldState
  const value = (field.value ?? null) as null | string

  return (
    <RadioGroup
      {...props}
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
      {composeRenderProps(children, (children) => (
        <>
          {children}
          <FieldError>{error?.message}</FieldError>
        </>
      ))}
    </RadioGroup>
  )
}
FormRadioGroup.displayName = 'FormRadioGroup'
