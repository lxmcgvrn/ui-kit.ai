import type { SVGProps } from 'react'

import { LucideLoader2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

/**
 * Props accepted by {@link Loader} — everything an `svg` element accepts.
 */
export interface LoaderProps extends SVGProps<SVGSVGElement> {}

/**
 * A loader icon to indicate that content is loading.
 */
export function Loader({ className, ...rest }: LoaderProps) {
    return (
        <LucideLoader2
            {...rest}
            className={twMerge('animate-spin', className)}
        />
    )
}
Loader.displayName = 'Loader'
