'use client'

import type { OptionsSchema } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'
import type { Color as RACColor, ColorSpace as RACColorSpace } from 'react-aria-components'

import { ColorField, Input, Label, Select, SelectButton } from '@ui-kit.ai/components'
import { twMerge } from 'tailwind-merge'

import type { ColorMode } from './use-picker-preferences'

import { withAlphaFrom } from './color'
import { toLabel } from './field'

/** A channel a field can edit on its own. */
type ColorChannel = NonNullable<ComponentProps<typeof ColorField>['channel']>

/** Every mode react-aria can edit a color in, in the order the list reads. */
const COLOR_MODES: readonly ColorMode[] = ['hex', 'rgb', 'hsl', 'hsb']

/** The channels a mode spells out, left to right. */
const MODE_CHANNELS: Record<RACColorSpace, readonly ColorChannel[]> = {
    hsb: ['hue', 'saturation', 'brightness'],
    hsl: ['hue', 'saturation', 'lightness'],
    rgb: ['red', 'green', 'blue'],
}

const MODE_ITEMS: OptionsSchema<'listbox'>[] = COLOR_MODES.map((mode) => ({
    id: mode,
    textValue: mode === 'hex' ? 'Hex' : mode.toUpperCase(),
}))

/** Room for four characters, no more: these fields hold `100%` at the widest. */
const COMPACT = '[&_input]:px-2 [&_input]:text-xs'

/** Small enough to head a field two characters wide. */
const FIELD_LABEL = 'mb-0.5 text-xs'

export interface ColorPickerFieldsProps {
    mode: ColorMode

    /** The hex field alone needs wiring — channel fields read the picker. */
    onChange: (color: RACColor) => void
    onModeChange: (mode: ColorMode) => void
    value: RACColor
}

interface ChannelFieldsProps {
    colorSpace: RACColorSpace
}

/** The color in numbers: a mode to read it in, and a field per channel. */
export function ColorPickerFields({ mode, onChange, onModeChange, value }: ColorPickerFieldsProps) {
    const onHexChange = (picked: null | RACColor) => {
        if (picked == null) return

        onChange(withAlphaFrom(picked, value))
    }

    return (
        <div className={twMerge('flex items-end gap-1.5', COMPACT)}>
            <Select
                className='w-20 shrink-0'
                items={MODE_ITEMS}
                onSelectionChange={(key) => {
                    const picked = COLOR_MODES.find((candidate) => candidate === key)

                    if (picked != null) onModeChange(picked)
                }}
                selectedKey={mode}
            >
                <Label className={FIELD_LABEL}>Mode</Label>
                <SelectButton />
            </Select>

            {mode === 'hex' ? (
                <ColorField
                    onChange={onHexChange}
                    value={value}
                >
                    <Label className={FIELD_LABEL}>Hex</Label>
                    <Input />
                </ColorField>
            ) : (
                <ChannelFields colorSpace={mode} />
            )}
        </div>
    )
}

/** One field per channel of a mode, headed by the channel's initial. */
function ChannelFields({ colorSpace }: ChannelFieldsProps) {
    return (
        <div className='grid grow grid-cols-3 gap-1.5'>
            {MODE_CHANNELS[colorSpace].map((channel) => (
                <ColorField
                    aria-label={toLabel(channel)}
                    channel={channel}
                    colorSpace={colorSpace}
                    key={channel}
                >
                    <Label className={FIELD_LABEL}>{channel.charAt(0).toUpperCase()}</Label>
                    <Input />
                </ColorField>
            ))}
        </div>
    )
}
