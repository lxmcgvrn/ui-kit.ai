import type { ColorWheelProps as RACColorWheelProps } from 'react-aria-components'

import {
    composeRenderProps,
    ColorThumb as RACColorThumb,
    ColorWheel as RACColorWheel,
    ColorWheelTrack as RACColorWheelTrack,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { colorThumbStyles } from '../styles/color-thumb'

/** Leaves room for a color area inside the ring at the default size. */
const DEFAULT_OUTER_RADIUS = 96
const DEFAULT_INNER_RADIUS = 72

const wheelStyles = tv({
    base: ['disabled:opacity-50'],
})

export interface ColorWheelProps
    extends Omit<RACColorWheelProps, 'children' | 'innerRadius' | 'outerRadius'> {
    /** Radius of the inner edge of the ring, in pixels. */
    innerRadius?: number

    /** Radius of the outer edge of the ring, in pixels. */
    outerRadius?: number
}

/** Adjusts the hue of a color on a circular track. */
export function ColorWheel({
    innerRadius = DEFAULT_INNER_RADIUS,
    outerRadius = DEFAULT_OUTER_RADIUS,
    ...props
}: ColorWheelProps) {
    return (
        <RACColorWheel
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge(wheelStyles(), className)
            )}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
        >
            {/* The ring's gradient and clip path come from react-aria. */}
            <RACColorWheelTrack />
            <RACColorThumb className={colorThumbStyles()} />
        </RACColorWheel>
    )
}
ColorWheel.displayName = 'ColorWheel'
