'use client'

import { ThemeSlider } from './theme-slider'

const MAX_RADIUS = 1.5
const MIN_RADIUS = 0
/** One CSS pixel at the default root font size. */
const STEP_RADIUS = 0.0625

export interface RadiusSliderProps {
    onChange: (radius: number) => void
    value: number
}

/** The theme's base radius, swept across a range of rem values. */
export function RadiusSlider({ onChange, value }: RadiusSliderProps) {
    return (
        <ThemeSlider
            display={`${value.toString()}rem`}
            label='Radius'
            maxValue={MAX_RADIUS}
            minValue={MIN_RADIUS}
            onChange={onChange}
            step={STEP_RADIUS}
            value={value}
        />
    )
}
