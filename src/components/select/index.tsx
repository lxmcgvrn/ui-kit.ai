import type { ForwardedRef } from 'react'
import type { SelectProps as AriaSelectProps, ButtonProps } from 'react-aria-components'

import { ChevronsUpDownIcon } from 'lucide-react'
import { useContext } from 'react'
import {
    Button as AriaButton,
    ListBox as AriaListBox,
    Select as AriaSelect,
    SelectValue as AriaSelectValue,
    SelectStateContext,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { OptionsSchema } from '../types/options'

import { OptionRenderer } from '../options'
import { Popover } from '../popover'
import { fieldVariants } from '../styles/field-variants'
import { renderSlot, type SlotNode } from '../types/slotted-node'

const selectButtonStyles = tv({
    base: [
        'flex items-center gap-1.5',
        'py-2 pr-2.5 pl-3',
        '[&:has([data-slot=slot-left])]:pl-2',
        '[&:has([data-slot=slot-right])]:pr-2',
        'text-sm',
        'w-full cursor-pointer text-start',
    ],
    extend: fieldVariants,
})

/**
 * Props accepted by {@link Select}. Everything `react-aria-components`'
 * `Select` accepts, plus this design system's presentational props.
 */
export interface SelectProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>
    extends AriaSelectProps<T> {
    /**
     * The options rendered in the select's listbox.
     */
    items?: Iterable<T>
    ref?: ForwardedRef<HTMLDivElement>
    /**
     * When `true` a checkmark is rendered next to the selected option.
     */
    showCheckmarkOnSelected?: boolean
}

/**
 * A select displays a collapsible list of options and allows a user to select one of them.
 */
export function Select<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>({
    children = SelectButton,
    items,
    ref,
    showCheckmarkOnSelected = true,
    ...props
}: SelectProps<T>) {
    return (
        <AriaSelect
            {...props}
            className={(rp) =>
                twMerge(
                    'group invalid:error relative w-full !outline-0',
                    typeof props.className === 'function' ? props.className(rp) : props.className
                )
            }
            ref={ref}
        >
            {(rp) => {
                return (
                    <>
                        {typeof children === 'function' ? children(rp) : children}
                        <Popover className='min-w-(--trigger-width)'>
                            <AriaListBox<T>
                                className='max-h-[inherit] overflow-auto p-1 outline-none [clip-path:inset(0_0_0_0_round_.25rem)]'
                                items={items}
                            >
                                {(props) => (
                                    <OptionRenderer
                                        {...props}
                                        showCheckmarkOnSelected={showCheckmarkOnSelected}
                                        type='listbox'
                                    />
                                )}
                            </AriaListBox>
                        </Popover>
                    </>
                )
            }}
        </AriaSelect>
    )
}
Select.displayName = 'Select'

/**
 * Props accepted by {@link SelectButton}. Everything `react-aria-components`'
 * `Button` accepts, plus this design system's presentational props.
 */
export interface SelectButtonProps extends ButtonProps {
    /**
     * When `true` the button is rendered without its border and background.
     */
    isBorderless?: boolean
    /**
     * A decorative node (e.g. an icon) to render on the left side of the
     * Button. When a node is passed, the padding on the corresponding side is
     * slightly reduced to maintain visual balance.
     */
    slotLeft?: SlotNode
    /**
     * A decorative node (e.g. an icon) to render on the right side of the
     * Button. When a node is passed, the padding on the corresponding side is
     * slightly reduced to maintain visual balance.
     */
    slotRight?: SlotNode
}

/**
 * A SelectButton triggers the Popover for a Select. It usually contains the
 * selected item's text value.
 */
export function SelectButton({
    isBorderless,
    slotLeft,
    slotRight = <ChevronsUpDownIcon aria-hidden />,
    ...props
}: SelectButtonProps) {
    const state = useContext(SelectStateContext)
    const selectedItemIcon: null | SlotNode = state?.selectedItem?.props.icon

    return (
        <AriaButton
            {...props}
            className={(rp) =>
                twMerge(
                    selectButtonStyles({
                        isBorderless,
                    }),
                    typeof props.className === 'function' ? props.className(rp) : props.className
                )
            }
            data-variant-borderless={isBorderless}
        >
            {renderSlot(selectedItemIcon ?? slotLeft, {
                className: 'text-placeholder [&:is(svg)]:size-3 [&:is(svg)]:shrink-0',
                'data-slot': 'slot-left',
            })}
            <AriaSelectValue
                className={twMerge([
                    'inline-flex flex-1 items-center gap-2',
                    'truncate',
                    'placeholder-shown:text-placeholder',
                ])}
            >
                {({ selectedText }) => selectedText}
            </AriaSelectValue>
            {renderSlot(slotRight, {
                className: 'text-placeholder [&:is(svg)]:size-3 [&:is(svg)]:shrink-0',
                'data-slot': 'slot-right',
            })}
        </AriaButton>
    )
}
SelectButton.displayName = 'SelectButton'
