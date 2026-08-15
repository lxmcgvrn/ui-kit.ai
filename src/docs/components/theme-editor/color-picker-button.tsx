'use client'

import type { ComponentProps } from 'react'
import type { Color as RACColor } from 'react-aria-components'

import {
    ColorSlider,
    DialogTrigger,
    FieldButton,
    Label,
    Popover,
    PopoverDialog,
} from '@ui-kit.ai/components'
import { LucidePipette } from 'lucide-react'

import { toCssColor, toThemeColor } from './color'
import { toLabel } from './field'

/** A channel the picker can put a slider under. */
export type PickerChannel = NonNullable<ComponentProps<typeof ColorSlider>['channel']>

/** A seed lends its hue, chroma and lightness, so it has no alpha to give. */
export const SEED_CHANNELS: readonly PickerChannel[] = ['hue', 'saturation', 'lightness']

/** Borders are translucent by design, so token overrides keep the alpha channel. */
export const TOKEN_CHANNELS: readonly PickerChannel[] = ['hue', 'saturation', 'lightness', 'alpha']

export interface ColorPickerButtonProps {
    channels: readonly PickerChannel[]
    label: string

    /** Fires on a selection, and never on opening or closing the popover. */
    onChange: (color: string) => void
    value: string
}

/** A pipette that opens a channel-by-channel picker over the current color. */
export function ColorPickerButton({ channels, label, onChange, value }: ColorPickerButtonProps) {
    const onColorChange = (color: RACColor) => {
        const picked = toThemeColor(color.toString('rgba'))

        if (picked != null) onChange(picked)
    }

    return (
        <DialogTrigger>
            {/* `null` opts out of the surrounding field's own button slots. */}
            <FieldButton
                aria-label={`Pick ${label}`}
                slot={null}
            >
                <LucidePipette />
            </FieldButton>

            <Popover>
                <PopoverDialog className='flex min-w-64 flex-col gap-4'>
                    {channels.map((channel) => (
                        <ColorSlider
                            channel={channel}
                            colorSpace='hsl'
                            key={channel}
                            onChange={onColorChange}
                            value={toCssColor(value)}
                        >
                            <Label>{toLabel(channel)}</Label>
                        </ColorSlider>
                    ))}
                </PopoverDialog>
            </Popover>
        </DialogTrigger>
    )
}
