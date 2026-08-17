'use client'

import type { Intent, Preset } from '@ui-kit.ai/theme'

import { Label, Tooltip, TooltipTrigger } from '@ui-kit.ai/components'
import { INTENTS, PRESETS } from '@ui-kit.ai/theme'
import { LucideDices, LucideSwatchBook } from 'lucide-react'
import { Button as RACButton } from 'react-aria-components'
import { tv } from 'tailwind-variants'

import type { ThemeEditorController } from './use-theme-input'

import { seedFor, toCssColor } from './color'
import { SettingRow, useLabelId } from './setting-row'

/** One hue family's tasteful range, so a roll still reads as that intent. */
interface SeedRange {
    chroma: readonly [number, number]
    hue: readonly [number, number]
    lightness: readonly [number, number]
}

/* Ranges follow the shipped presets' own spread, so a roll looks intentional. */
const BRAND_RANGE: SeedRange = { chroma: [0.12, 0.2], hue: [0, 360], lightness: [0.55, 0.78] }
const ERROR_RANGE: SeedRange = { chroma: [0.13, 0.21], hue: [-10, 40], lightness: [0.55, 0.78] }
const SUCCESS_RANGE: SeedRange = { chroma: [0.1, 0.16], hue: [140, 180], lightness: [0.55, 0.78] }
const WARNING_RANGE: SeedRange = { chroma: [0.07, 0.15], hue: [65, 105], lightness: [0.83, 0.94] }

const presetStyles = tv({
    slots: {
        /* Overlapping coins, each ringed in the surface behind it. */
        chip: [
            'relative -ml-2 size-7 shrink-0 first:ml-0',
            'cursor-pointer rounded-full',
            'border-2 border-[var(--theme-default-bg-base-raised)]',
        ],
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

/** The presets row: a stack of swatches, plus a randomiser as the final chip. */
export function PresetChips({ theme }: { theme: ThemeEditorController }) {
    return (
        <div className='mb-3'>
            <SettingRow icon={<LucideSwatchBook />}>
                <Label>Presets</Label>

                <GroupPresets theme={theme} />
            </SettingRow>
        </div>
    )
}

/** Rolls a random palette into the controller, the same way picking a preset does. */
function applyRandomTheme(controller: ThemeEditorController) {
    const colors = randomThemeColors()

    for (const intent of INTENTS) {
        controller.setColor(intent, 'light', colors[intent])
        // Starts both schemes aligned — no stale hand-picked dark seed left behind.
        controller.clearDarkSeed(intent)
    }
}

/** Every preset, and the randomiser, under the row's own label. */
function GroupPresets({ theme }: { theme: ThemeEditorController }) {
    const labelId = useLabelId()

    return (
        <div
            aria-labelledby={labelId}
            className={presetStyles().stack()}
            role='group'
        >
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
    )
}

/** One shipped palette: a 145° gradient of its info, default and error seeds. */
function PresetChip({
    isActive,
    onPress,
    preset,
}: {
    isActive: boolean
    onPress: () => void
    preset: Preset
}) {
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

function randomBetween([min, max]: readonly [number, number]): number {
    return min + Math.random() * (max - min)
}

function randomSeed({ chroma, hue, lightness }: SeedRange): string {
    const l = randomBetween(lightness).toFixed(4)
    const c = randomBetween(chroma).toFixed(4)
    const h = (((randomBetween(hue) % 360) + 360) % 360).toFixed(2)

    return `oklch(${l} ${c} ${h})`
}

/** A fresh seed per intent — default and info share a brand roll, as presets do. */
function randomThemeColors(): Record<Intent, string> {
    const brand = randomSeed(BRAND_RANGE)

    return {
        default: brand,
        error: randomSeed(ERROR_RANGE),
        info: brand,
        success: randomSeed(SUCCESS_RANGE),
        warning: randomSeed(WARNING_RANGE),
    }
}
