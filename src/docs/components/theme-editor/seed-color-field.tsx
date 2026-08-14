'use client'

import type { ComponentProps } from 'react'

import {
    ColorField,
    ColorSlider,
    ColorSwatch,
    DialogTrigger,
    FieldButton,
    FieldGroup,
    Input,
    Label,
    Popover,
    PopoverDialog,
} from '@ui-kit.ai/components'
import { LucidePipette } from 'lucide-react'

import { FIELD_ROW, toLabel } from './field'

const CHANNELS = ['hue', 'saturation', 'lightness'] as const

export interface SeedColorFieldProps {
    label: string
    onChange: (color: string) => void
    value: string
}

/** A hex field plus a swatch-popover picker for one intent's seed colour. */
export function SeedColorField({ label, onChange, value }: SeedColorFieldProps) {
    const onColorChange = (color: ComponentProps<typeof ColorField>['value']) => {
        if (color == null) return

        onChange(color.toString('hex'))
    }

    return (
        <ColorField
            className={FIELD_ROW}
            onChange={onColorChange}
            value={value}
        >
            <Label className='mb-0'>{label}</Label>
            <FieldGroup>
                <Input
                    icon={
                        <ColorSwatch
                            className='size-4'
                            color={value}
                        />
                    }
                    isBorderless
                />
                <DialogTrigger>
                    <FieldButton aria-label={`Pick the ${label.toLowerCase()} colour`}>
                        <LucidePipette />
                    </FieldButton>
                    <Popover>
                        <PopoverDialog className='flex min-w-64 flex-col gap-4'>
                            {CHANNELS.map((channel) => (
                                <ColorSlider
                                    channel={channel}
                                    colorSpace='hsl'
                                    key={channel}
                                    onChange={onColorChange}
                                    value={value}
                                >
                                    <Label>{toLabel(channel)}</Label>
                                </ColorSlider>
                            ))}
                        </PopoverDialog>
                    </Popover>
                </DialogTrigger>
            </FieldGroup>
        </ColorField>
    )
}
