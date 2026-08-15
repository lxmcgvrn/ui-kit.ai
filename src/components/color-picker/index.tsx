import type { ReactNode } from 'react'
import type { ColorPickerProps as RACColorPickerProps } from 'react-aria-components'

import { ColorPicker as RACColorPicker } from 'react-aria-components'

import { Button } from '../button'
import { ColorArea } from '../color-area'
import { ColorField } from '../color-field'
import { ColorSlider } from '../color-slider'
import { ColorSwatch } from '../color-swatch'
import { DialogTrigger } from '../dialog'
import { Popover, PopoverDialog } from '../popover'

/** Saturation and brightness read more predictably than HSL's lightness. */
const AREA_COLOR_SPACE = 'hsb'

/** The area, sliders and hex field shown inside the popover by default. */
function ColorPickerContent() {
    return (
        <div className='flex w-48 flex-col gap-4'>
            <ColorArea
                className='h-40 w-full'
                colorSpace={AREA_COLOR_SPACE}
                xChannel='saturation'
                yChannel='brightness'
            />
            <ColorSlider
                aria-label='Hue'
                channel='hue'
                colorSpace={AREA_COLOR_SPACE}
            />
            <ColorSlider
                aria-label='Alpha'
                channel='alpha'
            />
            <ColorField aria-label='Hex' />
        </div>
    )
}
ColorPickerContent.displayName = 'ColorPickerContent'

export interface ColorPickerProps extends Omit<RACColorPickerProps, 'children'> {
    /** Popover content. Defaults to an area, hue and alpha sliders, and a hex field. */
    children?: ReactNode

    /** Trigger text shown beside the swatch. Defaults to the color's hex value. */
    label?: string
}

/** A swatch button that opens a popover for picking a color. */
export function ColorPicker({ children, label, ...props }: ColorPickerProps) {
    return (
        <RACColorPicker {...props}>
            {({ color }) => (
                <DialogTrigger>
                    <Button
                        className='font-normal'
                        variant='secondary'
                    >
                        <ColorSwatch className='size-4' />
                        {label ?? color.toString('hex')}
                    </Button>
                    <Popover>
                        <PopoverDialog>{children ?? <ColorPickerContent />}</PopoverDialog>
                    </Popover>
                </DialogTrigger>
            )}
        </RACColorPicker>
    )
}
ColorPicker.displayName = 'ColorPicker'
