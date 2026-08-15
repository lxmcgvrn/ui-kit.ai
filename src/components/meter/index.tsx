import type { ForwardedRef, ReactNode } from 'react'
import type { MeterProps as RACMeterProps } from 'react-aria-components'

import { composeRenderProps, Meter as RACMeter } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type { Intent } from '../types/intent'

import { Label } from '../label'
import { fillVariants, trackVariants } from '../styles/track-variants'

const meterStyles = tv({
    base: 'flex w-full flex-col',
})

export interface MeterProps extends RACMeterProps {
    /** Convey semantic meaning with color — pass `warning` or `error` at a threshold. */
    intent?: Intent

    /** Rendered above the track, opposite the formatted value. */
    label?: ReactNode

    ref?: ForwardedRef<HTMLDivElement>
}

/** Shows a measurement within a known range, such as disk or quota usage. */
export function Meter({ intent, label, ref, ...props }: MeterProps) {
    return (
        <RACMeter
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge(meterStyles(), className, intent)
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
                            className={fillVariants()}
                            style={{ width: `${String(renderProps.percentage)}%` }}
                        />
                    </div>
                </>
            )}
        </RACMeter>
    )
}
Meter.displayName = 'Meter'
