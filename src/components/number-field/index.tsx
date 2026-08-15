import type { ComponentProps, ForwardedRef } from 'react'
import type { NumberFieldProps as RACNumberFieldProps } from 'react-aria-components'

import { LucideMinus, LucidePlus } from 'lucide-react'
import { composeRenderProps, NumberField as RACNumberField } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { FieldButton } from '../field-button'
import { Input } from '../input'

export interface NumberFieldProps extends RACNumberFieldProps {
    ref?: ForwardedRef<HTMLDivElement>
}

/** A numeric input. Pair it with steppers to nudge the value up and down. */
export function NumberField({ children = <Input />, ref, ...props }: NumberFieldProps) {
    return (
        <RACNumberField
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge('group invalid:error relative w-full', className)
            )}
            ref={ref}
        >
            {children}
        </RACNumberField>
    )
}
NumberField.displayName = 'NumberField'

export interface NumberFieldDecrementButtonProps
    extends Omit<ComponentProps<typeof FieldButton>, 'children' | 'slot'> {}

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

export interface NumberFieldIncrementButtonProps
    extends Omit<ComponentProps<typeof FieldButton>, 'children' | 'slot'> {}

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
