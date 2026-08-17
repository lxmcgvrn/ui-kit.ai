import type { ColorSliderProps as RACColorSliderProps } from 'react-aria-components'

import {
  composeRenderProps,
  ColorSlider as RACColorSlider,
  ColorThumb as RACColorThumb,
  SliderTrack as RACSliderTrack,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { checkerboard } from './styles/checkerboard'
import { colorThumbStyles } from './styles/color-thumb'

/** Coarse enough to stay quiet under the track's own gradient. */
const CHECK_SIZE = '16px'

const sliderStyles = tv({
  base: ['w-full'],
})

const trackStyles = tv({
  base: ['relative', 'w-full', 'h-6', 'rounded-sm'],
})

export interface ColorSliderProps extends RACColorSliderProps {
  /** Rendered above the track — typically a `Label` or `SliderOutput`. */
  children?: RACColorSliderProps['children']
}

/** Selects a single color channel with a slider. */
export function ColorSlider(props: ColorSliderProps) {
  return (
    <RACColorSlider
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge(sliderStyles(), className))}
    >
      {(renderProps) => (
        <>
          {typeof props.children === 'function' ? props.children(renderProps) : props.children}
          <RACSliderTrack
            className={trackStyles()}
            style={({ defaultStyle }) => ({
              background: `${String(defaultStyle.background)}, ${checkerboard(CHECK_SIZE)}`,
            })}
          >
            <RACColorThumb className={colorThumbStyles({ className: 'inset-y-1/2' })} />
          </RACSliderTrack>
        </>
      )}
    </RACColorSlider>
  )
}
ColorSlider.displayName = 'ColorSlider'
