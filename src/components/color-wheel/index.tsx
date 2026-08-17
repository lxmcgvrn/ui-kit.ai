import type { ReactNode } from 'react'
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

/** Fraction of the inner diameter the child slot fills, leaving it breathing room. */
const CHILD_SLOT_RATIO = 2 / 3

const wheelStyles = tv({
    base: ['disabled:opacity-50'],
})

export interface ColorWheelProps
    extends Omit<RACColorWheelProps, 'children' | 'innerRadius' | 'outerRadius'> {
    /** Rendered centred inside the ring, sized to fit — e.g. a `ColorArea`. */
    children?: ReactNode

    /** Radius of the inner edge of the ring, in pixels. */
    innerRadius?: number

    /** Radius of the outer edge of the ring, in pixels. */
    outerRadius?: number
}

/** Adjusts the hue of a color on a circular track. */
export function ColorWheel({
    children,
    innerRadius = DEFAULT_INNER_RADIUS,
    outerRadius = DEFAULT_OUTER_RADIUS,
    ...props
}: ColorWheelProps) {
    const childSlotSize = innerRadius * 2 * CHILD_SLOT_RATIO

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

            {children == null ? null : (
                /* React Aria sets inline `position` on children, so a wrapper carries it. */
                <div
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                    style={{ height: childSlotSize, width: childSlotSize }}
                >
                    {children}
                </div>
            )}
        </RACColorWheel>
    )
}
ColorWheel.displayName = 'ColorWheel'
