'use client'

import { Label } from '@ui-kit.ai/components'
import {
    Slider as RACSlider,
    SliderOutput as RACSliderOutput,
    SliderThumb as RACSliderThumb,
    SliderTrack as RACSliderTrack,
} from 'react-aria-components'

const MAX_RADIUS = 1.5
const MIN_RADIUS = 0
/** One CSS pixel at the default root font size. */
const STEP_RADIUS = 0.0625

export interface RadiusSliderProps {
    onChange: (radius: number) => void
    value: number
}

/** Docs-local slider for the theme's base radius, styled to match fields. */
export function RadiusSlider({ onChange, value }: RadiusSliderProps) {
    return (
        <RACSlider
            className='w-full'
            maxValue={MAX_RADIUS}
            minValue={MIN_RADIUS}
            onChange={onChange}
            step={STEP_RADIUS}
            value={value}
        >
            <div className='flex items-baseline justify-between gap-2'>
                <Label>Radius</Label>
                <RACSliderOutput className='text-lo-contrast mb-1 text-sm tabular-nums'>
                    {({ state }) => `${state.getThumbValue(0).toString()}rem`}
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
