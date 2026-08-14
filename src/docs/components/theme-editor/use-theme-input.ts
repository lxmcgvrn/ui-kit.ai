'use client'

import type { Intent, ThemeInput } from '@ui-kit.ai/theme'

import { DEFAULT_THEME, PRESETS, themeCss } from '@ui-kit.ai/theme'
import { useCallback, useEffect, useRef, useState } from 'react'

import { applyThemeCss, removeThemeCss } from './inject'
import { clearStoredTheme, readStoredTheme, writeStoredTheme } from './storage'

/** Preset key for a hand-mixed palette. */
export const CUSTOM_PRESET = 'custom'

const DEBOUNCE_MS = 80

/* Identity, not colour matching: a value match would mislabel edits. */
const DEFAULT_PRESET = PRESETS.find((preset) => preset.input === DEFAULT_THEME)?.name

export interface ThemeEditorController extends State {
    css: () => string
    json: () => string
    reset: () => void
    selectPreset: (name: string) => void
    setColor: (intent: Intent, color: string) => void
    setRadius: (radius: number) => void
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

    const css = useCallback(() => themeCss(state.input), [state.input])

    const json = useCallback(() => JSON.stringify(state.input, null, 4), [state.input])

    const reset = useCallback(() => {
        setState({
            input: DEFAULT_THEME,
            isOverridden: false,
            preset: DEFAULT_PRESET ?? CUSTOM_PRESET,
        })
    }, [])

    const selectPreset = useCallback((name: string) => {
        const preset = PRESETS.find((candidate) => candidate.name === name)
        if (preset == null) return

        setState({ input: preset.input, isOverridden: true, preset: name })
    }, [])

    const setColor = useCallback((intent: Intent, color: string) => {
        setState((current) => ({
            input: { ...current.input, colors: { ...current.input.colors, [intent]: color } },
            isOverridden: true,
            preset: CUSTOM_PRESET,
        }))
    }, [])

    const setRadius = useCallback((radius: number) => {
        setState((current) => ({
            input: { ...current.input, radius },
            isOverridden: true,
            preset: CUSTOM_PRESET,
        }))
    }, [])

    return { ...state, css, json, reset, selectPreset, setColor, setRadius }
}

function initialState(): State {
    const stored = readStoredTheme()

    if (stored == null) {
        return {
            input: DEFAULT_THEME,
            isOverridden: false,
            preset: DEFAULT_PRESET ?? CUSTOM_PRESET,
        }
    }

    // Storage keeps colours, never the preset name.
    return { input: stored, isOverridden: true, preset: CUSTOM_PRESET }
}
