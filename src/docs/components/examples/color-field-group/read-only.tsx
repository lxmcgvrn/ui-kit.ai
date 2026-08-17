'use client'

import { ColorFieldGroup, ColorSwatch, FieldGroup, Input, Label } from '@ui-kit.ai/components'

export default function ColorFieldGroupReadOnly() {
    return (
        <div className='w-64'>
            <ColorFieldGroup
                defaultValue='#5000ff'
                isReadOnly
            >
                <Label>Accent</Label>
                <FieldGroup>
                    <Input
                        icon={<ColorSwatch className='size-4 rounded-full' />}
                        isBorderless
                    />
                </FieldGroup>
            </ColorFieldGroup>
        </div>
    )
}
