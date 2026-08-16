'use client'

import type { ThemeSetting } from '@ui-kit.ai/theme'

import { THEME_SETTINGS } from '@ui-kit.ai/theme'

import { ThemeSlider } from './theme-slider'

/** Each stop, spelled for the reader. */
const LABELS: Record<ThemeSetting, string> = {
    lots: 'Lots',
    none: 'None',
    some: 'Some',
}

export interface SettingSliderProps {
    label: string
    onChange: (setting: ThemeSetting) => void
    value: ThemeSetting
}

/** One theme knob, walked along a detent per setting. */
export function SettingSlider({ label, onChange, value }: SettingSliderProps) {
    return (
        <ThemeSlider
            display={LABELS[value]}
            label={label}
            maxValue={THEME_SETTINGS.length - 1}
            minValue={0}
            onChange={(index) => {
                const next = THEME_SETTINGS[index]
                if (next != null) onChange(next)
            }}
            step={1}
            value={THEME_SETTINGS.indexOf(value)}
        />
    )
}
