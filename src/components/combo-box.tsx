import type { ComponentProps, ForwardedRef, ReactNode } from 'react'
import type { ButtonProps as RACButtonProps, ComboBoxProps as RACComboBoxProps } from 'react-aria-components'

import { LucideChevronsUpDown } from 'lucide-react'
import { useContext, useMemo } from 'react'
import {
  composeRenderProps,
  ButtonContext as RACButtonContext,
  ComboBox as RACComboBox,
  ComboBoxStateContext as RACComboBoxStateContext,
  DEFAULT_SLOT as RACDEFAULT_SLOT,
  ListBox as RACListBox,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import type { OptionsSchema } from './types/options'

import { FieldButton } from './field-button'
import { FieldGroup } from './field-group'
import { Input } from './input'
import { OptionRenderer } from './options'
import { Popover } from './popover'

export interface ComboBoxButtonProps extends Omit<ComponentProps<typeof FieldButton>, 'children' | 'isDisabled' | 'onPress'> {}

/** Opens the ComboBox popover. ComboBox sets `onPress` and `isDisabled` for you. */
export function ComboBoxButton(props: ComboBoxButtonProps) {
  return (
    <FieldButton {...props}>
      <LucideChevronsUpDown aria-hidden />
    </FieldButton>
  )
}
ComboBoxButton.displayName = 'ComboBoxButton'

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

  /** When `true`, ComboBox renders a checkmark next to the selected option. */
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
      className={composeRenderProps(props.className, (className) => twMerge('group relative w-full grow', className))}
      ref={ref}
    >
      {composeRenderProps(children, (children) => (
        <>
          <ComboBoxButtons>{children}</ComboBoxButtons>

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
      ))}
    </RACComboBox>
  )
}
ComboBox.displayName = 'ComboBox'

/** Hands the composed buttons their slot props; the trigger keeps RAC's wiring. */
function ComboBoxButtons({ children }: { children: ReactNode }) {
  return <RACButtonContext.Provider value={useComboBoxButtons()}>{children}</RACButtonContext.Provider>
}
ComboBoxButtons.displayName = 'ComboBoxButtons'

/** Slot props for the `FieldButtonClear` a caller composes in. */
function useComboBoxButtons() {
  const state = useContext(RACComboBoxStateContext)
  const trigger = useContext(RACButtonContext)
  const isEmpty = state == null || state.inputValue === ''

  return useMemo(() => {
    /* RAC hands the trigger its props through ButtonContext plain, never as slots. */
    const triggerProps: RACButtonProps = trigger != null && !('slots' in trigger) ? (trigger as RACButtonProps) : {}

    return {
      slots: {
        clear: {
          'data-empty': isEmpty || undefined,
          isDisabled: isEmpty || triggerProps.isDisabled === true,
          onPress: () => {
            state?.setInputValue('')
            state?.setSelectedKey(null)
          },
        },
        [RACDEFAULT_SLOT]: triggerProps,
      },
    }
  }, [isEmpty, state, trigger])
}
