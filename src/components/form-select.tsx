import type { ComponentProps } from 'react'
import type { Key as RACKey } from 'react-aria-components'

import { composeRenderProps } from 'react-aria-components'
import { useController, useFormContext } from 'react-hook-form'

import type { OptionsSchema } from './types/options'

import { FieldError } from './field-error'
import { Select } from './select'

export interface FormSelectProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>> extends ComponentProps<typeof Select<T>> {
  /** Field name in the surrounding `Form`. Required — throws when missing. */
  name?: string
}

/** Connects a `Select` to the surrounding `Form`. */
export function FormSelect<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>({ children, ...props }: FormSelectProps<T>) {
  if (props.name == null) throw new Error('FormSelect requires a name prop')

  const { control } = useFormContext()

  const { field, fieldState } = useController({
    control,
    defaultValue: props.selectedKey ?? props.defaultSelectedKey,
    name: props.name,
  })

  const { disabled: isDisabled, name, onBlur, onChange, ref } = field
  const { error, invalid } = fieldState
  const selectedKey = (field.value ?? '') as RACKey

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
      selectedKey={selectedKey}
      validationBehavior='aria' // Let React Hook Form handle validation instead of the browser.
    >
      {composeRenderProps(children, (children) => (
        <>
          {children}
          <FieldError>{error?.message}</FieldError>
        </>
      ))}
    </Select>
  )
}
FormSelect.displayName = 'FormSelect'
