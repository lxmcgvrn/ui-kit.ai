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
import { PipetteIcon } from 'lucide-react'
import { useState } from 'react'

type OnColorChange = NonNullable<ComponentProps<typeof ColorField>['onChange']>

export default function ColorFieldThemePicker() {
    const [value, setValue] = useState('#5000ff')

    const onChange: OnColorChange = (color) => {
        setValue(color?.toString('hex') ?? '#ffffff')
    }

    return (
        <div className='w-64'>
            <ColorField
                className='mb-2'
                onChange={onChange}
                value={value}
            >
                <div className='flex items-center justify-between'>
                    <Label>Accent Color</Label>
                </div>
                <FieldGroup>
                    <Input
                        icon={
                            <ColorSwatch
                                className='size-5'
                                color={value}
                            />
                        }
                        isBorderless
                    />
                    <DialogTrigger>
                        <FieldButton>
                            <PipetteIcon />
                        </FieldButton>
                        <Popover>
                            <PopoverDialog className='min-w-64'>
                                <ColorSlider
                                    channel='hue'
                                    className='mb-4'
                                    colorSpace='hsl'
                                    onChange={onChange}
                                    value={value}
                                >
                                    <Label>Hue</Label>
                                </ColorSlider>
                                <ColorSlider
                                    channel='saturation'
                                    className='mb-4'
                                    colorSpace='hsl'
                                    onChange={onChange}
                                    value={value}
                                >
                                    <Label>Saturation</Label>
                                </ColorSlider>
                                <ColorSlider
                                    channel='lightness'
                                    className='mb-4'
                                    colorSpace='hsl'
                                    onChange={onChange}
                                    value={value}
                                >
                                    <Label>Lightness</Label>
                                </ColorSlider>
                            </PopoverDialog>
                        </Popover>
                    </DialogTrigger>
                </FieldGroup>
            </ColorField>
        </div>
    )
}
