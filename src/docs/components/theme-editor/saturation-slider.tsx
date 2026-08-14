'use client'

import type { Saturation } from '@ui-kit.ai/theme'

import { Label } from '@ui-kit.ai/components'
import { DEFAULT_SATURATION, SATURATIONS } from '@ui-kit.ai/theme'
import {
    Slider as RACSlider,
    SliderOutput as RACSliderOutput,
    SliderThumb as RACSliderThumb,
    SliderTrack as RACSliderTrack,
} from 'react-aria-components'

const LABELS: Record<Saturation, string> = {
    lots: 'Lots',
    none: 'None',
    some: 'Some',
}

export interface SaturationSliderProps {
    onChange: (saturation: Saturation) => void
    value: Saturation
}

/** The depth slider's twin: how far the seed's hue reaches into the surfaces. */
export function SaturationSlider({ onChange, value }: SaturationSliderProps) {
    return (
        <RACSlider
            className='w-full'
            maxValue={SATURATIONS.length - 1}
            minValue={0}
            onChange={(index) => {
                onChange(SATURATIONS[index] ?? DEFAULT_SATURATION)
            }}
            step={1}
            value={SATURATIONS.indexOf(value)}
        >
            <div className='flex items-baseline justify-between gap-2'>
                <Label>Saturation</Label>
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
