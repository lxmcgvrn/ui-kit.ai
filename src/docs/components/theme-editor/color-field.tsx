'use client'

import type { ColorFieldGroupProps } from '@ui-kit.ai/components'
import type { ReactNode } from 'react'

import {
  ColorFieldGroup,
  ColorFieldGroupClearButton,
  ColorFieldGroupPickerButton,
  ColorSwatch,
  FieldGroup,
  Input,
  Tooltip,
  TooltipTrigger,
} from '@ui-kit.ai/components'
import { tv } from 'tailwind-variants'

import { toCssColor, toThemeColor } from './color'
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

export interface ColorFieldHexProps extends Omit<ColorFieldGroupProps, 'className' | 'defaultValue' | 'onChange' | 'value'> {
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
}

/** One color as hex. Typing one is an edit, the same as reaching for the picker. */
export function ColorFieldHex({ children, onChange, value, ...props }: ColorFieldHexProps) {
  /* The field spans the whole row, so a `Label` inside it names the color. */
  return (
    <ColorFieldGroup
      {...props}
      onChange={(picked) => {
        const themed = toThemeColor(picked.toString('rgba'))

        if (themed != null) onChange(themed)
      }}
      // The same text for the same color, so an unfinished hex survives a render.
      value={toCssColor(value)}
    >
      {children}
    </ColorFieldGroup>
  )
}

/** Hands a color back to derivation. */
export function FieldButtonClear({ onPress }: { onPress: () => void }) {
  return (
    <TooltipTrigger delay={0}>
      <ColorFieldGroupClearButton
        aria-label='Clear override'
        excludeFromTabOrder={false}
        onPress={onPress}
      />

      <Tooltip placement='top'>Clear override</Tooltip>
    </TooltipTrigger>
  )
}

/** The way in that is not typing. Opening it picks nothing; adjusting it does. */
export function FieldButtonPicker({ hasAlpha, onChange, value }: FieldButtonPickerProps) {
  return (
    <TooltipTrigger delay={0}>
      <ColorFieldGroupPickerButton aria-label='Set override'>
        <ColorPickerPanel
          hasAlpha={hasAlpha}
          onChange={onChange}
          value={value}
        />
      </ColorFieldGroupPickerButton>

      <Tooltip placement='top'>Set override</Tooltip>
    </TooltipTrigger>
  )
}

/** One color, framed: its swatch, the hex it holds, then whatever else edits it. */
export function FieldGroupColor({ children, isGenerated }: FieldGroupColorProps) {
  return (
    <FieldGroup className={fieldStyles({ isGenerated })}>
      {/* Both the swatch and the hex read the color the field group holds. */}
      <ColorSwatch className='ml-2 size-4 shrink-0 rounded-full' />

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
