'use client'

import {
    Button,
    ColorArea,
    ColorField,
    ColorPicker,
    ColorSlider,
    ColorSwatch,
    DialogTrigger,
    Popover,
    PopoverDialog,
} from '@ui-kit.ai/components'

export default function ColorPickerPopover() {
    return (
        <ColorPicker defaultValue='#5B5BD6'>
            {({ color }) => (
                <DialogTrigger>
                    <Button
                        className='font-normal'
                        variant='secondary'
                    >
                        <ColorSwatch className='size-4' />
                        {color.toString('hex')}
                    </Button>

                    <Popover>
                        <PopoverDialog className='flex w-48 flex-col gap-4'>
                            <ColorArea
                                className='h-40 w-full'
                                colorSpace='hsb'
                                xChannel='saturation'
                                yChannel='brightness'
                            />
                            <ColorSlider
                                channel='hue'
                                colorSpace='hsb'
                            />
                            <ColorSlider channel='alpha' />
                            <ColorField aria-label='Hex' />
                        </PopoverDialog>
                    </Popover>
                </DialogTrigger>
            )}
        </ColorPicker>
    )
}
