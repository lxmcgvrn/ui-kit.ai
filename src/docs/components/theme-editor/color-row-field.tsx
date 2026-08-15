'use client'

import {
    ColorSwatch,
    FieldGroup,
    Input,
    TextField,
    TextFieldClearButton,
} from '@ui-kit.ai/components'

import { toCssColor, toThemeColor } from './color'
import { ColorPickerButton } from './color-picker-button'

export interface ColorRowFieldProps {
    /** Local sizing for the row this field sits in. */
    className?: string

    /** Borders are translucent by design, so those colors get an opacity section. */
    hasAlpha: boolean

    /** A derived color is a readout: muted, uneditable, and left to the picker. */
    isDerived: boolean
    label: string
    onChange: (color: string) => void

    /** Hands the row back to derivation. Its presence is what shows the button. */
    onClear?: () => void
    value: string
}

/** One color in one scheme: a swatch, its value, a picker, and a way out. */
export function ColorRowField({
    className,
    hasAlpha,
    isDerived,
    label,
    onChange,
    onClear,
    value,
}: ColorRowFieldProps) {
    const onTextChange = (text: string) => {
        const typed = toThemeColor(text)

        if (typed != null) onChange(typed)
    }

    return (
        <TextField
            aria-label={label}
            className='w-full min-w-0'
            isReadOnly={isDerived}
            onChange={onTextChange}
            value={value}
        >
            <FieldGroup
                className={className}
                isBorderless={isDerived}
            >
                <Input
                    className={isDerived ? 'text-placeholder' : undefined}
                    icon={
                        <ColorSwatch
                            className='size-3.5'
                            color={toCssColor(value)}
                        />
                    }
                    isBorderless
                />

                {onClear == null ? null : <TextFieldClearButton onPress={onClear} />}

                <ColorPickerButton
                    hasAlpha={hasAlpha}
                    label={label}
                    onChange={onChange}
                    value={value}
                />
            </FieldGroup>
        </TextField>
    )
}
