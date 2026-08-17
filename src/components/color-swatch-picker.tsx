import type {
  ColorSwatchPickerItemProps as RACColorSwatchPickerItemProps,
  ColorSwatchPickerProps as RACColorSwatchPickerProps,
} from 'react-aria-components'

import {
  composeRenderProps,
  ColorSwatchPicker as RACColorSwatchPicker,
  ColorSwatchPickerItem as RACColorSwatchPickerItem,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { ColorSwatch } from './color-swatch'

const pickerStyles = tv({
  base: ['flex gap-2', 'outline-0'],
  variants: {
    layout: {
      grid: 'flex-row flex-wrap items-center',
      stack: 'flex-col items-start',
    },
  },
})

const itemStyles = tv({
  base: [
    'rounded-sm',
    'cursor-pointer',
    'outline-offset-2 outline-(--theme-default-bg-primary)',
    'selected:outline-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'forced-colors:selected:outline-[Highlight]',
  ],
})

export interface ColorSwatchPickerProps extends RACColorSwatchPickerProps {}

/** A set of color swatches to choose one color from. */
export function ColorSwatchPicker({ layout = 'grid', ...props }: ColorSwatchPickerProps) {
  return (
    <RACColorSwatchPicker
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge(pickerStyles({ layout }), className))}
      layout={layout}
    />
  )
}
ColorSwatchPicker.displayName = 'ColorSwatchPicker'

export interface ColorSwatchPickerItemProps extends RACColorSwatchPickerItemProps {
  /** Rendered inside the item. Defaults to a `ColorSwatch` of the item's own color. */
  children?: RACColorSwatchPickerItemProps['children']
}

/** A single selectable swatch inside a {@link ColorSwatchPicker}. */
export function ColorSwatchPickerItem({ children = <ColorSwatch />, ...props }: ColorSwatchPickerItemProps) {
  return (
    <RACColorSwatchPickerItem
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge(itemStyles(), className))}
    >
      {children}
    </RACColorSwatchPickerItem>
  )
}
ColorSwatchPickerItem.displayName = 'ColorSwatchPickerItem'
