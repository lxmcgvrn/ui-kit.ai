import type { HTMLProps } from 'react'

import { twMerge } from 'tailwind-merge'

/**
 * Props accepted by {@link TopNav} — everything a `nav` element accepts, plus
 * this design system's presentational props.
 */
export interface TopNavProps extends HTMLProps<HTMLElement> {
    /**
     * When `true` (the default) the nav sticks to the top of the page. Pass
     * `false` to let it scroll away with the rest of the content.
     */
    sticky?: boolean
}

/**
 * The top nav component is an ready-made nav that appears at the top of the page.
 */
export function TopNav({ sticky = true, ...props }: TopNavProps) {
    return (
        <nav
            {...props}
            className={twMerge(
                props.className,
                sticky === true ? 'sticky top-0 z-50' : '',
                'bg-base-raised/10 backdrop-blur-xs',
                'border-default h-12 border-b',
                'flex items-center justify-between',
                'px-6 py-2'
            )}
        />
    )
}
TopNav.displayName = 'TopNav'
