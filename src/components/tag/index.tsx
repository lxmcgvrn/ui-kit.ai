import type {
    ButtonProps as RACButtonProps,
    LinkProps as RACLinkProps,
} from 'react-aria-components'

import { type ForwardedRef, type HTMLProps } from 'react'
import { composeRenderProps, Button as RACButton, Link as RACLink } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { Intent } from '../types/intent'

import { renderSlot, Slot, type SlotNode } from '../types/slotted-node'

interface TagCommonProps {
    /** Convey semantic meaning with color. */
    intent?: Intent

    /** Adds an optional dashed border to the tag. */
    isDashed?: boolean

    /** Decorative node (e.g. an icon) rendered on the left. */
    slotLeft?: SlotNode

    /** Decorative node (e.g. an icon) rendered on the right. */
    slotRight?: SlotNode

    /** The visual appearance of the tag. */
    variant?: Variant
}

type Variant = 'default' | 'solid'

const tagStyles = tv({
    base: [
        'h-6 min-w-6',
        'text-center text-sm font-medium',
        'inline-flex shrink-0 items-center justify-center gap-1.5',
        'rounded-full border',
        '[&_svg]:size-3 [&_svg]:shrink-0',
        // padding
        'px-3 py-1.5',
        '[&:has([data-slot=slot-left])]:pl-1.5',
        '[&:has([data-slot=slot-right])]:pr-1.5',
        // interactivity
        '[&:is(a,button)]:hover:bg-[--bg-hover]',
        '[&:is(a,button)]:pressed:bg-[--bg-pressed]',
    ],
    defaultVariants: {
        isDashed: false,
        variant: 'default',
    },
    variants: {
        isDashed: {
            false: 'border-solid',
            true: 'border-dashed',
        },
        variant: {
            default: [
                'bg-tint/80 border-field text-lo-contrast',
                'hover:bg-tint',
                'pressed:bg-tint',
            ],
            solid: [
                'bg-primary border-field text-accent',
                'hover:bg-primary-hover hover:border:accent-light',
                'pressed:accent-dark pressed:border-accent-dark',
            ],
        },
    },
})

export interface TagProps extends HTMLProps<HTMLDivElement>, TagCommonProps {
    ref?: ForwardedRef<HTMLDivElement>
}

/** Displays a short snippet of information, often in a group of tags. */
export function Tag({
    children,
    className,
    intent,
    isDashed,
    ref,
    slotLeft,
    slotRight,
    variant,
    ...props
}: TagProps) {
    return (
        <div
            {...props}
            className={twMerge(
                tagStyles({
                    isDashed,
                    variant,
                }),
                className,
                intent
            )}
            ref={ref}
        >
            {renderSlot(slotLeft, {
                'data-slot': Slot.LEFT,
            })}
            {children}

            {renderSlot(slotRight, {
                'data-slot': Slot.RIGHT,
            })}
        </div>
    )
}
Tag.displayName = 'Tag'

export interface TagButtonProps extends RACButtonProps, TagCommonProps {
    ref?: ForwardedRef<HTMLButtonElement>
}

/** A Tag that behaves as a button. */
export function TagButton({
    children,
    className,
    intent,
    isDashed,
    ref,
    slotLeft,
    slotRight,
    variant,
    ...props
}: TagButtonProps) {
    return (
        <RACButton
            {...props}
            className={(rp) =>
                twMerge(
                    tagStyles({
                        isDashed,
                        variant,
                    }),
                    intent,
                    typeof className === 'function' ? className(rp) : className
                )
            }
            ref={ref}
        >
            {composeRenderProps(children, (children) => (
                <>
                    {renderSlot(slotLeft, {
                        'data-slot': Slot.LEFT,
                    })}
                    {children}

                    {renderSlot(slotRight, {
                        'data-slot': Slot.RIGHT,
                    })}
                </>
            ))}
        </RACButton>
    )
}
TagButton.displayName = 'TagButton'

export interface TagLinkProps extends RACLinkProps, TagCommonProps {
    ref?: ForwardedRef<HTMLAnchorElement>
}

/** A Tag that behaves as a link. */
export const TagLink = ({
    children,
    className,
    intent,
    isDashed,
    ref,
    slotLeft,
    slotRight,
    variant,
    ...props
}: TagLinkProps) => {
    return (
        <RACLink
            {...props}
            className={(rp) =>
                twMerge(
                    tagStyles({
                        isDashed,
                        variant,
                    }),
                    intent,
                    typeof className === 'function' ? className(rp) : className
                )
            }
            ref={ref}
        >
            {composeRenderProps(children, (children) => (
                <>
                    {renderSlot(slotLeft, {
                        'data-slot': Slot.LEFT,
                    })}
                    {children}

                    {renderSlot(slotRight, {
                        'data-slot': Slot.RIGHT,
                    })}
                </>
            ))}
        </RACLink>
    )
}
TagLink.displayName = 'TagLink'
