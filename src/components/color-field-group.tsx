import type { ComponentProps, ForwardedRef, ReactNode } from 'react'
import type {
  Color as RACColor,
  ColorFieldProps as RACColorFieldProps,
  ColorPickerProps as RACColorPickerProps,
} from 'react-aria-components'

import { LucidePipette, LucideX } from 'lucide-react'
import { useContext } from 'react'
import {
  composeRenderProps,
  ColorField as RACColorField,
  ColorFieldContext as RACColorFieldContext,
  ColorPicker as RACColorPicker,
  ColorPickerStateContext as RACColorPickerStateContext,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { DialogTrigger } from './dialog'
import { FieldButton } from './field-button'
import { Popover, PopoverDialog } from './popover'

/** Room for the areas and sliders a color popover holds, at their usual sizes. */
const POPOVER_WIDTH = 'w-72'

export interface ColorFieldGroupClearButtonProps extends Omit<ComponentProps<typeof FieldButton>, 'children'> {}

export interface ColorFieldGroupPickerButtonProps extends Omit<ComponentProps<typeof FieldButton>, 'children'> {
  /** The popover's body: color controls, which read the field's color themselves. */
  children: ReactNode
}

export interface ColorFieldGroupProps
  extends Omit<RACColorFieldProps, 'channel' | 'colorSpace' | 'defaultValue' | 'onChange' | 'value'>,
    Pick<RACColorPickerProps, 'defaultValue' | 'onChange' | 'value'> {
  ref?: ForwardedRef<HTMLDivElement>
}

/** One color, framed: a swatch, its hex, and whatever else edits it — prop-less. */
export function ColorFieldGroup({ defaultValue, onChange, value, ...props }: ColorFieldGroupProps) {
  /* Every child reads and writes this one color, so none of them takes a value. */
  return (
    <RACColorPicker
      defaultValue={defaultValue}
      onChange={onChange}
      value={value}
    >
      <ColorFieldGroupHex {...props} />
    </RACColorPicker>
  )
}
ColorFieldGroup.displayName = 'ColorFieldGroup'

/** A `FieldButton` that hands the color back. Give it the `onPress` to do that. */
export function ColorFieldGroupClearButton(props: ColorFieldGroupClearButtonProps) {
  return (
    <FieldButton
      aria-label='Clear'
      {...props}
    >
      <LucideX aria-hidden />
    </FieldButton>
  )
}
ColorFieldGroupClearButton.displayName = 'ColorFieldGroupClearButton'

/** A `FieldButton` that opens its children in a popover. Opening picks nothing. */
export function ColorFieldGroupPickerButton({ children, ...props }: ColorFieldGroupPickerButtonProps) {
  return (
    <DialogTrigger>
      <FieldButton
        aria-label='Pick a color'
        {...props}
      >
        <LucidePipette aria-hidden />
      </FieldButton>

      <Popover>
        <PopoverDialog className={POPOVER_WIDTH}>{children}</PopoverDialog>
      </Popover>
    </DialogTrigger>
  )
}
ColorFieldGroupPickerButton.displayName = 'ColorFieldGroupPickerButton'

/** The hex field itself, aimed at the color the group holds. */
function ColorFieldGroupHex({ children, ref, ...props }: Omit<ColorFieldGroupProps, 'defaultValue' | 'onChange' | 'value'>) {
  const state = useContext(RACColorPickerStateContext)

  if (state == null) return null

  const onPick = (picked: null | RACColor) => {
    state.setColor(picked)
  }

  /* A hex carries no alpha, so the opacity the color already had rides along. */
  const onCommit = (committed: null | RACColor) => {
    if (committed == null) return

    onPick(committed.withChannelValue('alpha', state.color.getChannelValue('alpha')))
  }

  return (
    <RACColorFieldContext.Provider value={{ onChange: onCommit, value: state.color }}>
      <RACColorField
        {...props}
        className={composeRenderProps(props.className, (className) => twMerge('group invalid:error relative w-full', className))}
        ref={ref}
      >
        {/* Fields among the children — an opacity one, say — aim at the color itself. */}
        {composeRenderProps(children, (children) => (
          <RACColorFieldContext.Provider value={{ onChange: onPick, value: state.color }}>{children}</RACColorFieldContext.Provider>
        ))}
      </RACColorField>
    </RACColorFieldContext.Provider>
  )
}
ColorFieldGroupHex.displayName = 'ColorFieldGroupHex'
