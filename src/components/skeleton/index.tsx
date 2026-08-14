import type { HTMLProps } from 'react'

import { twMerge } from 'tailwind-merge'

export interface SkeletonProps extends HTMLProps<HTMLDivElement> {}

/** An animated `Skeleton` component, for use as a loading placeholder. */
export function Skeleton(props: SkeletonProps) {
    return (
        <div
            {...props}
            className={twMerge(
                'animate-shimmer',
                'h-4 max-w-full',
                'rounded-sm',
                'bg-tint bg-linear-to-r bg-size-[200%_100%]',
                'from-(--theme-default-bg-tint) via-(--theme-default-bg-base-raised) to-(--theme-default-bg-tint)',
                props.className
            )}
        />
    )
}
Skeleton.displayName = 'Skeleton'
