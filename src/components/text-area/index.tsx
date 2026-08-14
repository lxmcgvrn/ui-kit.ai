import { type ComponentProps, type ForwardedRef } from 'react'
import { TextArea as RACTextArea } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { fieldVariants } from '../styles/field-variants'

const textAreaStyles = tv({
    base: [
        'px-3 py-1.5',
        'text-sm',
        'w-full',
        'text-start align-middle',
        'min-h-24',
        // Users can resize vertically, but the width is fixed by the field.
        'resize-y',
    ],
    extend: fieldVariants,
})

export interface TextAreaProps extends ComponentProps<typeof RACTextArea> {
    /** When `true` the text area is rendered without its border and background. */
    isBorderless?: boolean
    ref?: ForwardedRef<HTMLTextAreaElement>
}

/** The multi-line input primitive used to compose field components. */
export const TextArea = ({ isBorderless, ref, ...props }: TextAreaProps) => {
    return (
        <div className='relative inline-flex w-full items-center'>
            <RACTextArea
                {...props}
                className={(rp) =>
                    twMerge(
                        textAreaStyles({
                            ...rp,
                            isBorderless,
                        }),
                        typeof props.className === 'function'
                            ? props.className(rp)
                            : props.className
                    )
                }
                data-variant-borderless={isBorderless}
                ref={ref}
            />
        </div>
    )
}
TextArea.displayName = 'TextArea'
