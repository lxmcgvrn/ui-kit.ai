import type { ColorSwatchProps as RACColorSwatchProps } from 'react-aria-components'

import { composeRenderProps, ColorSwatch as RACColorSwatch } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { checkerboard } from './styles/checkerboard'

/** Fine enough to read at the smallest swatch the fields use. */
const CHECK_SIZE = '8px'

const colorSwatchStyles = tv({
  base: ['inline-block', 'size-8', 'rounded-sm', 'border-default border', 'shadow-sm'],
})

export interface ColorSwatchProps extends RACColorSwatchProps {}

/** Displays a color as a swatch. Translucent colors show a board behind them. */
export function ColorSwatch(props: ColorSwatchProps) {
  return (
    <RACColorSwatch
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge(colorSwatchStyles(), className))}
      style={({ color, defaultStyle }) => {
        const css = color.toString('css')

        return {
          ...defaultStyle,
          backgroundImage: `linear-gradient(${css}, ${css}), ${checkerboard(CHECK_SIZE)}`,
        }
      }}
    />
  )
}
ColorSwatch.displayName = 'ColorSwatch'
