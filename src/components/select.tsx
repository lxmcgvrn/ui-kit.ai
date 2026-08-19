import type { ForwardedRef, ReactNode } from 'react'
import type {
  ButtonProps as RACButtonProps,
  SelectProps as RACSelectProps,
  SelectRenderProps as RACSelectRenderProps,
} from 'react-aria-components'

import { LucideChevronsUpDown } from 'lucide-react'
import { useContext, useMemo } from 'react'
import {
  composeRenderProps,
  Button as RACButton,
  ButtonContext as RACButtonContext,
  DEFAULT_SLOT as RACDEFAULT_SLOT,
  ListBox as RACListBox,
  Select as RACSelect,
  SelectStateContext as RACSelectStateContext,
  SelectValue as RACSelectValue,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { OptionsSchema } from './types/options'

import { OptionRenderer } from './options'
import { Popover } from './popover'
import { fieldVariants } from './styles/field-variants'
import { renderSlot, type SlotNode } from './types/slotted-node'

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

export interface SelectProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>> extends RACSelectProps<T> {
  /** The options rendered in the select's listbox. */
  items?: Iterable<T>
  ref?: ForwardedRef<HTMLDivElement>

  /** When `true`, Select renders a checkmark next to the selected option. */
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
      className={composeRenderProps(props.className, (className) => twMerge('group invalid:error relative w-full', className))}
      ref={ref}
    >
      {composeRenderProps<ReactNode, RACSelectRenderProps & { defaultChildren: ReactNode }, ReactNode>(children, (children) => (
        <>
          <SelectButtons>{children}</SelectButtons>
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
      ))}
    </RACSelect>
  )
}
Select.displayName = 'Select'

export interface SelectButtonProps extends RACButtonProps {
  /** When `true`, SelectButton renders without its border and background. */
  isBorderless?: boolean

  /** Decorative node (e.g. an icon) rendered on the left. */
  slotLeft?: SlotNode

  /** Decorative node (e.g. an icon) rendered on the right. */
  slotRight?: SlotNode
}

/** Trigger for a {@link Select}; shows the selected item's text. */
export function SelectButton({ isBorderless, slotLeft, slotRight = <LucideChevronsUpDown aria-hidden />, ...props }: SelectButtonProps) {
  const state = useContext(RACSelectStateContext)
  const selectedItemProps = state?.selectedItem?.props as undefined | { icon?: SlotNode }

  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className) =>
        twMerge(
          selectButtonStyles({
            isBorderless,
          }),
          className
        )
      )}
      data-variant-borderless={isBorderless}
    >
      {renderSlot(selectedItemProps?.icon ?? slotLeft, {
        className: 'text-placeholder [&:is(svg)]:size-3 [&:is(svg)]:shrink-0',
        'data-slot': 'slot-left',
      })}
      <RACSelectValue className={twMerge(['inline-flex flex-1 items-center gap-2', 'truncate', 'placeholder-shown:text-placeholder'])}>
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

/** Hands the composed buttons their slot props; the trigger keeps RAC's wiring. */
function SelectButtons({ children }: { children: ReactNode }) {
  return <RACButtonContext.Provider value={useSelectButtons()}>{children}</RACButtonContext.Provider>
}
SelectButtons.displayName = 'SelectButtons'

/** Slot props for the `FieldButtonClear` a caller composes in. */
function useSelectButtons() {
  const state = useContext(RACSelectStateContext)
  const trigger = useContext(RACButtonContext)
  const isEmpty = state?.selectedKey == null

  return useMemo(() => {
    /* RAC hands the trigger its props through ButtonContext plain, never as slots. */
    const triggerProps: RACButtonProps = trigger != null && !('slots' in trigger) ? (trigger as RACButtonProps) : {}

    return {
      slots: {
        clear: {
          'data-empty': isEmpty || undefined,
          isDisabled: isEmpty || triggerProps.isDisabled === true,
          onPress: () => state?.setSelectedKey(null),
        },
        [RACDEFAULT_SLOT]: triggerProps,
      },
    }
  }, [isEmpty, state, trigger])
}
