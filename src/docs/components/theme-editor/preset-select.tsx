'use client'

import type { OptionsSchema } from '@ui-kit.ai/components'

import { ColorSwatch, Label, Select, SelectButton } from '@ui-kit.ai/components'
import { PRESETS } from '@ui-kit.ai/theme'

import { FIELD_ROW } from './field'
import { CUSTOM_PRESET } from './use-theme-input'

const ITEMS: OptionsSchema<'listbox'>[] = [
    { id: CUSTOM_PRESET, textValue: 'Custom' },
    ...PRESETS.map((preset) => ({
        icon: (
            <ColorSwatch
                className='size-4'
                color={preset.input.colors.default}
            />
        ),
        id: preset.name,
        textValue: preset.label,
    })),
]

export interface PresetSelectProps {
    onChange: (name: string) => void
    value: string
}

/** Picks a shipped palette, or reports that the colours are hand-mixed. */
export function PresetSelect({ onChange, value }: PresetSelectProps) {
    return (
        <Select
            className={FIELD_ROW}
            items={ITEMS}
            onSelectionChange={(key) => {
                onChange(String(key))
            }}
            selectedKey={value}
        >
            <Label className='mb-0'>Preset</Label>
            <SelectButton />
        </Select>
    )
}
