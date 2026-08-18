import type { ForwardedRef } from 'react'
import type { TextFieldProps as RACTextFieldProps } from 'react-aria-components'

import { useEffect, useMemo, useState } from 'react'
import {
  composeRenderProps,
  ButtonContext as RACButtonContext,
  DEFAULT_SLOT as RACDEFAULT_SLOT,
  TextField as RACTextField,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Input } from './input'

export interface TextFieldProps extends RACTextFieldProps {
  ref?: ForwardedRef<HTMLInputElement>
}

/** A text input. Pair it with labels, icons, and validation messages. */
export function TextField({ children = <Input />, ref, ...props }: TextFieldProps) {
  const { context, onChange, type, value } = useTextFieldButtons(props)

  return (
    <RACButtonContext.Provider value={context}>
      <RACTextField
        {...props}
        className={composeRenderProps(props.className, (className) => twMerge('group invalid:error relative w-full', className))}
        onChange={onChange}
        ref={ref}
        type={type}
        value={value}
      >
        {children}
      </RACTextField>
    </RACButtonContext.Provider>
  )
}
TextField.displayName = 'TextField'

/** Slot props for the clear, copy, and visibility buttons a caller composes in. */
function useTextFieldButtons(props: Omit<TextFieldProps, 'children'>) {
  const [value, setValue] = useState(props.value ?? props.defaultValue ?? '')
  const [type, setType] = useState(props.type)

  useEffect(() => {
    setValue(props.value ?? props.defaultValue ?? '')
  }, [props.value, props.defaultValue])

  const { isDisabled, isReadOnly, onChange } = props
  const isEmpty = value === ''

  const context = useMemo(
    () => ({
      slots: {
        clear: {
          'data-empty': isEmpty || undefined,
          isDisabled: isEmpty || isDisabled === true || isReadOnly === true,
          onPress: () => {
            setValue('')
            onChange?.('')
          },
        },
        copy: {
          isDisabled: isEmpty,
          onPress: () => void navigator.clipboard.writeText(value),
        },
        [RACDEFAULT_SLOT]: {},
        visibility: {
          onPress: () => {
            setType((current) => (current === 'password' ? 'text' : 'password'))
          },
          value: type === 'password' ? 'hidden' : 'visible',
        },
      },
    }),
    [isDisabled, isEmpty, isReadOnly, onChange, type, value]
  )

  return {
    context,
    onChange: (next: string) => {
      setValue(next)
      onChange?.(next)
    },
    type,
    value,
  }
}
