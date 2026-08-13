import type { ColorSliderProps as RACColorSliderProps } from 'react-aria-components'

import {
    ColorSlider as RACColorSlider,
    ColorThumb as RACColorThumb,
    SliderTrack as RACSliderTrack,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const sliderStyles = tv({
    base: ['w-full'],
})

const trackStyles = tv({
    base: ['relative', 'w-full', 'h-6', 'rounded'],
})

const thumbStyles = tv({
    base: ['size-6', 'inset-y-1/2', 'rounded-full', 'border-3 border-[#ffffff]', 'shadow-lg'],
})

/**
 * Props accepted by {@link ColorSlider}. Everything `react-aria-components`'
 * `ColorSlider` accepts.
 */
export interface ColorSliderProps extends RACColorSliderProps {
    /**
     * Rendered above the slider track — typically a `Label` and/or a
     * `SliderOutput`. The track and thumb are always rendered by the component
     * itself.
     */
    children?: RACColorSliderProps['children']
}

/**
 * A component for selecting a color using a slider.
 * Provides interactive color selection with proper accessibility semantics.
 */
export function ColorSlider(props: ColorSliderProps) {
    return (
        <RACColorSlider
            {...props}
            className={(renderProps) =>
                twMerge(
                    sliderStyles(),
                    typeof props.className === 'function'
                        ? props.className(renderProps)
                        : props.className
                )
            }
        >
            {(renderProps) => (
                <>
                    {typeof props.children === 'function'
                        ? props.children(renderProps)
                        : props.children}
                    <RACSliderTrack
                        className={trackStyles()}
                        style={({ defaultStyle }) => ({
                            background: `${defaultStyle.background},
      repeating-conic-gradient(var(--theme-default-bg-tint) 0% 25%, var(--theme-default-bg-base) 0% 50%) 50% / 16px 16px`,
                        })}
                    >
                        <RACColorThumb className={thumbStyles()} />
                    </RACSliderTrack>
                </>
            )}
        </RACColorSlider>
    )
}
ColorSlider.displayName = 'ColorSlider'
