'use client'

import { useState } from 'react'

/** The spelling the editing fields use. Never how the theme stores the color. */
export type ColorMode = 'hex' | 'hsb' | 'hsl' | 'rgb'

/** How the user aims the color: sliders, a plane, or a ring. */
export type InputMethod = 'area' | 'sliders' | 'wheel'

export interface PickerPreferences {
    method: InputMethod
    mode: ColorMode
}

/* Outlives every popover, so the next one opens on the last choice. */
let remembered: PickerPreferences = { method: 'sliders', mode: 'hex' }

/** The picker's last input method and color mode, kept for as long as the tab. */
export function usePickerPreferences(): [
    PickerPreferences,
    (changes: Partial<PickerPreferences>) => void,
] {
    const [preferences, setPreferences] = useState(remembered)

    const remember = (changes: Partial<PickerPreferences>) => {
        remembered = { ...remembered, ...changes }
        setPreferences(remembered)
    }

    return [preferences, remember]
}
