import type { ComponentProps, HTMLProps } from 'react'

import { Link as RACLink } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Heading } from '../heading'

/**
 * Props accepted by {@link Card}.
 */
export interface CardProps extends HTMLProps<HTMLElement> {}

/**
 * A Card is a container that groups and organizes content in a consistent manner.
 */
export function Card(props: CardProps) {
    return (
        <section
            {...props}
            className={twMerge(
                'border-default bg-base-raised relative overflow-hidden rounded-lg border shadow-xs',
                props.className
            )}
        />
    )
}
Card.displayName = 'Card'

/**
 * Props accepted by {@link CardLink}.
 */
export interface CardLinkProps extends ComponentProps<typeof RACLink> {}

/**
 * A Card is a container that groups and organizes content in a consistent manner.
 */
export function CardLink(props: CardLinkProps) {
    return (
        <RACLink
            {...props}
            className={(renderProps) =>
                twMerge(
                    'border-default bg-base-raised relative overflow-hidden rounded-lg border shadow-xs',
                    'transition-all',
                    'hover:border-field hover:shadow-md',
                    typeof props.className === 'function'
                        ? props.className(renderProps)
                        : props.className
                )
            }
        />
    )
}
CardLink.displayName = 'CardLink'

/**
 * Props accepted by {@link CardHeader}.
 */
export interface CardHeaderProps extends HTMLProps<HTMLElement> {}

/**
 * A CardHeader is a container for the title of the card.
 */
export const CardHeader = (props: CardHeaderProps) => {
    return (
        <header
            {...props}
            className={twMerge('my-4 px-4', props.className)}
            data-component='header'
        />
    )
}
CardHeader.displayName = 'CardHeader'

/**
 * Props accepted by {@link CardTitle}.
 */
export interface CardTitleProps extends Omit<ComponentProps<typeof Heading>, 'level' | 'slot'> {}

/**
 * A CardTitle is a heading element that is used to display the title of the card.
 */
export function CardTitle({ children, ...props }: CardTitleProps) {
    return (
        <Heading
            {...props}
            className={twMerge('mb-0 truncate text-base', props.className)}
            level={3}
            slot='title'
        >
            {children}
        </Heading>
    )
}
CardTitle.displayName = 'CardTitle'

/**
 * Props accepted by {@link CardDescription}.
 */
export interface CardDescriptionProps extends Omit<ComponentProps<'span'>, 'level' | 'slot'> {}

/**
 * A CardDescription is an element used to add extra context to a card.
 */
export function CardDescription({ children, ...props }: CardDescriptionProps) {
    return (
        <span
            {...props}
            className={twMerge('text-lo-contrast mb-0 truncate text-base', props.className)}
            slot='description'
        >
            {children}
        </span>
    )
}
CardDescription.displayName = 'CardDescription'

/**
 * Props accepted by {@link CardBody}.
 */
export interface CardBodyProps extends HTMLProps<HTMLDivElement> {}

/**
 * A CardBody is a container for the main content of the card.
 */
export function CardBody(props: CardBodyProps) {
    return (
        <div
            {...props}
            className={twMerge('my-4 px-4 text-base', props.className)}
        />
    )
}
CardBody.displayName = 'CardBody'

/**
 * Props accepted by {@link CardFooter}.
 */
export interface CardFooterProps extends HTMLProps<HTMLElement> {}

/**
 * A CardFooter is a container for additional actions or information related to the card.
 */
export function CardFooter(props: CardFooterProps) {
    return (
        <footer
            {...props}
            className={twMerge('my-4 flex items-center px-4', props.className)}
        />
    )
}
CardFooter.displayName = 'CardFooter'
