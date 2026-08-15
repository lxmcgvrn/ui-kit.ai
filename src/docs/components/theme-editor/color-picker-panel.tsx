'use client'

import type { Color as RACColor } from 'react-aria-components'

import {
    ColorField,
    ColorSlider,
    ColorSwatch,
    Input,
    Label,
    Tab,
    TabList,
    TabPanel,
    Tabs,
} from '@ui-kit.ai/components'
import { parseColor } from 'react-aria-components'

import { toCssColor, toThemeColor } from './color'
import { ColorPickerFields } from './color-picker-fields'
import { INPUT_METHODS } from './color-picker-inputs'
import { usePickerPreferences } from './use-picker-preferences'

/** Tall enough for the widest input, so switching tabs never resizes the popover. */
const INPUT_HEIGHT = 'flex min-h-52 items-center'

export interface ColorPickerPanelProps {
    /** Borders are translucent by design, so those colors get an opacity section. */
    hasAlpha: boolean

    /** Fires on a selection, and never on opening or closing the popover. */
    onChange: (color: string) => void
    value: string
}

/** The picker itself: a way in, the color in numbers, and its opacity. */
export function ColorPickerPanel({ hasAlpha, onChange, value }: ColorPickerPanelProps) {
    const [{ method, mode }, remember] = usePickerPreferences()
    const color = parseColor(toCssColor(value))

    const onColorChange = (picked: RACColor) => {
        const themed = toThemeColor(picked.toString('rgba'))

        if (themed != null) onChange(themed)
    }

    return (
        <div className='flex flex-col gap-3'>
            <Tabs
                className='gap-3'
                onSelectionChange={(key) => {
                    const picked = INPUT_METHODS.find((candidate) => candidate.id === key)

                    if (picked != null) remember({ method: picked.id })
                }}
                selectedKey={method}
                variant='segmented'
            >
                <div className='flex items-center justify-between gap-3'>
                    <ColorSwatch
                        className='size-8 shrink-0'
                        color={color}
                    />

                    <TabList aria-label='Input method'>
                        {INPUT_METHODS.map(({ icon: Icon, id, label }) => (
                            <Tab
                                aria-label={label}
                                className='px-3'
                                id={id}
                                key={id}
                            >
                                <Icon className='size-4' />
                            </Tab>
                        ))}
                    </TabList>
                </div>

                {INPUT_METHODS.map(({ control: Control, id }) => (
                    <TabPanel
                        className={INPUT_HEIGHT}
                        id={id}
                        key={id}
                    >
                        <Control
                            onChange={onColorChange}
                            value={color}
                        />
                    </TabPanel>
                ))}
            </Tabs>

            <ColorPickerFields
                mode={mode}
                onChange={onColorChange}
                onModeChange={(next) => {
                    remember({ mode: next })
                }}
                value={color}
            />

            {hasAlpha ? (
                <div className='flex items-end gap-2'>
                    <ColorSlider
                        channel='alpha'
                        className='grow'
                        onChange={onColorChange}
                        value={color}
                    >
                        <Label className='mb-0.5 text-xs'>Opacity</Label>
                    </ColorSlider>

                    <ColorField
                        aria-label='Opacity'
                        channel='alpha'
                        className='w-16 shrink-0 grow-0'
                        onChange={(picked) => {
                            if (picked != null) onColorChange(picked)
                        }}
                        value={color}
                    >
                        <Input className='px-2 text-xs' />
                    </ColorField>
                </div>
            ) : null}
        </div>
    )
}
