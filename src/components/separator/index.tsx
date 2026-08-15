import type { SeparatorProps as RACSeparatorProps } from 'react-aria-components'

import { Separator as RACSeparator } from 'react-aria-components'
import { tv } from 'tailwind-variants'

const separatorStyles = tv({
    base: 'border-default shrink-0 border-0',
    defaultVariants: {
        orientation: 'horizontal',
    },
    variants: {
        orientation: {
            horizontal: 'h-0 w-full border-t',
            // `self-stretch` takes the height from the flex row it divides.
            vertical: 'w-0 self-stretch border-l',
        },
    },
})

export interface SeparatorProps extends RACSeparatorProps {
    /** Which way the rule runs. Vertical rules need a flex parent for height. */
    orientation?: RACSeparatorProps['orientation']
}

/** A rule between two groups of content, announced as a separator. */
export function Separator({ className, orientation = 'horizontal', ...props }: SeparatorProps) {
    return (
        <RACSeparator
            {...props}
            className={separatorStyles({
                className,
                orientation,
            })}
            orientation={orientation}
        />
    )
}
Separator.displayName = 'Separator'
