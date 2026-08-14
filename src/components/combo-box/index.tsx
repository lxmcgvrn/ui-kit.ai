import type { ComponentProps, ForwardedRef } from 'react'
import type { ComboBoxProps as RACComboBoxProps } from 'react-aria-components'

import { LucideChevronsUpDown, LucideX } from 'lucide-react'
import { useContext } from 'react'
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

export interface ComboBoxButtonProps
    extends Omit<ComponentProps<typeof FieldButton>, 'children' | 'isDisabled' | 'onPress'> {}

/** Opens the ComboBox popover. `onPress` and `isDisabled` are set for you. */
export function ComboBoxButton(props: ComboBoxButtonProps) {
    return (
        <FieldButton {...props}>
            <LucideChevronsUpDown aria-hidden />
        </FieldButton>
    )
}
ComboBoxButton.displayName = 'ComboBoxButton'

export interface ComboBoxClearButtonProps
    extends Omit<
        ComponentProps<typeof FieldButton>,
        'children' | 'isDisabled' | 'onPress' | 'slot'
    > {}

/** Clears the ComboBox selection. Hidden while the ComboBox is empty. */
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

export interface ComboBoxFieldGroupProps extends ComponentProps<typeof FieldGroup> {}

/** Wraps the ComboBox input and its buttons; measured to size the popover. */
export function ComboBoxFieldGroup(props: ComboBoxFieldGroupProps) {
    return <FieldGroup {...props} />
}
ComboBoxFieldGroup.displayName = 'ComboBoxFieldGroup'

export interface ComboBoxInputProps extends ComponentProps<typeof Input> {
    ref?: ForwardedRef<HTMLInputElement>
}

/** The fields {@link ComboBoxInput} reads off the selected option's value. */
interface SelectedOptionValue {
    icon?: ComboBoxInputProps['icon']
    name?: string
}

/** Text input for a ComboBox; toggles the popover on click. */
export const ComboBoxInput = ({ ref, ...props }: ComboBoxInputProps) => {
    const state = useContext(RACComboBoxStateContext)

    const selected = state?.selectedItem?.value as SelectedOptionValue | undefined

    return (
        <Input
            {...props}
            defaultValue={selected?.name ?? props.defaultValue}
            icon={selected?.icon ?? props.icon}
            onClick={(e) => {
                state?.toggle(null, 'focus')
                props.onClick?.(e)
            }}
            placeholder={selected?.name ?? props.placeholder ?? ''}
            ref={ref}
        />
    )
}
ComboBoxInput.displayName = 'ComboBoxInput'

export interface ComboBoxProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>
    extends Pick<ComponentProps<typeof RACListBox>, 'renderEmptyState'>,
        RACComboBoxProps<T> {
    ref?: ForwardedRef<HTMLDivElement>

    /** When `true` a checkmark is rendered next to the selected option. */
    showCheckmarkOnSelected?: boolean
}

/** A text input plus listbox, letting users filter options by typing. */
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
