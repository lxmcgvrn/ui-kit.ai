'use client'

import type { Intent, Preset } from '@ui-kit.ai/theme'

import { Tooltip, TooltipTrigger } from '@ui-kit.ai/components'
import { PRESETS } from '@ui-kit.ai/theme'
import { LucideDices, LucideSwatchBook } from 'lucide-react'
import { Button as RACButton } from 'react-aria-components'
import { tv } from 'tailwind-variants'

import type { ThemeEditorController } from './use-theme-input'

import { seedFor, toCssColor } from './color'
import { applyRandomTheme } from './random-theme'

const presetStyles = tv({
    slots: {
        /* Overlapping coins, each ringed in the surface behind it. */
        chip: [
            'relative -ml-2 size-7 shrink-0 first:ml-0',
            'cursor-pointer rounded-full',
            'border-2 border-[var(--theme-default-bg-base-raised)]',
        ],
        icon: 'text-lo-contrast flex w-(--height-ui-element) flex-none justify-center [&_svg]:size-4',
        label: 'flex-none text-sm font-medium',
        row: 'mb-3 flex min-h-8 items-center gap-2',
        stack: 'flex flex-none items-center',
    },
    variants: {
        isActive: {
            true: { chip: 'z-10 ring-2 ring-[var(--theme-default-bg-primary)]' },
        },
        isRandom: {
            true: { chip: 'bg-tint text-lo-contrast grid place-items-center [&_svg]:size-3.5' },
        },
    },
})

export interface PresetChipsProps {
    theme: ThemeEditorController
}

interface PresetChipProps {
    isActive: boolean
    onPress: () => void
    preset: Preset
}

/** The presets row: a stack of swatches, plus a randomiser as the final chip. */
export function PresetChips({ theme }: PresetChipsProps) {
    const { icon, label, row, stack } = presetStyles()

    return (
        <div className={row()}>
            <span className={icon()}>
                <LucideSwatchBook />
            </span>

            <span className={label()}>Presets</span>

            <span className='flex-1' />

            <div className={stack()}>
                {PRESETS.map((preset) => (
                    <PresetChip
                        isActive={theme.preset === preset.name}
                        key={preset.name}
                        onPress={() => {
                            theme.selectPreset(preset.name)
                        }}
                        preset={preset}
                    />
                ))}

                <TooltipTrigger delay={200}>
                    <RACButton
                        aria-label='Surprise me — roll a random theme'
                        className={presetStyles({ isRandom: true }).chip()}
                        onPress={() => {
                            applyRandomTheme(theme)
                        }}
                    >
                        <LucideDices />
                    </RACButton>

                    <Tooltip>Surprise me</Tooltip>
                </TooltipTrigger>
            </div>
        </div>
    )
}

/** One shipped palette: a 145° gradient of its info, default and error seeds. */
function PresetChip({ isActive, onPress, preset }: PresetChipProps) {
    const cssColorOf = (intent: Intent) => toCssColor(seedFor(preset.input.colors[intent], 'light'))

    const gradient = `linear-gradient(145deg, ${cssColorOf('info')}, ${cssColorOf('default')}, ${cssColorOf('error')})`

    return (
        <TooltipTrigger delay={200}>
            <RACButton
                aria-label={preset.label}
                className={presetStyles({ isActive }).chip()}
                onPress={onPress}
                style={{ backgroundImage: gradient }}
            />

            <Tooltip>{preset.label}</Tooltip>
        </TooltipTrigger>
    )
}
