'use client'

import {
  ColorArea,
  ColorFieldGroup,
  ColorFieldGroupPickerButton,
  ColorSlider,
  ColorSwatch,
  FieldGroup,
  Input,
  Label,
} from '@ui-kit.ai/components'

export default function ColorFieldGroupWithPicker() {
  return (
    <div className='w-64'>
      <ColorFieldGroup defaultValue='#5000ff'>
        <Label>Accent</Label>
        <FieldGroup>
          <Input
            icon={<ColorSwatch className='size-4 rounded-full' />}
            isBorderless
          />
          <ColorFieldGroupPickerButton>
            <ColorArea
              className='mb-3 h-32 w-full'
              colorSpace='hsb'
              xChannel='saturation'
              yChannel='brightness'
            />
            <ColorSlider
              aria-label='Hue'
              channel='hue'
              colorSpace='hsb'
            />
          </ColorFieldGroupPickerButton>
        </FieldGroup>
      </ColorFieldGroup>
    </div>
  )
}
