import type { ComponentProps, ForwardedRef } from 'react'
import type { ComboBoxProps as RACComboBoxProps } from 'react-aria-components'

import { LucideChevronsUpDown, LucideX } from 'lucide-react'
import React, { useContext } from 'react'
import {
    ComboBox as RACComboBox,
    ComboBoxStateContext as RACComboBoxStateContext,
    ListBox as RACListBox,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import type { OptionsSchema } from '../types/options'

import { FieldButton } from '../field-button'
import { FieldGroup } from '../field-group'
import { Input } from '../input'
import { OptionRenderer } from '../options'
import { Popover } from '../popover'

/**
 * Props accepted by {@link ComboBoxButton}.
 */
export interface ComboBoxButtonProps
    extends Omit<ComponentProps<typeof FieldButton>, 'children' | 'isDisabled' | 'onPress'> {}

/**
 * A button that triggers the ComboBox Popover. Props such as onPress and
 * isDisabled will be set by the ComboBox.
 */
export function ComboBoxButton(props: ComboBoxButtonProps) {
    return (
        <FieldButton {...props}>
            <LucideChevronsUpDown aria-hidden />
        </FieldButton>
    )
}
ComboBoxButton.displayName = 'ComboBoxButton'

/**
 * Props accepted by {@link ComboBoxClearButton}.
 */
export interface ComboBoxClearButtonProps
    extends Omit<
        ComponentProps<typeof FieldButton>,
        'children' | 'isDisabled' | 'onPress' | 'slot'
    > {}

/**
 * A button that clears the selected key from the ComboBox. Only visible when
 * the ComboBox has a selected key. Props such as onPress and isDisabled will be
 * set by the ComboBox.
 */
export function ComboBoxClearButton(props: ComboBoxClearButtonProps) {
    const state = useContext(RACComboBoxStateContext)

    const isEmpty = state?.inputValue == null || state.inputValue === ''

    return (
        <FieldButton
            {...props}
            aria-label='Clear'
            className={(renderProps) =>
                twMerge(
                    'transition-opacity',
                    isEmpty ? 'invisible hidden opacity-0' : 'opacity-100',
                    typeof props.className === 'function'
                        ? props.className(renderProps)
                        : props.className
                )
            }
            isDisabled={isEmpty}
            onPress={() => {
                state?.setInputValue('')
                state?.setSelectedKey(null)
            }}
            slot={null} // Don't inherit default Button behavior from ComboBox.
        >
            <LucideX
                aria-hidden
                className='size-4'
            />
        </FieldButton>
    )
}
ComboBoxClearButton.displayName = 'ComboBoxClearButton'

/**
 * Props accepted by {@link ComboBoxFieldGroup}.
 */
export interface ComboBoxFieldGroupProps extends ComponentProps<typeof FieldGroup> {}

/**
 * A group that holds a ComboBoxInput and the related button controls.
 * Responsible for setting a ref used to measure the input and size the Popover
 * correctly.
 */
export function ComboBoxFieldGroup(props: ComboBoxFieldGroupProps) {
    return <FieldGroup {...props} />
}
ComboBoxFieldGroup.displayName = 'ComboBoxFieldGroup'

/**
 * Props accepted by {@link ComboBoxInput}. Everything {@link Input} accepts,
 * plus a ref to the underlying input element.
 */
export interface ComboBoxInputProps extends ComponentProps<typeof Input> {
    ref?: ForwardedRef<HTMLInputElement>
}

/**
 * An input that is used to interact with a ComboBox. Is customized to
 * toggle the ComboBox on click.
 */
export const ComboBoxInput = ({ ref, ...props }: ComboBoxInputProps) => {
    const state = useContext(RACComboBoxStateContext)

    const { selectedItem, toggle } = state ?? {}
    const { value } = selectedItem ?? {}
    const { icon } = value ?? {}

    return (
        <Input
            {...props}
            defaultValue={value?.name ?? props.defaultValue}
            icon={icon ?? props.icon}
            onClick={(e) => {
                toggle?.(null, 'focus')
                props.onClick?.(e)
            }}
            placeholder={selectedItem?.value.name ?? props.placeholder ?? ''}
            ref={ref}
        />
    )
}
ComboBoxInput.displayName = 'ComboBoxInput'

/**
 * Props accepted by {@link ComboBox}. Everything `react-aria-components`'
 * `ComboBox` accepts, plus this design system's presentational props.
 */
export interface ComboBoxProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>
    extends Pick<ComponentProps<typeof RACListBox>, 'renderEmptyState'>,
        RACComboBoxProps<T> {
    ref?: ForwardedRef<HTMLDivElement>
    /**
     * When `true` a checkmark is rendered next to the selected option.
     */
    showCheckmarkOnSelected?: boolean
}

/**
 * A combo box combines a text input with a listbox, allowing users to filter a
 * list of options to items matching a query.
 */
export function ComboBox<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>({
    children,
    items,
    ref,
    renderEmptyState,
    showCheckmarkOnSelected = true,
    ...props
}: ComboBoxProps<T>) {
    return (
        <RACComboBox<T>
            {...props}
            className={(renderProps) =>
                twMerge(
                    'group relative w-full grow',
                    typeof props.className === 'function'
                        ? props.className(renderProps)
                        : props.className
                )
            }
            ref={ref}
        >
            {(rp) => (
                <>
                    {typeof children === 'function' ? children(rp) : children}

                    <Popover
                        className='w-[calc(var(--trigger-width)+var(--spacing))]' // Account for the margin on the combobox button
                    >
                        <RACListBox<T>
                            className='max-h-[inherit] overflow-auto p-1 outline-0 [clip-path:inset(0_0_0_0_round_.25rem)]'
                            items={items}
                            renderEmptyState={renderEmptyState}
                        >
                            {(props) => (
                                <OptionRenderer
                                    {...props}
                                    showCheckmarkOnSelected={showCheckmarkOnSelected}
                                    type='listbox'
                                />
                            )}
                        </RACListBox>
                    </Popover>
                </>
            )}
        </RACComboBox>
    )
}
ComboBox.displayName = 'ComboBox'
