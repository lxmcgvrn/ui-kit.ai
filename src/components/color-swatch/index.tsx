import type { ColorSwatchProps as RACColorSwatchProps } from 'react-aria-components'

import { composeRenderProps, ColorSwatch as RACColorSwatch } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const colorSwatchStyles = tv({
    base: ['inline-block', 'size-8', 'rounded', 'border-default border', 'shadow-sm'],
})

export interface ColorSwatchProps extends RACColorSwatchProps {}

/** Displays a color as a swatch. */
export function ColorSwatch(props: ColorSwatchProps) {
    return (
        <RACColorSwatch
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge(colorSwatchStyles(), className)
            )}
        />
    )
}
ColorSwatch.displayName = 'ColorSwatch'
