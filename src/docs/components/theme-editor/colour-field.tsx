'use client'

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
import { ColorPickerPanel } from './color-picker-panel'

/* Dashed means the engine picked it; a hand-picked colour takes the stock frame. */
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

export interface ColourFieldClearButtonProps {
    onPress: () => void
}

export interface ColourFieldInputProps {
    /** A generated colour reads but does not type; the pipette is the way in. */
    isReadOnly: boolean

    /** Names the colour the field holds, since no label heads it. */
    label: string
    onChange: (color: string) => void
    value: string
}

export interface ColourFieldPickerProps {
    /** Borders are translucent by design, so those colours get an opacity section. */
    hasAlpha: boolean
    onChange: (color: string) => void
    value: string
}

export interface ColourFieldProps {
    /** The swatch, the input, and the buttons the row hangs beside them. */
    children: ReactNode

    /** A generated colour draws as an outline; a hand-picked one takes a fill. */
    isGenerated: boolean
}

export interface ColourFieldSwatchProps {
    value: string
}

/** The frame one colour sits in. */
export function ColourField({ children, isGenerated }: ColourFieldProps) {
    return <FieldGroup className={fieldStyles({ isGenerated })}>{children}</FieldGroup>
}

/** Hands a colour back to derivation. */
export function ColourFieldClearButton({ onPress }: ColourFieldClearButtonProps) {
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

/** The colour as hex. Typing one is an edit, the same as reaching for the picker. */
export function ColourFieldInput({ isReadOnly, label, onChange, value }: ColourFieldInputProps) {
    // Stable across the parent's renders, so an unfinished hex survives them.
    const color = useMemo(() => parseColor(toCssColor(value)), [value])

    const onCommit = (committed: null | RACColor) => {
        if (committed == null) return

        const themed = toThemeColor(withAlphaFrom(committed, color).toString('rgba'))

        if (themed != null) onChange(themed)
    }

    return (
        <ColorField
            aria-label={label}
            className='min-w-0'
            isReadOnly={isReadOnly}
            onChange={onCommit}
            value={color}
        >
            <Input
                className='px-2 text-xs'
                isBorderless
            />
        </ColorField>
    )
}

/** The way in that is not typing. Opening it picks nothing; adjusting it does. */
export function ColourFieldPicker({ hasAlpha, onChange, value }: ColourFieldPickerProps) {
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

/** The colour itself, ahead of the hex that spells it out. */
export function ColourFieldSwatch({ value }: ColourFieldSwatchProps) {
    return (
        <ColorSwatch
            className='ml-2 size-4 shrink-0 rounded-full'
            color={toCssColor(value)}
        />
    )
}
