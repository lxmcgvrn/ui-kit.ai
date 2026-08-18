import type { ForwardedRef } from 'react'
import type { Color as RACColor, ColorFieldProps as RACColorFieldProps } from 'react-aria-components'

import { useContext, useEffect, useMemo, useState } from 'react'
import {
  composeRenderProps,
  ButtonContext as RACButtonContext,
  ColorField as RACColorField,
  ColorPickerStateContext as RACColorPickerStateContext,
  DEFAULT_SLOT as RACDEFAULT_SLOT,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Input } from './input'

export interface ColorFieldProps extends RACColorFieldProps {
  /** A ref forwarded to the underlying `&lt;input />` element. */
  ref?: ForwardedRef<HTMLInputElement>
}

/** Edits a hex color or a single color channel. */
export function ColorField({ children = <Input />, ref, ...props }: ColorFieldProps) {
  const { context, controlledProps } = useColorFieldButtons(props)

  return (
    <RACButtonContext.Provider value={context}>
      <RACColorField
        {...props}
        {...controlledProps}
        className={composeRenderProps(props.className, (className) => twMerge('group relative w-full grow', className))}
        ref={ref}
      >
        {children}
      </RACColorField>
    </RACButtonContext.Provider>
  )
}
ColorField.displayName = 'ColorField'

/** Slot props for the clear and copy buttons a caller composes in. */
function useColorFieldButtons(props: Omit<ColorFieldProps, 'children'>) {
  const picker = useContext(RACColorPickerStateContext)
  const [controlledValue, setControlledValue] = useState<null | RACColor | string>(props.value ?? props.defaultValue ?? null)

  useEffect(() => {
    setControlledValue(props.value ?? props.defaultValue ?? null)
  }, [props.value, props.defaultValue])

  const { isDisabled, isReadOnly, onChange } = props
  const value = picker == null ? controlledValue : picker.color
  const hex = typeof value === 'string' ? value : (value?.toString('hex') ?? '')
  const isEmpty = hex === ''

  const context = useMemo(
    () => ({
      slots: {
        clear: {
          'data-empty': isEmpty || undefined,
          isDisabled: isEmpty || isDisabled === true || isReadOnly === true,
          onPress: () => {
            if (picker == null) {
              setControlledValue(null)
              onChange?.(null)
            } else {
              picker.setColor(null)
            }
          },
        },
        copy: {
          isDisabled: isEmpty,
          onPress: () => void navigator.clipboard.writeText(hex),
        },
        [RACDEFAULT_SLOT]: {},
      },
    }),
    [hex, isDisabled, isEmpty, isReadOnly, onChange, picker]
  )

  /* Controlling a picker-driven field would cut the picker out of the loop. */
  const controlledProps = useMemo(
    () =>
      picker == null
        ? {
            onChange: (color: null | RACColor) => {
              setControlledValue(color)
              onChange?.(color)
            },
            value: controlledValue,
          }
        : {},
    [controlledValue, onChange, picker]
  )

  return { context, controlledProps }
}
