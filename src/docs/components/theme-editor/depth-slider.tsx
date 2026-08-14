'use client'

import type { Depth } from '@ui-kit.ai/theme'

import { Label } from '@ui-kit.ai/components'
import { DEFAULT_DEPTH, DEPTHS } from '@ui-kit.ai/theme'
import {
    Slider as RACSlider,
    SliderOutput as RACSliderOutput,
    SliderThumb as RACSliderThumb,
    SliderTrack as RACSliderTrack,
} from 'react-aria-components'

const LABELS: Record<Depth, string> = {
    lots: 'Lots',
    none: 'None',
    some: 'Some',
}

export interface DepthSliderProps {
    onChange: (depth: Depth) => void
    value: Depth
}

/** The radius slider's twin, walked along three detents instead of a range. */
export function DepthSlider({ onChange, value }: DepthSliderProps) {
    return (
        <RACSlider
            className='w-full'
            maxValue={DEPTHS.length - 1}
            minValue={0}
            onChange={(index) => {
                onChange(DEPTHS[index] ?? DEFAULT_DEPTH)
            }}
            step={1}
            value={DEPTHS.indexOf(value)}
        >
            <div className='flex items-baseline justify-between gap-2'>
                <Label>Depth</Label>
                <RACSliderOutput className='text-lo-contrast mb-1 text-sm'>
                    {LABELS[value]}
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
