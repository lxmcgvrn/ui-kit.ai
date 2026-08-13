import type {
    BreadcrumbProps as AriaBreadcrumbProps,
    BreadcrumbsProps as AriaBreadcrumbsProps,
    LinkProps,
} from 'react-aria-components'

import { ChevronRightIcon } from 'lucide-react'
import {
    Breadcrumb as AriaBreadcrumb,
    Breadcrumbs as AriaBreadcrumbs,
    Link,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

/**
 * Props accepted by {@link Breadcrumb}. Everything `react-aria-components`'
 * `Breadcrumb` accepts, plus its `Link`'s props.
 *
 * @note This is a type alias rather than an interface because the two sources
 * declare an incompatible `children` — an interface cannot extend both.
 */
export type BreadcrumbProps = AriaBreadcrumbProps & Omit<LinkProps, 'className'>

/**
 * A breadcrumb is a link that represents a single item in a breadcrumb hierarchy.
 */
export function Breadcrumb(props: BreadcrumbProps) {
    return (
        <AriaBreadcrumb
            {...props}
            className={(renderProps) =>
                twMerge(
                    typeof props.className === 'function'
                        ? props.className(renderProps)
                        : props.className,
                    'flex items-center gap-2'
                )
            }
        >
            <Link
                {...props}
                className={twMerge(
                    props.href != null
                        ? 'text-lo-contrast hover:text-hi-contrast underline decoration-dotted'
                        : 'text-placeholder'
                )}
            />
            {props.href != null && <ChevronRightIcon className='text-hi-contrast size-3' />}
        </AriaBreadcrumb>
    )
}
Breadcrumb.displayName = 'Breadcrumb'

/**
 * Props accepted by {@link Breadcrumbs}.
 */
export interface BreadcrumbsProps<T extends object = object> extends AriaBreadcrumbsProps<T> {}

/**
 * Breadcrumbs display a hierarchy of links to the current page or resource in an application.
 */
export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
    return (
        <AriaBreadcrumbs
            {...props}
            className={twMerge('flex gap-2', props.className)}
        />
    )
}
Breadcrumbs.displayName = 'Breadcrumbs'
