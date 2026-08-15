import type { ColorAreaProps as RACColorAreaProps } from 'react-aria-components'

import {
    composeRenderProps,
    ColorArea as RACColorArea,
    ColorThumb as RACColorThumb,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { colorThumbStyles } from '../styles/color-thumb'

const colorAreaStyles = tv({
    base: ['size-48', 'rounded-sm', 'border-default border', 'disabled:opacity-50'],
})

export interface ColorAreaProps extends Omit<RACColorAreaProps, 'children'> {}

/** Adjusts two channels of a color at once, on a two-dimensional gradient. */
export function ColorArea(props: ColorAreaProps) {
    return (
        <RACColorArea
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge(colorAreaStyles(), className)
            )}
        >
            <RACColorThumb className={colorThumbStyles()} />
        </RACColorArea>
    )
}
ColorArea.displayName = 'ColorArea'
