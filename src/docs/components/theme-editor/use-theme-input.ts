'use client'

import type { Intent, Palettes, Scheme, ThemeInput, ThemeSetting } from '@ui-kit.ai/theme'

import { DEFAULT_SETTING, DEFAULT_THEME, generateTheme, PRESETS } from '@ui-kit.ai/theme'
import { useEffect, useMemo, useRef, useState } from 'react'

import type { ContrastReport } from './contrast-report'
import type { TokenAddress } from './overrides'

import { seedFor, withSeed } from './color'
import { toContrastReport } from './contrast-report'
import { applyThemeCss, removeThemeCss } from './inject'
import { overrideAt, withoutIntentOverrides, withoutOverride, withOverride } from './overrides'
import { clearStoredTheme, readStoredTheme, writeStoredTheme } from './storage'

/** Preset key for a hand-mixed palette. */
const CUSTOM_PRESET = 'custom'

const DEBOUNCE_MS = 80

/* Identity, not color matching: a value match would mislabel edits. */
const DEFAULT_PRESET = PRESETS.find((preset) => preset.input === DEFAULT_THEME)?.name

/** The site as shipped, with nothing injected and nothing stored. */
const SHIPPED: State = {
    input: DEFAULT_THEME,
    isOverridden: false,
    preset: DEFAULT_PRESET ?? CUSTOM_PRESET,
}

export interface ThemeEditorController extends State {
    /** Hands the dark scheme back to the light seed. */
    clearDarkSeed: (intent: Intent) => void

    /** Hands every token an intent hand-picks in one scheme back to derivation. */
    clearIntentOverrides: (intent: Intent, scheme: Scheme) => void

    /** Hands one token back to derivation. */
    clearOverride: (address: TokenAddress) => void

    /** Where the engine's contrast complaints land, root and leaf. */
    contrast: ContrastReport
    css: () => string

    /** The input's depth, spelled out — presets inherit it rather than set it. */
    depth: ThemeSetting
    json: () => string

    /** The hand-picked color at an address, if the user set one. */
    override: (address: TokenAddress) => string | undefined

    /** Every solved color, hand-picked ones included. */
    palettes: Palettes

    /** The input's radius, spelled out — presets inherit it rather than set it. */
    radius: ThemeSetting
    reset: () => void

    /** The input's saturation, spelled out — presets inherit it rather than set it. */
    saturation: ThemeSetting
    selectPreset: (name: string) => void
    setColor: (intent: Intent, scheme: Scheme, color: string) => void
    setDepth: (depth: ThemeSetting) => void
    setOverride: (address: TokenAddress, color: string) => void
    setRadius: (radius: ThemeSetting) => void
    setSaturation: (saturation: ThemeSetting) => void
}

interface State {
    input: ThemeInput
    /** `false` hands the site back to the shipped theme. */
    isOverridden: boolean
    preset: string
}

/** Owns the edited theme: hydration, live injection, and persistence. */
export function useThemeInput(): ThemeEditorController {
    const [state, setState] = useState<State>(initialState)
    const hasApplied = useRef(false)

    const generated = useMemo(() => generateTheme(state.input), [state.input])

    const contrast = useMemo(
        () => toContrastReport(generated.warnings, state.input.overrides),
        [generated.warnings, state.input.overrides]
    )

    useEffect(() => {
        if (!state.isOverridden) {
            clearStoredTheme()
            removeThemeCss()
            return
        }

        // The first apply races the paint; later edits wait for the debounce.
        const timeout = setTimeout(
            () => {
                applyThemeCss(generated.css)
                writeStoredTheme(state.input)
            },
            hasApplied.current ? DEBOUNCE_MS : 0
        )
        hasApplied.current = true

        return () => {
            clearTimeout(timeout)
        }
    }, [generated, state.input, state.isOverridden])

    const depth = state.input.depth ?? DEFAULT_SETTING
    const radius = state.input.radius ?? DEFAULT_SETTING
    const saturation = state.input.saturation ?? DEFAULT_SETTING

    return {
        ...state,
        clearDarkSeed: (intent) => {
            setState((current) =>
                recolor(current, intent, seedFor(current.input.colors[intent], 'light'))
            )
        },
        clearIntentOverrides: (intent, scheme) => {
            setState((current) =>
                customise(current, {
                    overrides: withoutIntentOverrides(current.input.overrides, intent, scheme),
                })
            )
        },
        clearOverride: (address) => {
            setState((current) =>
                customise(current, { overrides: withoutOverride(current.input.overrides, address) })
            )
        },
        contrast,
        css: () => generated.css,
        depth,
        json: () => JSON.stringify({ ...state.input, depth, radius, saturation }, null, 4),
        override: (address) => overrideAt(state.input.overrides, address),
        palettes: generated.palettes,
        radius,
        reset: () => {
            setState(SHIPPED)
        },
        saturation,
        selectPreset: (name) => {
            setState((current) => {
                const preset = PRESETS.find((candidate) => candidate.name === name)
                if (preset == null) return current

                // A preset re-seeds the palette; hand-picked colors ride along.
                return {
                    input: { ...current.input, ...preset.input },
                    isOverridden: true,
                    preset: name,
                }
            })
        },
        setColor: (intent, scheme, color) => {
            setState((current) =>
                recolor(current, intent, withSeed(current.input.colors[intent], scheme, color))
            )
        },
        setDepth: (next) => {
            setState((current) => customise(current, { depth: next }))
        },
        setOverride: (address, color) => {
            setState((current) =>
                customise(current, {
                    overrides: withOverride(current.input.overrides, address, color),
                })
            )
        },
        setRadius: (next) => {
            setState((current) => customise(current, { radius: next }))
        },
        setSaturation: (next) => {
            setState((current) => customise(current, { saturation: next }))
        },
    }
}

/** Every hand edit lands the same way: override on, preset switched to Custom. */
function customise(current: State, changes: Partial<ThemeInput>): State {
    return {
        input: { ...current.input, ...changes },
        isOverridden: true,
        preset: CUSTOM_PRESET,
    }
}

function initialState(): State {
    const stored = readStoredTheme()
    if (stored == null) return SHIPPED

    // Storage keeps colors, never the preset name.
    return { input: stored, isOverridden: true, preset: CUSTOM_PRESET }
}

/** Re-seeds one intent, leaving every hand-picked color untouched. */
function recolor(current: State, intent: Intent, seed: ThemeInput['colors'][Intent]): State {
    return customise(current, { colors: { ...current.input.colors, [intent]: seed } })
}
