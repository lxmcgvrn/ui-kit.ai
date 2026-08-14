import type { ColorSliderProps as RACColorSliderProps } from 'react-aria-components'

import {
    composeRenderProps,
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

export interface ColorSliderProps extends RACColorSliderProps {
    /** Rendered above the track — typically a `Label` or `SliderOutput`. */
    children?: RACColorSliderProps['children']
}

/** Selects a single color channel with a slider. */
export function ColorSlider(props: ColorSliderProps) {
    return (
        <RACColorSlider
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge(sliderStyles(), className)
            )}
        >
            {(renderProps) => (
                <>
                    {typeof props.children === 'function'
                        ? props.children(renderProps)
                        : props.children}
                    <RACSliderTrack
                        className={trackStyles()}
                        style={({ defaultStyle }) => ({
                            background: `${String(defaultStyle.background)},
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
