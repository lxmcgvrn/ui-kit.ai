'use client'

import { Label, Slider, SliderOutput, SliderThumb, SliderTrack } from '@ui-kit.ai/components'

export default function SliderRange() {
    return (
        <Slider defaultValue={[25, 75]}>
            <div className='flex items-center justify-between'>
                <Label>This is a label for a field</Label>
                <SliderOutput />
            </div>
            <SliderTrack>
                <SliderThumb index={0} />
                <SliderThumb index={1} />
            </SliderTrack>
        </Slider>
    )
}
