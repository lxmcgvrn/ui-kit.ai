import type { ComponentProps } from 'react'

import { composeRenderProps, Link as RACLink } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export interface LinkProps extends ComponentProps<typeof RACLink> {}

/** Navigates to another page or resource. */
export function Link(props: LinkProps) {
  return (
    <RACLink
      {...props}
      className={composeRenderProps(props.className, (className) =>
        twMerge(
          'text-lo-contrast hover:text-hi-contrast hover:decoration-none underline decoration-dotted transition-colors hover:no-underline',
          className
        )
      )}
    />
  )
}
Link.displayName = 'Link'
