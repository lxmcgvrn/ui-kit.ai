import type { HTMLProps } from 'react'

import { twMerge } from 'tailwind-merge'

export interface TopNavProps extends HTMLProps<HTMLElement> {
    /** Sticks the nav to the top of the page. Defaults to `true`. */
    sticky?: boolean
}

/** A ready-made nav bar for the top of the page. */
export function TopNav({ sticky = true, ...props }: TopNavProps) {
    return (
        <nav
            {...props}
            className={twMerge(
                props.className,
                sticky ? 'sticky top-0 z-50' : '',
                'bg-base-raised/10 backdrop-blur-xs',
                'border-default h-12 border-b',
                'flex items-center justify-between',
                'px-6 py-2'
            )}
        />
    )
}
TopNav.displayName = 'TopNav'
