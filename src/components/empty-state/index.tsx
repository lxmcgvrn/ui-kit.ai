'use client'
import type { ReactNode } from 'react'

import { LucideInfo } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { SlotNode } from '../types/slotted-node'

import { Heading } from '../heading'
import { renderSlot } from '../types/slotted-node'

const actionsStyle = tv({
    base: 'mx-auto',
    variants: {
        actions: {
            1: '',
            2: 'grid grid-cols-2 gap-2',
        },
    },
})

export interface EmptyStateProps {
    /** Up to two react nodes — typically buttons — rendered below the body. */
    actions?: [ReactNode, ReactNode?]

    /** Supporting copy rendered below the title. */
    body?: ReactNode

    /** Classes merged with the component's own styles. */
    className?: string

    /** A decorative node rendered above the title. Defaults to an info icon. */
    icon?: SlotNode

    /** The headline describing why there is nothing to show. */
    title: string
}

/** Fallback UI shown when there is no data to display. */
export function EmptyState({
    actions,
    body,
    className,
    icon = <LucideInfo />,
    title,
}: EmptyStateProps) {
    return (
        <div
            className={twMerge(
                'text-center text-balance',
                'w-full',
                'p-6',
                'flex flex-col items-center justify-center',
                className
            )}
        >
            {renderSlot(icon, {
                'aria-hidden': true,
                className: 'text-lo-contrast mb-4 block size-8 [&>*]:stroke-[1.5]',
                role: 'img',
            })}

            <Heading
                className='text-hi-contrast mb-1 text-base'
                level={2}
            >
                {title}
            </Heading>
            {body != null ? <p className='mb-4 max-w-lg text-base text-balance'>{body}</p> : null}

            {actions && actions.length > 0 ? (
                <div
                    className={actionsStyle({
                        actions: actions.length,
                    })}
                >
                    {actions}
                </div>
            ) : null}
        </div>
    )
}
EmptyState.displayName = 'EmptyState'
