'use client'

import type { ContrastWarning, Intent, ThemeInput, ThemeSetting } from '@ui-kit.ai/theme'

import {
    DEFAULT_RADIUS,
    DEFAULT_SETTING,
    DEFAULT_THEME,
    generateTheme,
    INTENTS,
    PRESETS,
} from '@ui-kit.ai/theme'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { toContrastErrors } from './contrast-warnings'
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
    /** The intent's contrast complaint, if its seed missed a target. */
    contrastError: (intent: Intent) => string | undefined
    css: () => string

    /** The input's depth, spelled out — presets inherit it rather than set it. */
    depth: ThemeSetting
    json: () => string

    /** The input's radius, spelled out — presets inherit it rather than set it. */
    radius: number
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

    /* The form holds no values: it carries the engine's complaints, keyed by field. */
    const { clearErrors, formState, setError } = useForm<{ colors: Record<Intent, string> }>()

    const reportContrast = useCallback(
        (warnings: readonly ContrastWarning[]) => {
            const messages = toContrastErrors(warnings)

            clearErrors('colors')
            for (const intent of INTENTS) {
                const message = messages[intent]
                if (message == null) continue

                setError(`colors.${intent}`, { message, type: 'contrast' })
            }
        },
        [clearErrors, setError]
    )

    useEffect(() => {
        if (!state.isOverridden) {
            clearStoredTheme()
            removeThemeCss()
            clearErrors('colors')
            return
        }

        // The first apply races the paint; later edits wait for the debounce.
        const timeout = setTimeout(
            () => {
                const { css, warnings } = generateTheme(state.input)

                applyThemeCss(css)
                writeStoredTheme(state.input)
                reportContrast(warnings)
            },
            hasApplied.current ? DEBOUNCE_MS : 0
        )
        hasApplied.current = true

        return () => {
            clearTimeout(timeout)
        }
    }, [clearErrors, reportContrast, state.input, state.isOverridden])

    const depth = state.input.depth ?? DEFAULT_SETTING
    const radius = state.input.radius ?? DEFAULT_RADIUS
    const saturation = state.input.saturation ?? DEFAULT_SETTING

    const { errors } = formState

    const contrastError = useCallback(
        (intent: Intent) => errors.colors?.[intent]?.message,
        [errors.colors]
    )

    const css = useCallback(() => generateTheme(state.input).css, [state.input])

    const json = useCallback(
        () => JSON.stringify({ ...state.input, depth, radius, saturation }, null, 4),
        [depth, radius, saturation, state.input]
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
        contrastError,
        css,
        depth,
        json,
        radius,
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
