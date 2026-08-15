import type { ForwardedRef, ReactNode } from 'react'
import type { ProgressBarProps as RACProgressBarProps } from 'react-aria-components'

import { composeRenderProps, ProgressBar as RACProgressBar } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { Intent } from '../types/intent'

import { Label } from '../label'
import { fillVariants, trackVariants } from '../styles/track-variants'

const progressBarStyles = tv({
    base: 'flex w-full flex-col',
})

export interface ProgressBarProps extends RACProgressBarProps {
    /** Convey semantic meaning with color. */
    intent?: Intent

    /** Rendered above the track, opposite the formatted value. */
    label?: ReactNode

    ref?: ForwardedRef<HTMLDivElement>
}

/** Shows how far along an operation is, or that one is under way. */
export function ProgressBar({ intent, label, ref, ...props }: ProgressBarProps) {
    return (
        <RACProgressBar
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge(progressBarStyles(), className, intent)
            )}
            ref={ref}
        >
            {(renderProps) => (
                <>
                    {label == null ? null : (
                        <div className='flex items-baseline justify-between gap-2'>
                            <Label>{label}</Label>
                            <span className='text-lo-contrast mb-1 text-sm'>
                                {renderProps.valueText}
                            </span>
                        </div>
                    )}

                    {typeof props.children === 'function'
                        ? props.children(renderProps)
                        : props.children}

                    <div className={trackVariants()}>
                        <div
                            className={fillVariants({
                                isIndeterminate: renderProps.isIndeterminate,
                            })}
                            style={
                                renderProps.isIndeterminate
                                    ? undefined
                                    : { width: `${String(renderProps.percentage ?? 0)}%` }
                            }
                        />
                    </div>
                </>
            )}
        </RACProgressBar>
    )
}
ProgressBar.displayName = 'ProgressBar'
