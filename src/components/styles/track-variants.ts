import { tv } from 'tailwind-variants'

/** The groove a `ProgressBar` or `Meter` fill runs in. */
export const trackVariants = tv({
    base: ['h-2 w-full', 'rounded-full', 'border-default border', 'bg-tint', 'overflow-hidden'],
})

/** The filled part of a track. The caller sizes it, in percent. */
export const fillVariants = tv({
    base: ['h-full', 'rounded-full', 'bg-primary'],
    defaultVariants: {
        isIndeterminate: false,
    },
    variants: {
        isIndeterminate: {
            false: 'transition-[width]',
            // Progress is unknown, so a band sweeps the whole track instead.
            true: [
                'animate-shimmer',
                'w-full bg-linear-to-r bg-size-[200%_100%]',
                'from-(--theme-default-bg-tint) via-(--theme-default-bg-primary) to-(--theme-default-bg-tint)',
            ],
        },
    },
})
