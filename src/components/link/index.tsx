import type { ComponentProps } from 'react'

import { Link as RACLink } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export interface LinkProps extends ComponentProps<typeof RACLink> {}

/** Navigates to another page or resource. */
export function Link(props: LinkProps) {
    return (
        <RACLink
            {...props}
            className={(renderProps) =>
                twMerge(
                    `text-lo-contrast hover:text-hi-contrast hover:decoration-none underline decoration-dotted
                    transition-colors hover:no-underline`,
                    typeof props.className === 'function'
                        ? props.className(renderProps)
                        : props.className
                )
            }
        />
    )
}
Link.displayName = 'Link'
