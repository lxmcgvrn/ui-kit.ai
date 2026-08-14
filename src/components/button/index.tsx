import type { ForwardedRef } from 'react'
import type {
    ButtonProps as RACButtonProps,
    LinkProps as RACLinkProps,
} from 'react-aria-components'

import { composeRenderProps, Button as RACButton, Link as RACLink } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { Intent } from '../types/intent'

import { Loader } from '../loader'
import { renderSlot, type SlotNode } from '../types/slotted-node'

const buttonStyle = tv({
    base: [
        'rounded-sm',
        'border',
        'inline-flex shrink-0 items-center justify-center gap-1.5',
        'h-ui-element',
        'text-center text-sm font-medium',
        'cursor-pointer',
        'transition-colors',
        'px-4 py-2',
        '[&:has([data-slot=slot-left])]:pl-3',
        '[&:has([data-slot=slot-right])]:pr-3',
        '[&_svg]:size-3 [&_svg]:shrink-0',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
    ],
    defaultVariants: {
        variant: 'primary',
    },
    variants: {
        isIcon: {
            true: 'aspect-square w-(--height-ui-element) px-2 [&_svg]:mx-auto',
        },
        variant: {
            primary: [
                'text-accent',
                'shadow-xs',
                'border-field bg-primary',
                'hover:bg-primary-hover',
                'pressed:bg-primary',
            ],
            secondary: [
                'shadow-xs',
                'border-field text-lo-contrast bg-transparent',
                'hover:bg-tint',
                'pressed:bg-tint',
            ],
            tertiary: [
                'text-lo-contrast border-transparent bg-transparent',
                'hover:bg-tint',
                'pressed:bg-tint',
            ],
        },
    },
})

interface ButtonCommonProps {
    /** Convey semantic meaning with color. */
    intent?: Intent

    /** Styles the button red, to denote a destructive action. */
    isDestructive?: boolean

    /** Square, fixed-size button for an icon. Pass `aria-label` when there is no text. */
    isIcon?: boolean

    /** Decorative node (e.g. an icon) rendered on the left. */
    slotLeft?: SlotNode

    /** Decorative node (e.g. an icon) rendered on the right. */
    slotRight?: SlotNode

    /** Visual emphasis, highest first: `primary`, `secondary`, `tertiary`. */
    variant?: 'primary' | 'secondary' | 'tertiary'
}

type LinkButtonProps = ButtonCommonProps &
    RACLinkProps & {
        ref?: ForwardedRef<HTMLAnchorElement>
    }

const ButtonLoadingState = ({
    children,
    isPending,
}: {
    children: React.ReactNode
    isPending?: boolean
}) =>
    isPending === true ? (
        <div className='relative'>
            <div
                aria-hidden
                className='opacity-0'
            >
                {children}
            </div>
            <div className='absolute inset-0 flex items-center justify-center'>
                <Loader className='!size-4' />
            </div>
        </div>
    ) : (
        children
    )
ButtonLoadingState.displayName = 'ButtonLoadingState'

export interface ButtonProps extends ButtonCommonProps, RACButtonProps {
    ref?: ForwardedRef<HTMLButtonElement>
}

/** Performs an action on click, tap, or keypress. */
export function Button({
    intent,
    isDestructive,
    isIcon = false,
    isPending,
    ref,
    slotLeft,
    slotRight,
    variant = 'primary',
    ...props
}: ButtonProps) {
    return (
        <RACButton
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                twMerge(
                    buttonStyle({
                        ...renderProps,
                        isIcon,
                        variant,
                    }),
                    className,
                    intent
                )
            )}
            isPending={isPending}
            ref={ref}
        >
            {(renderProps) => (
                <ButtonLoadingState isPending={isPending}>
                    {renderSlot(slotLeft, {
                        'data-slot': 'slot-left',
                    })}

                    {typeof props.children === 'function'
                        ? props.children(renderProps)
                        : props.children}

                    {renderSlot(slotRight, {
                        'data-slot': 'slot-right',
                    })}
                </ButtonLoadingState>
            )}
        </RACButton>
    )
}
Button.displayName = 'Button'

/** An anchor wearing the {@link Button} styling. */
export const LinkButton = ({
    intent,
    isIcon,
    ref,
    slotLeft,
    slotRight,
    variant,
    ...props
}: LinkButtonProps) => {
    return (
        <RACLink
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                twMerge(
                    buttonStyle({
                        ...renderProps,
                        isIcon,
                        variant,
                    }),
                    className,
                    intent
                )
            )}
            ref={ref}
        >
            {(renderProps) => (
                <>
                    {renderSlot(slotLeft, {
                        'data-slot': 'slot-left',
                    })}

                    {typeof props.children === 'function'
                        ? props.children(renderProps)
                        : props.children}

                    {renderSlot(slotRight, {
                        'data-slot': 'slot-right',
                    })}
                </>
            )}
        </RACLink>
    )
}
LinkButton.displayName = 'LinkButton'
