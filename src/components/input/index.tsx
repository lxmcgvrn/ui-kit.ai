import { type ComponentProps, type ForwardedRef, type ReactNode } from 'react'
import { composeRenderProps, Input as RACInput } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { fieldVariants } from '../styles/field-variants'

const inputStyles = tv({
    base: ['px-3', 'text-sm', 'w-full', 'text-start align-middle'],
    extend: fieldVariants,
    variants: {
        hasIcon: {
            false: '',
            true: 'pl-(--height-ui-element)',
        },
    },
})

export interface InputProps extends ComponentProps<typeof RACInput> {
    /** A decorative node (e.g. an icon) rendered inside the start of the input. */
    icon?: ReactNode

    /** When `true`, Input renders without its border and background. */
    isBorderless?: boolean
    ref?: ForwardedRef<HTMLInputElement>
}

/** The input primitive used to compose field components. */
export const Input = ({ icon, isBorderless, ref, ...props }: InputProps) => {
    return (
        <div className='relative inline-flex w-full items-center'>
            {icon != null ? (
                <div
                    className={twMerge(
                        'h-ui-element w-(--height-ui-element)',
                        'text-placeholder',
                        'absolute inset-x-0 top-0',
                        'flex items-center justify-center',
                        'pointer-events-none',
                        '[&_svg]:size-3 [&_svg]:shrink-0'
                    )}
                >
                    {icon}
                </div>
            ) : null}
            <RACInput
                {...props}
                className={composeRenderProps(props.className, (className, rp) =>
                    twMerge(
                        inputStyles({
                            ...rp,
                            hasIcon: Boolean(icon),
                            isBorderless,
                        }),
                        className
                    )
                )}
                data-variant-borderless={isBorderless}
                ref={ref}
            />
        </div>
    )
}
Input.displayName = 'Input'
