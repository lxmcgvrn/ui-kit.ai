'use client'

import type { OptionsSchema } from '@ui-kit.ai/components'
import type { LucideIcon } from 'lucide-react'
import type { ComponentType } from 'react'
import type { Color as RACColor } from 'react-aria-components'

import {
    ColorArea,
    ColorChannelFields,
    ColorField,
    ColorPicker,
    ColorSlider,
    ColorSwatch,
    ColorWheel,
    Input,
    Label,
    Select,
    SelectButton,
    Tab,
    TabList,
    TabPanel,
    Tabs,
} from '@ui-kit.ai/components'
import { LucideCircle, LucideSlidersHorizontal, LucideSquare } from 'lucide-react'
import { useState } from 'react'
import { parseColor } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { toCssColor, toThemeColor, withAlphaFrom } from './color'

/** The spelling the editing fields use. Never how the theme stores the color. */
type ColorMode = 'hex' | 'hsb' | 'hsl' | 'rgb'

/** How the user aims the color: sliders, a plane, or a ring. */
type InputMethod = 'area' | 'sliders' | 'wheel'

interface PickerPreferences {
    method: InputMethod
    mode: ColorMode
}

/** Saturation and brightness read more predictably than HSL's lightness. */
const AREA_COLOR_SPACE = 'hsb'

/** Every mode react-aria can edit a color in, in the order the list reads. */
const COLOR_MODES: readonly ColorMode[] = ['hex', 'rgb', 'hsl', 'hsb']

/** Room for four characters, no more: these fields hold `100%` at the widest. */
const COMPACT = '[&_input]:px-2 [&_input]:text-xs'

/** Small enough to head a field two characters wide. */
const FIELD_LABEL = 'mb-0.5'

/** Tall enough for the widest input, so switching tabs never resizes the popover. */
const INPUT_HEIGHT = 'flex min-h-52 items-center'

const MODE_ITEMS: OptionsSchema<'listbox'>[] = COLOR_MODES.map((mode) => ({
    id: mode,
    textValue: mode === 'hex' ? 'Hex' : mode.toUpperCase(),
}))

/** One track each, in the order the picker has always listed them. */
const SLIDER_CHANNELS = ['hue', 'saturation', 'lightness'] as const

/* Outlives every popover, so the next one opens on the last choice. */
let remembered: PickerPreferences = { method: 'sliders', mode: 'hex' }

export interface ColorPickerPanelProps {
    /** Borders are translucent by design, so those colors get an opacity section. */
    hasAlpha: boolean

    /** Fires on a selection, and never on opening or closing the popover. */
    onChange: (color: string) => void
    value: string
}

/** A plane of saturation and brightness, under the hue that paints it. */
function AreaInput() {
    return (
        <div className='flex w-full flex-col gap-3'>
            <SaturationArea className='h-32 w-full' />

            <ColorSlider
                aria-label='Hue'
                channel='hue'
                colorSpace={AREA_COLOR_SPACE}
            />
        </div>
    )
}

/** Channel sliders, one per line, the way the picker has always opened. */
function SlidersInput() {
    return (
        <div className='flex w-full flex-col gap-2'>
            {SLIDER_CHANNELS.map((channel) => (
                <ColorSlider
                    channel={channel}
                    colorSpace='hsl'
                    key={channel}
                >
                    <Label className='mb-0.5'>{capitalise(channel)}</Label>
                </ColorSlider>
            ))}
        </div>
    )
}

/** The same plane, with hue bent into the ring around it. */
function WheelInput() {
    return (
        <ColorWheel className='mx-auto'>
            <SaturationArea className='size-full' />
        </ColorWheel>
    )
}

/** A tab's worth of visual input: an icon, a name, and the control itself. */
const INPUT_METHODS: readonly {
    control: ComponentType
    icon: LucideIcon
    id: InputMethod
    label: string
}[] = [
    { control: SlidersInput, icon: LucideSlidersHorizontal, id: 'sliders', label: 'Sliders' },
    { control: AreaInput, icon: LucideSquare, id: 'area', label: 'Area' },
    { control: WheelInput, icon: LucideCircle, id: 'wheel', label: 'Wheel' },
]

/** The picker itself: a way in, the color in numbers, and its opacity. */
export function ColorPickerPanel({ hasAlpha, onChange, value }: ColorPickerPanelProps) {
    const [{ method, mode }, remember] = usePickerPreferences()
    const color = parseColor(toCssColor(value))

    const onColorChange = (picked: RACColor) => {
        const themed = toThemeColor(picked.toString('rgba'))

        if (themed != null) onChange(themed)
    }

    /* Every control below reads and writes this one color, so none takes a value. */
    return (
        <ColorPicker
            className='w-full'
            onChange={onColorChange}
            value={color}
        >
            <Tabs
                className='gap-3'
                onSelectionChange={(key) => {
                    const picked = INPUT_METHODS.find((candidate) => candidate.id === key)

                    if (picked != null) remember({ method: picked.id })
                }}
                selectedKey={method}
                variant='segmented'
            >
                <div className='flex items-center justify-between gap-3'>
                    <ColorSwatch className='size-8 shrink-0' />

                    <TabList aria-label='Input method'>
                        {INPUT_METHODS.map(({ icon: Icon, id, label }) => (
                            <Tab
                                aria-label={label}
                                className='px-3'
                                id={id}
                                key={id}
                            >
                                <Icon className='size-4' />
                            </Tab>
                        ))}
                    </TabList>
                </div>

                {INPUT_METHODS.map(({ control: Control, id }) => (
                    <TabPanel
                        className={INPUT_HEIGHT}
                        id={id}
                        key={id}
                    >
                        <Control />
                    </TabPanel>
                ))}
            </Tabs>

            <div className={twMerge('flex items-end gap-1.5', COMPACT)}>
                <Select
                    className='w-20 shrink-0'
                    items={MODE_ITEMS}
                    onSelectionChange={(key) => {
                        const picked = COLOR_MODES.find((candidate) => candidate === key)

                        if (picked != null) remember({ mode: picked })
                    }}
                    selectedKey={mode}
                >
                    <Label className={FIELD_LABEL}>Mode</Label>
                    <SelectButton />
                </Select>

                {mode === 'hex' ? (
                    /* The hex field alone needs wiring — channel fields read the picker. */
                    <ColorField
                        onChange={(picked) => {
                            if (picked != null) onColorChange(withAlphaFrom(picked, color))
                        }}
                        value={color}
                    >
                        <Label className={FIELD_LABEL}>Hex</Label>
                        <Input />
                    </ColorField>
                ) : (
                    <ColorChannelFields
                        className='grow'
                        colorSpace={mode}
                    />
                )}
            </div>

            {hasAlpha ? (
                <div className='flex items-end gap-2'>
                    <ColorSlider
                        channel='alpha'
                        className='grow'
                    >
                        <Label className='mb-0.5'>Opacity</Label>
                    </ColorSlider>

                    <ColorField
                        aria-label='Opacity'
                        channel='alpha'
                        className='w-16 shrink-0 grow-0'
                    >
                        <Input className='px-2 text-xs' />
                    </ColorField>
                </div>
            ) : null}
        </ColorPicker>
    )
}

function capitalise(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

/** Saturation across, brightness up: the plane both tabs paint on. */
function SaturationArea({ className }: { className: string }) {
    return (
        <ColorArea
            className={className}
            colorSpace={AREA_COLOR_SPACE}
            xChannel='saturation'
            yChannel='brightness'
        />
    )
}

/** The picker's last input method and color mode, kept for as long as the tab. */
function usePickerPreferences(): [
    PickerPreferences,
    (changes: Partial<PickerPreferences>) => void,
] {
    const [preferences, setPreferences] = useState(remembered)

    const remember = (changes: Partial<PickerPreferences>) => {
        remembered = { ...remembered, ...changes }
        setPreferences(remembered)
    }

    return [preferences, remember]
}
