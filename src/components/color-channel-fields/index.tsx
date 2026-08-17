import type { ComponentProps } from 'react'
import type { ColorSpace as RACColorSpace } from 'react-aria-components'

import { twMerge } from 'tailwind-merge'

import { ColorField } from '../color-field'
import { Input } from '../input'
import { Label } from '../label'

/** Not re-exported by react-aria-components — pulled off the field it types. */
type ColorChannel = NonNullable<ComponentProps<typeof ColorField>['channel']>

/** The channels a color space spells out, left to right. */
const SPACE_CHANNELS: Record<RACColorSpace, readonly ColorChannel[]> = {
    hsb: ['hue', 'saturation', 'brightness'],
    hsl: ['hue', 'saturation', 'lightness'],
    rgb: ['red', 'green', 'blue'],
}

export interface ColorChannelFieldsProps {
    /** Classes for the row the fields sit in. */
    className?: string

    /** Which channel set to render: rgb, hsl, or hsb. */
    colorSpace: RACColorSpace
}

/** A color space's channels as labeled fields, reading the `ColorPicker` around it. */
export function ColorChannelFields({ className, colorSpace }: ColorChannelFieldsProps) {
    return (
        <div className={twMerge('flex gap-1.5', className)}>
            {SPACE_CHANNELS[colorSpace].map((channel) => (
                <ColorField
                    channel={channel}
                    className='flex-1'
                    colorSpace={colorSpace}
                    key={channel}
                >
                    {/* The initial heads the field; the whole name still reaches screen readers. */}
                    <Label className='mb-0.5'>
                        {channel.charAt(0).toUpperCase()}
                        <span className='sr-only'>{channel.slice(1)}</span>
                    </Label>

                    <Input />
                </ColorField>
            ))}
        </div>
    )
}
ColorChannelFields.displayName = 'ColorChannelFields'
