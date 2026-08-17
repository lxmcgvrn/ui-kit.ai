import type { ForwardedRef } from 'react'
import type { ColorPickerProps as RACColorPickerProps } from 'react-aria-components'

import { ColorPicker as RACColorPicker } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const colorPickerStyles = tv({
    base: ['flex w-fit flex-col gap-3'],
})

export interface ColorPickerProps extends RACColorPickerProps {
    /** Classes for the element the children sit in. */
    className?: string

    ref?: ForwardedRef<HTMLDivElement>
}

/** Holds every color control inside it on one color. Compose the controls yourself. */
export function ColorPicker({ children, className, ref, ...props }: ColorPickerProps) {
    return (
        <RACColorPicker {...props}>
            {(renderProps) => (
                <div
                    className={twMerge(colorPickerStyles(), className)}
                    ref={ref}
                >
                    {typeof children === 'function' ? children(renderProps) : children}
                </div>
            )}
        </RACColorPicker>
    )
}
ColorPicker.displayName = 'ColorPicker'
