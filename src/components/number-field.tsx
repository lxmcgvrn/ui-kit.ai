import type { ComponentProps, ForwardedRef, ReactNode } from 'react'
import type { NumberFieldProps as RACNumberFieldProps, NumberFieldRenderProps as RACNumberFieldRenderProps } from 'react-aria-components'

import { LucideMinus, LucidePlus } from 'lucide-react'
import { useContext, useMemo, useState } from 'react'
import {
  composeRenderProps,
  ButtonContext as RACButtonContext,
  DEFAULT_SLOT as RACDEFAULT_SLOT,
  NumberField as RACNumberField,
  NumberFieldStateContext as RACNumberFieldStateContext,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { FieldButton } from './field-button'
import { Input } from './input'

export interface NumberFieldProps extends RACNumberFieldProps {
  ref?: ForwardedRef<HTMLDivElement>
}

/** A numeric input. Pair it with steppers to nudge the value up and down. */
export function NumberField({ children = <Input />, ref, ...props }: NumberFieldProps) {
  const [isValueHidden, setIsValueHidden] = useState(false)

  return (
    <RACNumberField
      {...props}
      {...{ 'data-value-hidden': isValueHidden || undefined }}
      className={composeRenderProps(props.className, (className) =>
        twMerge(
          'group invalid:error relative w-full',
          // A numeric input cannot swap to `type=password`, so a passcode hides in CSS.
          '[&[data-value-hidden]_input]:[-webkit-text-security:disc]',
          className
        )
      )}
      ref={ref}
    >
      {composeRenderProps<ReactNode, RACNumberFieldRenderProps & { defaultChildren: ReactNode }, ReactNode>(children, (children) => (
        <NumberFieldButtons
          isDisabled={props.isDisabled === true || props.isReadOnly === true}
          isValueHidden={isValueHidden}
          onToggleVisibility={() => {
            setIsValueHidden((hidden) => !hidden)
          }}
        >
          {children}
        </NumberFieldButtons>
      ))}
    </RACNumberField>
  )
}
NumberField.displayName = 'NumberField'

export interface NumberFieldDecrementButtonProps extends Omit<ComponentProps<typeof FieldButton>, 'children' | 'slot'> {}

/** A `FieldButton` that steps the value down. NumberField wires up the press. */
export function NumberFieldDecrementButton(props: NumberFieldDecrementButtonProps) {
  return (
    <FieldButton
      {...props}
      slot='decrement'
    >
      <LucideMinus aria-hidden />
    </FieldButton>
  )
}
NumberFieldDecrementButton.displayName = 'NumberFieldDecrementButton'

export interface NumberFieldIncrementButtonProps extends Omit<ComponentProps<typeof FieldButton>, 'children' | 'slot'> {}

/** A `FieldButton` that steps the value up. NumberField wires up the press. */
export function NumberFieldIncrementButton(props: NumberFieldIncrementButtonProps) {
  return (
    <FieldButton
      {...props}
      slot='increment'
    >
      <LucidePlus aria-hidden />
    </FieldButton>
  )
}
NumberFieldIncrementButton.displayName = 'NumberFieldIncrementButton'

interface NumberFieldButtonsProps {
  children: ReactNode
  isDisabled: boolean
  isValueHidden: boolean
  onToggleVisibility: () => void
}

/** Hands the composed buttons their slot props, on top of RAC's stepper slots. */
function NumberFieldButtons({ children, ...props }: NumberFieldButtonsProps) {
  return <RACButtonContext.Provider value={useNumberFieldButtons(props)}>{children}</RACButtonContext.Provider>
}
NumberFieldButtons.displayName = 'NumberFieldButtons'

/** Slot props for the clear, copy, and visibility buttons a caller composes in. */
function useNumberFieldButtons({ isDisabled, isValueHidden, onToggleVisibility }: Omit<NumberFieldButtonsProps, 'children'>) {
  const state = useContext(RACNumberFieldStateContext)
  const steppers = useContext(RACButtonContext)
  const isEmpty = state == null || Number.isNaN(state.numberValue)

  return useMemo(
    () => ({
      slots: {
        [RACDEFAULT_SLOT]: {},
        ...(steppers != null && 'slots' in steppers ? steppers.slots : undefined),
        clear: {
          'data-empty': isEmpty || undefined,
          isDisabled: isEmpty || isDisabled,
          onPress: () => state?.setNumberValue(NaN),
        },
        copy: {
          isDisabled: isEmpty,
          onPress: () => void navigator.clipboard.writeText(state?.inputValue ?? ''),
        },
        visibility: {
          onPress: onToggleVisibility,
          value: isValueHidden ? 'hidden' : 'visible',
        },
      },
    }),
    [isDisabled, isEmpty, isValueHidden, onToggleVisibility, state, steppers]
  )
}
