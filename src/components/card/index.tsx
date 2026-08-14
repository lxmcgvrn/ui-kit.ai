import type { ComponentProps, HTMLProps } from 'react'

import { composeRenderProps, Link as RACLink } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { Heading } from '../heading'

export interface CardProps extends HTMLProps<HTMLElement> {}

/** A Card is a container that groups and organizes content in a consistent manner. */
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

export interface CardLinkProps extends ComponentProps<typeof RACLink> {}

/** A Card is a container that groups and organizes content in a consistent manner. */
export function CardLink(props: CardLinkProps) {
    return (
        <RACLink
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge(
                    'border-default bg-base-raised relative overflow-hidden rounded-lg border shadow-xs',
                    'transition-all',
                    'hover:border-field hover:shadow-md',
                    className
                )
            )}
        />
    )
}
CardLink.displayName = 'CardLink'

export interface CardHeaderProps extends HTMLProps<HTMLElement> {}

/** A CardHeader is a container for the title of the card. */
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

export interface CardTitleProps extends Omit<ComponentProps<typeof Heading>, 'level' | 'slot'> {}

/** A heading element that displays the card's title. */
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

export interface CardDescriptionProps extends Omit<ComponentProps<'span'>, 'level' | 'slot'> {}

/** A CardDescription is an element used to add extra context to a card. */
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

export interface CardBodyProps extends HTMLProps<HTMLDivElement> {}

/** A CardBody is a container for the main content of the card. */
export function CardBody(props: CardBodyProps) {
    return (
        <div
            {...props}
            className={twMerge('my-4 px-4 text-base', props.className)}
        />
    )
}
CardBody.displayName = 'CardBody'

export interface CardFooterProps extends HTMLProps<HTMLElement> {}

/** Holds actions or supplementary information for the card. */
export function CardFooter(props: CardFooterProps) {
    return (
        <footer
            {...props}
            className={twMerge('my-4 flex items-center px-4', props.className)}
        />
    )
}
CardFooter.displayName = 'CardFooter'
