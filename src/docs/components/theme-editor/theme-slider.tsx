'use client'

import type { SliderProps as RACSliderProps } from 'react-aria-components'

import { Label } from '@ui-kit.ai/components'
import {
    Slider as RACSlider,
    SliderOutput as RACSliderOutput,
    SliderThumb as RACSliderThumb,
    SliderTrack as RACSliderTrack,
} from 'react-aria-components'

export interface ThemeSliderProps extends Omit<RACSliderProps<number>, 'children' | 'className'> {
    /** The current value, spelled for the reader. */
    display: string
    label: string
}

/** Docs-local slider chrome, styled to match the library's fields. */
export function ThemeSlider({ display, label, ...props }: ThemeSliderProps) {
    return (
        <RACSlider
            {...props}
            className='w-full'
        >
            <div className='flex items-baseline justify-between gap-2'>
                <Label>{label}</Label>
                <RACSliderOutput className='text-lo-contrast mb-1 text-sm tabular-nums'>
                    {display}
                </RACSliderOutput>
            </div>

            <RACSliderTrack className='relative flex h-6 w-full items-center'>
                {({ state }) => (
                    <>
                        <div className='bg-tint h-1.5 w-full rounded-full' />
                        <div
                            className='bg-primary absolute top-1/2 left-0 h-1.5 -translate-y-1/2 rounded-full'
                            style={{ width: `${(state.getThumbPercent(0) * 100).toString()}%` }}
                        />
                        <RACSliderThumb className='border-field bg-base-raised top-1/2 size-4 rounded-full border shadow-sm' />
                    </>
                )}
            </RACSliderTrack>
        </RACSlider>
    )
}
