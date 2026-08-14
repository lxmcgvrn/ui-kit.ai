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
            className='grid grid-cols-[5rem_1fr] items-center gap-3'
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
                            <ColorSlider
                                channel='hue'
                                colorSpace='hsl'
                                onChange={onColorChange}
                                value={value}
                            >
                                <Label>Hue</Label>
                            </ColorSlider>
                            <ColorSlider
                                channel='saturation'
                                colorSpace='hsl'
                                onChange={onColorChange}
                                value={value}
                            >
                                <Label>Saturation</Label>
                            </ColorSlider>
                            <ColorSlider
                                channel='lightness'
                                colorSpace='hsl'
                                onChange={onColorChange}
                                value={value}
                            >
                                <Label>Lightness</Label>
                            </ColorSlider>
                        </PopoverDialog>
                    </Popover>
                </DialogTrigger>
            </FieldGroup>
        </ColorField>
    )
}
