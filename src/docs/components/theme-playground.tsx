'use client'

import type { OptionsSchema } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

import {
    Alert,
    Button,
    ColorField,
    ColorSlider,
    ColorSwatch,
    DialogTrigger,
    FieldButton,
    FieldGroup,
    Input,
    Label,
    Popover,
    PopoverDialog,
    Select,
    SelectButton,
    Tag,
} from '@ui-kit.ai/components'
import { ColorPalette, PRESETS } from '@ui-kit.ai/theme'
import { AlertTriangleIcon, CheckCircleIcon, InfoIcon, PipetteIcon } from 'lucide-react'
import { useState } from 'react'

type Palette = {
    accent: string
    error: string
    success: string
    warning: string
}

type Preset = keyof typeof PRESETS

const PREVIEW_SELECTOR = 'uikit-theme-preview'

const PRESET_ITEMS: OptionsSchema<'listbox', Preset>[] = Object.entries(PRESETS).map(
    ([id, value]) => ({
        icon: (
            <ColorSwatch
                className='size-4'
                color={value.accent}
            />
        ),
        id: id as Preset,
        textValue: id.charAt(0).toUpperCase() + id.slice(1),
    })
)

/**
 * A cut-down version of the old site's theme editor: pick a preset (or mix your
 * own palette) and see the generated ui-kit theme applied to live components.
 *
 * The generated CSS is scoped to the preview container, so it doesn't fight
 * with the site-wide theme.
 */
export function ThemePlayground() {
    const [palette, setPalette] = useState<Palette>(PRESETS.professional)

    const css = new ColorPalette(palette).css({
        overrideTwColors: false,
        selector: `.${PREVIEW_SELECTOR}`,
    })

    const setChannel = (channel: keyof Palette) => (value: string) => {
        setPalette((current) => ({ ...current, [channel]: value }))
    }

    return (
        <div className='not-prose my-6 grid gap-6 md:grid-cols-[2fr_3fr]'>
            <style dangerouslySetInnerHTML={{ __html: css }} />

            <div>
                <Select
                    aria-label='Theme preset'
                    className='mb-4 grid grid-cols-[1fr_2fr] items-center gap-4'
                    items={PRESET_ITEMS}
                    onSelectionChange={(key) => {
                        const preset = PRESETS[key as Preset]
                        setPalette(preset)
                    }}
                    selectedKey={
                        Object.keys(PRESETS).find(
                            (id) => PRESETS[id as Preset].accent === palette.accent
                        ) as Preset | undefined
                    }
                >
                    <Label>Preset</Label>
                    <SelectButton />
                </Select>

                <ThemeColorPicker
                    label='Accent'
                    setValue={setChannel('accent')}
                    value={palette.accent}
                />
                <ThemeColorPicker
                    label='Error'
                    setValue={setChannel('error')}
                    value={palette.error}
                />
                <ThemeColorPicker
                    label='Success'
                    setValue={setChannel('success')}
                    value={palette.success}
                />
                <ThemeColorPicker
                    label='Warning'
                    setValue={setChannel('warning')}
                    value={palette.warning}
                />
            </div>

            <div
                className={`${PREVIEW_SELECTOR} bg-base-raised flex flex-col gap-4 rounded-lg p-4`}
            >
                <Alert
                    icon={<InfoIcon />}
                    text='You do not have any active subscriptions.'
                />
                <Alert
                    icon={<AlertTriangleIcon />}
                    intent='error'
                    text='Your last payment was unsuccessful.'
                />
                <Alert
                    icon={<AlertTriangleIcon />}
                    intent='warning'
                    text='Your subscription will expire in 3 days.'
                />
                <Alert
                    icon={<CheckCircleIcon />}
                    intent='success'
                    text='Your payment was successful.'
                />
                <div className='flex flex-wrap gap-2'>
                    <Button>Primary</Button>
                    <Button variant='secondary'>Secondary</Button>
                    <Button variant='tertiary'>Tertiary</Button>
                </div>
                <div className='flex flex-wrap gap-2'>
                    <Tag>Default</Tag>
                    <Tag intent='error'>Error</Tag>
                    <Tag intent='warning'>Warning</Tag>
                    <Tag intent='success'>Success</Tag>
                </div>
            </div>
        </div>
    )
}

function ThemeColorPicker({
    label,
    setValue,
    value,
}: {
    label: string
    setValue: (value: string) => void
    value: string
}) {
    const onChange = (color: ComponentProps<typeof ColorField>['value']) => {
        setValue(color != null ? color.toString('hex') : '#ffffff')
    }

    return (
        <ColorField
            className='mb-2 grid grid-cols-[1fr_2fr] items-center gap-4'
            onChange={onChange}
            value={value}
        >
            <Label>{label}</Label>
            <FieldGroup>
                <Input
                    icon={
                        <ColorSwatch
                            className='size-4'
                            color={value}
                        />
                    }
                    isBorderless
                />
                <DialogTrigger>
                    <FieldButton>
                        <PipetteIcon />
                    </FieldButton>
                    <Popover>
                        <PopoverDialog className='min-w-64'>
                            <ColorSlider
                                channel='hue'
                                className='mb-4'
                                colorSpace='hsl'
                                onChange={onChange}
                                value={value}
                            >
                                <Label>Hue</Label>
                            </ColorSlider>
                            <ColorSlider
                                channel='saturation'
                                className='mb-4'
                                colorSpace='hsl'
                                onChange={onChange}
                                value={value}
                            >
                                <Label>Saturation</Label>
                            </ColorSlider>
                            <ColorSlider
                                channel='lightness'
                                colorSpace='hsl'
                                onChange={onChange}
                                value={value}
                            >
                                <Label>Lightness</Label>
                            </ColorSlider>
                        </PopoverDialog>
                    </Popover>
                </DialogTrigger>
            </FieldGroup>
        </ColorField>
    )
}
