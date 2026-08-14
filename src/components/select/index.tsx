import type { ForwardedRef } from 'react'
import type {
    ButtonProps as RACButtonProps,
    SelectProps as RACSelectProps,
} from 'react-aria-components'

import { LucideChevronsUpDown } from 'lucide-react'
import { useContext } from 'react'
import {
    Button as RACButton,
    ListBox as RACListBox,
    Select as RACSelect,
    SelectStateContext as RACSelectStateContext,
    SelectValue as RACSelectValue,
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

export interface SelectProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>
    extends RACSelectProps<T> {
    /** The options rendered in the select's listbox. */
    items?: Iterable<T>
    ref?: ForwardedRef<HTMLDivElement>

    /** When `true` a checkmark is rendered next to the selected option. */
    showCheckmarkOnSelected?: boolean
}

/** Displays a collapsible list of options, of which the user picks one. */
export function Select<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>({
    children = SelectButton,
    items,
    ref,
    showCheckmarkOnSelected = true,
    ...props
}: SelectProps<T>) {
    return (
        <RACSelect
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
                            <RACListBox<T>
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
                            </RACListBox>
                        </Popover>
                    </>
                )
            }}
        </RACSelect>
    )
}
Select.displayName = 'Select'

export interface SelectButtonProps extends RACButtonProps {
    /** When `true` the button is rendered without its border and background. */
    isBorderless?: boolean

    /** Decorative node (e.g. an icon) rendered on the left. */
    slotLeft?: SlotNode

    /** Decorative node (e.g. an icon) rendered on the right. */
    slotRight?: SlotNode
}

/** Trigger for a {@link Select}; shows the selected item's text. */
export function SelectButton({
    isBorderless,
    slotLeft,
    slotRight = <LucideChevronsUpDown aria-hidden />,
    ...props
}: SelectButtonProps) {
    const state = useContext(RACSelectStateContext)
    const selectedItemProps = state?.selectedItem?.props as undefined | { icon?: SlotNode }

    return (
        <RACButton
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
            {renderSlot(selectedItemProps?.icon ?? slotLeft, {
                className: 'text-placeholder [&:is(svg)]:size-3 [&:is(svg)]:shrink-0',
                'data-slot': 'slot-left',
            })}
            <RACSelectValue
                className={twMerge([
                    'inline-flex flex-1 items-center gap-2',
                    'truncate',
                    'placeholder-shown:text-placeholder',
                ])}
            >
                {({ selectedText }) => selectedText}
            </RACSelectValue>
            {renderSlot(slotRight, {
                className: 'text-placeholder [&:is(svg)]:size-3 [&:is(svg)]:shrink-0',
                'data-slot': 'slot-right',
            })}
        </RACButton>
    )
}
SelectButton.displayName = 'SelectButton'
