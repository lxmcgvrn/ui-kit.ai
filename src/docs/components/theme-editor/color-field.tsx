'use client'

import type { ColorFieldProps } from '@ui-kit.ai/components'
import type { ReactNode } from 'react'
import type { Color as RACColor } from 'react-aria-components'

import {
    ColorField,
    ColorSwatch,
    DialogTrigger,
    FieldButton,
    FieldGroup,
    Input,
    Popover,
    PopoverDialog,
    Tooltip,
    TooltipTrigger,
} from '@ui-kit.ai/components'
import { LucidePipette, LucideX } from 'lucide-react'
import { useMemo } from 'react'
import { parseColor } from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { toCssColor, toThemeColor, withAlphaFrom } from './color'
import { ColorPickerPanel } from './color-picker'

/* Dashed means the engine picked it; a hand-picked color takes the stock frame. */
const fieldStyles = tv({
    base: 'w-40 flex-none self-center font-mono text-xs',
    variants: {
        isGenerated: {
            false: '',
            // A full 1px, not the 0.5px hairline: a half-pixel dash reads as a rule.
            true: 'border-[1px] border-dashed',
        },
    },
})

export interface ColorFieldHexProps
    extends Omit<ColorFieldProps, 'className' | 'onChange' | 'value'> {
    /** The `Label` that names the color, and everything that acts on it. */
    children: ReactNode

    /** Lays the field's parts out as a row. */
    className?: string

    /** Fires with the theme's own oklch, once the typed text parses. */
    onChange: (color: string) => void
    value: string
}

export interface FieldButtonPickerProps {
    /** Borders are translucent by design, so those colors get an opacity section. */
    hasAlpha: boolean
    onChange: (color: string) => void
    value: string
}

export interface FieldGroupColorProps {
    /** Whatever acts on the color besides typing it: the picker, and clearing it. */
    children: ReactNode

    /** A generated color draws as an outline; a hand-picked one takes a fill. */
    isGenerated: boolean

    /** The color the swatch shows. */
    value: string
}

/** One color as hex. Typing one is an edit, the same as reaching for the picker. */
export function ColorFieldHex({ children, onChange, value, ...props }: ColorFieldHexProps) {
    // Stable across the parent's renders, so an unfinished hex survives them.
    const color = useMemo(() => parseColor(toCssColor(value)), [value])

    const onCommit = (committed: null | RACColor) => {
        if (committed == null) return

        const themed = toThemeColor(withAlphaFrom(committed, color).toString('rgba'))

        if (themed != null) onChange(themed)
    }

    /* The field spans the whole row, so a `Label` inside it names the color. */
    return (
        <ColorField
            {...props}
            onChange={onCommit}
            value={color}
        >
            {children}
        </ColorField>
    )
}

/** Hands a color back to derivation. */
export function FieldButtonClear({ onPress }: { onPress: () => void }) {
    return (
        <TooltipTrigger delay={0}>
            <FieldButton
                aria-label='Clear override'
                excludeFromTabOrder={false}
                onPress={onPress}
            >
                <LucideX />
            </FieldButton>

            <Tooltip placement='top'>Clear override</Tooltip>
        </TooltipTrigger>
    )
}

/** The way in that is not typing. Opening it picks nothing; adjusting it does. */
export function FieldButtonPicker({ hasAlpha, onChange, value }: FieldButtonPickerProps) {
    return (
        <DialogTrigger>
            <TooltipTrigger delay={0}>
                <FieldButton aria-label='Set override'>
                    <LucidePipette />
                </FieldButton>

                <Tooltip placement='top'>Set override</Tooltip>
            </TooltipTrigger>

            <Popover>
                <PopoverDialog className='w-72'>
                    <ColorPickerPanel
                        hasAlpha={hasAlpha}
                        onChange={onChange}
                        value={value}
                    />
                </PopoverDialog>
            </Popover>
        </DialogTrigger>
    )
}

/** One color, framed: its swatch, the hex it holds, then whatever else edits it. */
export function FieldGroupColor({ children, isGenerated, value }: FieldGroupColorProps) {
    return (
        <FieldGroup className={fieldStyles({ isGenerated })}>
            <ColorSwatch
                className='ml-2 size-4 shrink-0 rounded-full'
                color={toCssColor(value)}
            />

            {/* The hex gives way to the buttons rather than pushing them out of frame. */}
            <div className='min-w-0 grow'>
                <Input
                    className='px-2 text-xs'
                    isBorderless
                />
            </div>

            {children}
        </FieldGroup>
    )
}
