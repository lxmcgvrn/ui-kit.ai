import type {
    BreadcrumbProps as RACBreadcrumbProps,
    BreadcrumbsProps as RACBreadcrumbsProps,
    LinkProps as RACLinkProps,
} from 'react-aria-components'

import { LucideChevronRight } from 'lucide-react'
import {
    composeRenderProps,
    Breadcrumb as RACBreadcrumb,
    Breadcrumbs as RACBreadcrumbs,
    Link as RACLink,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export type BreadcrumbProps = Omit<RACLinkProps, 'className'> & RACBreadcrumbProps

/** A breadcrumb is a link that represents a single item in a breadcrumb hierarchy. */
export function Breadcrumb(props: BreadcrumbProps) {
    return (
        <RACBreadcrumb
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge(className, 'flex items-center gap-2')
            )}
        >
            <RACLink
                {...props}
                className={twMerge(
                    props.href != null
                        ? 'text-lo-contrast hover:text-hi-contrast underline decoration-dotted'
                        : 'text-placeholder'
                )}
            />
            {props.href != null && <LucideChevronRight className='text-hi-contrast size-3' />}
        </RACBreadcrumb>
    )
}
Breadcrumb.displayName = 'Breadcrumb'

export interface BreadcrumbsProps<T extends object = object> extends RACBreadcrumbsProps<T> {}

/** A hierarchy of links to the current page or resource. */
export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
    return (
        <RACBreadcrumbs
            {...props}
            className={twMerge('flex gap-2', props.className)}
        />
    )
}
Breadcrumbs.displayName = 'Breadcrumbs'
