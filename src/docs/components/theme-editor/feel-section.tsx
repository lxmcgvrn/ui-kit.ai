'use client'

import type { ThemeSetting } from '@ui-kit.ai/theme'
import type { ReactNode } from 'react'
import type { Selection as RACSelection } from 'react-aria-components'

import { ToggleButton, ToggleButtonGroup } from '@ui-kit.ai/components'
import { THEME_SETTINGS } from '@ui-kit.ai/theme'
import { LucideContrast, LucideLayers2, LucideSpline } from 'lucide-react'
import { tv } from 'tailwind-variants'

import type { ThemeEditorController } from './use-theme-input'

type FeelKnob = 'depth' | 'radius' | 'saturation'

const STOP_LABELS: Record<ThemeSetting, string> = { lots: 'Lots', none: 'None', some: 'Some' }

interface KnobRow {
    icon: ReactNode
    key: FeelKnob
    label: string
}

const ROWS: readonly KnobRow[] = [
    { icon: <LucideSpline />, key: 'radius', label: 'Radius' },
    { icon: <LucideLayers2 />, key: 'depth', label: 'Depth' },
    { icon: <LucideContrast />, key: 'saturation', label: 'Saturation' },
]

const feelStyles = tv({
    slots: {
        heading: 'text-lo-contrast mb-3 text-xs font-semibold tracking-widest uppercase',
        icon: 'text-lo-contrast flex w-(--height-ui-element) flex-none justify-center [&_svg]:size-4',
        label: 'flex-1 text-sm font-medium',
        row: 'flex min-h-8 items-center gap-2',
        rows: 'flex flex-col gap-2',
        section: 'mt-6',
    },
})

export interface FeelSectionProps {
    theme: ThemeEditorController
}

interface KnobSegmentsProps {
    knob: FeelKnob
    onChange: (setting: ThemeSetting) => void
    value: ThemeSetting
}

/** The three style knobs, each a three-stop toggle group. */
export function FeelSection({ theme }: FeelSectionProps) {
    const { heading, icon, label, row, rows, section } = feelStyles()

    const values: Record<FeelKnob, ThemeSetting> = {
        depth: theme.depth,
        radius: theme.radius,
        saturation: theme.saturation,
    }

    const setters: Record<FeelKnob, (setting: ThemeSetting) => void> = {
        depth: theme.setDepth,
        radius: theme.setRadius,
        saturation: theme.setSaturation,
    }

    return (
        <div className={section()}>
            <h3 className={heading()}>Feel</h3>

            <div className={rows()}>
                {ROWS.map((knob) => (
                    <div
                        className={row()}
                        key={knob.key}
                    >
                        <span className={icon()}>{knob.icon}</span>
                        <span className={label()}>{knob.label}</span>

                        <KnobSegments
                            knob={knob.key}
                            onChange={setters[knob.key]}
                            value={values[knob.key]}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

function isThemeSetting(value: string): value is ThemeSetting {
    return (THEME_SETTINGS as readonly string[]).includes(value)
}

function KnobSegments({ knob, onChange, value }: KnobSegmentsProps) {
    const onSelectionChange = (keys: RACSelection) => {
        if (keys === 'all') return

        const [key] = keys
        if (typeof key === 'string' && isThemeSetting(key)) onChange(key)
    }

    return (
        <ToggleButtonGroup
            aria-label={`${knob} amount`}
            disallowEmptySelection
            isAttached
            onSelectionChange={onSelectionChange}
            selectedKeys={[value]}
            selectionMode='single'
        >
            {THEME_SETTINGS.map((setting) => (
                <ToggleButton
                    id={setting}
                    key={setting}
                >
                    {STOP_LABELS[setting]}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}
