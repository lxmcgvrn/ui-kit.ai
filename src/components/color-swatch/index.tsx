import type { ColorSwatchProps as RACColorSwatchProps } from 'react-aria-components'

import { ColorSwatch as RACColorSwatch } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const colorSwatchStyles = tv({
    base: ['inline-block', 'size-8', 'rounded', 'border-default border', 'shadow-sm'],
})

/**
 * Props accepted by {@link ColorSwatch}. Everything `react-aria-components`'
 * `ColorSwatch` accepts.
 */
export interface ColorSwatchProps extends RACColorSwatchProps {}

/**
 * A component for displaying a color swatch.
 * Provides visual representation of a color with proper accessibility semantics.
 */
export function ColorSwatch(props: ColorSwatchProps) {
    return (
        <RACColorSwatch
            {...props}
            className={(renderProps) =>
                twMerge(
                    colorSwatchStyles(),
                    typeof props.className === 'function'
                        ? props.className(renderProps)
                        : props.className
                )
            }
        />
    )
}
ColorSwatch.displayName = 'ColorSwatch'
