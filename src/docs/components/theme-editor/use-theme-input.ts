'use client'

import type { Intent, ThemeInput, ThemeSetting } from '@ui-kit.ai/theme'

import { DEFAULT_SETTING, DEFAULT_THEME, PRESETS, themeCss } from '@ui-kit.ai/theme'
import { useCallback, useEffect, useRef, useState } from 'react'

import { applyThemeCss, removeThemeCss } from './inject'
import { clearStoredTheme, readStoredTheme, writeStoredTheme } from './storage'

/** Preset key for a hand-mixed palette. */
export const CUSTOM_PRESET = 'custom'

const DEBOUNCE_MS = 80

/* Identity, not colour matching: a value match would mislabel edits. */
const DEFAULT_PRESET = PRESETS.find((preset) => preset.input === DEFAULT_THEME)?.name

/** The site as shipped, with nothing injected and nothing stored. */
const SHIPPED: State = {
    input: DEFAULT_THEME,
    isOverridden: false,
    preset: DEFAULT_PRESET ?? CUSTOM_PRESET,
}

export interface ThemeEditorController extends State {
    css: () => string

    /** The input's depth, spelled out — presets inherit it rather than set it. */
    depth: ThemeSetting
    json: () => string
    reset: () => void

    /** The input's saturation, spelled out — presets inherit it rather than set it. */
    saturation: ThemeSetting
    selectPreset: (name: string) => void
    setColor: (intent: Intent, color: string) => void
    setDepth: (depth: ThemeSetting) => void
    setRadius: (radius: number) => void
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

    useEffect(() => {
        if (!state.isOverridden) {
            clearStoredTheme()
            removeThemeCss()
            return
        }

        // The first apply races the paint; later edits wait for the debounce.
        const timeout = setTimeout(
            () => {
                applyThemeCss(state.input)
                writeStoredTheme(state.input)
            },
            hasApplied.current ? DEBOUNCE_MS : 0
        )
        hasApplied.current = true

        return () => {
            clearTimeout(timeout)
        }
    }, [state.input, state.isOverridden])

    const depth = state.input.depth ?? DEFAULT_SETTING
    const saturation = state.input.saturation ?? DEFAULT_SETTING

    const css = useCallback(() => themeCss(state.input), [state.input])

    const json = useCallback(
        () => JSON.stringify({ ...state.input, depth, saturation }, null, 4),
        [depth, saturation, state.input]
    )

    const reset = useCallback(() => {
        setState(SHIPPED)
    }, [])

    const selectPreset = useCallback((name: string) => {
        const preset = PRESETS.find((candidate) => candidate.name === name)
        if (preset == null) return

        setState({ input: preset.input, isOverridden: true, preset: name })
    }, [])

    const setColor = useCallback((intent: Intent, color: string) => {
        setState((current) =>
            customise(current, { colors: { ...current.input.colors, [intent]: color } })
        )
    }, [])

    const setDepth = useCallback((depth: ThemeSetting) => {
        setState((current) => customise(current, { depth }))
    }, [])

    const setRadius = useCallback((radius: number) => {
        setState((current) => customise(current, { radius }))
    }, [])

    const setSaturation = useCallback((saturation: ThemeSetting) => {
        setState((current) => customise(current, { saturation }))
    }, [])

    return {
        ...state,
        css,
        depth,
        json,
        reset,
        saturation,
        selectPreset,
        setColor,
        setDepth,
        setRadius,
        setSaturation,
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

    // Storage keeps colours, never the preset name.
    return { input: stored, isOverridden: true, preset: CUSTOM_PRESET }
}
