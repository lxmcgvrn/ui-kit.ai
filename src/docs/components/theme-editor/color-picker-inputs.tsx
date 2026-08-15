'use client'

import type { LucideIcon } from 'lucide-react'
import type { ComponentType } from 'react'
import type { Color as RACColor } from 'react-aria-components'

import { ColorArea, ColorSlider, ColorWheel, Label } from '@ui-kit.ai/components'
import { LucideCircle, LucideSlidersHorizontal, LucideSquare } from 'lucide-react'

import type { InputMethod } from './use-picker-preferences'

import { toLabel } from './field'

/** Saturation and brightness read more predictably than HSL's lightness. */
const AREA_COLOR_SPACE = 'hsb'

/** One track each, in the order the picker has always listed them. */
const SLIDER_CHANNELS = ['hue', 'saturation', 'lightness'] as const

/* Fits inside the ring. `!` beats the `position` react-aria sets inline. */
const WHEEL_AREA = '!absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2'

export interface ColorInputProps {
    onChange: (color: RACColor) => void
    value: RACColor
}

/** A tab's worth of visual input: an icon, a name, and the control itself. */
export interface InputMethodOption {
    control: ComponentType<ColorInputProps>
    icon: LucideIcon
    id: InputMethod
    label: string
}

interface AreaProps extends ColorInputProps {
    className: string
}

/** A plane of saturation and brightness, under the hue that paints it. */
function AreaInput({ onChange, value }: ColorInputProps) {
    return (
        <div className='flex w-full flex-col gap-3'>
            <SaturationArea
                className='h-32 w-full'
                onChange={onChange}
                value={value}
            />

            <ColorSlider
                aria-label='Hue'
                channel='hue'
                colorSpace={AREA_COLOR_SPACE}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

/** Saturation across, brightness up: the plane both tabs paint on. */
function SaturationArea({ className, onChange, value }: AreaProps) {
    return (
        <ColorArea
            className={className}
            colorSpace={AREA_COLOR_SPACE}
            onChange={onChange}
            value={value}
            xChannel='saturation'
            yChannel='brightness'
        />
    )
}

/** Channel sliders, one per line, the way the picker has always opened. */
function SlidersInput({ onChange, value }: ColorInputProps) {
    return (
        <div className='flex w-full flex-col gap-2'>
            {SLIDER_CHANNELS.map((channel) => (
                <ColorSlider
                    channel={channel}
                    colorSpace='hsl'
                    key={channel}
                    onChange={onChange}
                    value={value}
                >
                    <Label className='mb-0.5 text-xs'>{toLabel(channel)}</Label>
                </ColorSlider>
            ))}
        </div>
    )
}

/** The same plane, with hue bent into the ring around it. */
function WheelInput({ onChange, value }: ColorInputProps) {
    return (
        <div className='relative mx-auto w-48'>
            <ColorWheel
                onChange={onChange}
                value={value}
            />

            <SaturationArea
                className={WHEEL_AREA}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

/** Every way the picker can take a color, in tab order. */
export const INPUT_METHODS: readonly InputMethodOption[] = [
    { control: SlidersInput, icon: LucideSlidersHorizontal, id: 'sliders', label: 'Sliders' },
    { control: AreaInput, icon: LucideSquare, id: 'area', label: 'Area' },
    { control: WheelInput, icon: LucideCircle, id: 'wheel', label: 'Wheel' },
]
