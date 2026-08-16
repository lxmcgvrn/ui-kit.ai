'use client'

import type {
    ContrastWarning,
    Intent,
    Palettes,
    Scheme,
    ThemeInput,
    ThemeOverrides,
    ThemeSetting,
} from '@ui-kit.ai/theme'

import { DEFAULT_SETTING, DEFAULT_THEME, generateTheme, INTENTS, PRESETS } from '@ui-kit.ai/theme'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import type { TokenAddress } from './tokens'

import { seedFor, withSeed } from './color'
import { toContrastErrors } from './contrast-warnings'
import { applyThemeCss, removeThemeCss } from './inject'
import { overrideAt, withoutOverride, withOverride } from './overrides'
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
    /** Hands the dark scheme back to the light seed. */
    clearDarkSeed: (intent: Intent) => void

    /** Hands one token back to derivation. */
    clearOverride: (address: TokenAddress) => void

    /** The intent's contrast complaint, if one of its colours missed a target. */
    contrastError: (intent: Intent) => string | undefined
    css: () => string

    /** The input's depth, spelled out — presets inherit it rather than set it. */
    depth: ThemeSetting
    json: () => string

    /** The hand-picked colour at an address, if the user set one. */
    override: (address: TokenAddress) => string | undefined

    /** Every solved colour, hand-picked ones included. */
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

    /* The form holds no values: it carries the engine's complaints, keyed by field. */
    const { clearErrors, formState, setError } = useForm<{ colors: Record<Intent, string> }>()

    const reportContrast = useCallback(
        (warnings: readonly ContrastWarning[], overrides: ThemeOverrides | undefined) => {
            const messages = toContrastErrors(warnings, overrides)

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
                applyThemeCss(generated.css)
                writeStoredTheme(state.input)
                reportContrast(generated.warnings, state.input.overrides)
            },
            hasApplied.current ? DEBOUNCE_MS : 0
        )
        hasApplied.current = true

        return () => {
            clearTimeout(timeout)
        }
    }, [clearErrors, generated, reportContrast, state.input, state.isOverridden])

    const depth = state.input.depth ?? DEFAULT_SETTING
    const radius = state.input.radius ?? DEFAULT_SETTING
    const saturation = state.input.saturation ?? DEFAULT_SETTING

    const { errors } = formState

    const contrastError = useCallback(
        (intent: Intent) => errors.colors?.[intent]?.message,
        [errors.colors]
    )

    const css = useCallback(() => generated.css, [generated])

    const json = useCallback(
        () => JSON.stringify({ ...state.input, depth, radius, saturation }, null, 4),
        [depth, radius, saturation, state.input]
    )

    const override = useCallback(
        (address: TokenAddress) => overrideAt(state.input.overrides, address),
        [state.input.overrides]
    )

    const reset = useCallback(() => {
        setState(SHIPPED)
    }, [])

    const selectPreset = useCallback((name: string) => {
        setState((current) => {
            const preset = PRESETS.find((candidate) => candidate.name === name)
            if (preset == null) return current

            // A preset re-seeds the palette; hand-picked colours ride along.
            return {
                input: { ...current.input, ...preset.input },
                isOverridden: true,
                preset: name,
            }
        })
    }, [])

    const clearDarkSeed = useCallback((intent: Intent) => {
        setState((current) =>
            recolour(current, intent, seedFor(current.input.colors[intent], 'light'))
        )
    }, [])

    const setColor = useCallback((intent: Intent, scheme: Scheme, color: string) => {
        setState((current) =>
            recolour(current, intent, withSeed(current.input.colors[intent], scheme, color))
        )
    }, [])

    const clearOverride = useCallback((address: TokenAddress) => {
        setState((current) =>
            customise(current, { overrides: withoutOverride(current.input.overrides, address) })
        )
    }, [])

    const setOverride = useCallback((address: TokenAddress, color: string) => {
        setState((current) =>
            customise(current, { overrides: withOverride(current.input.overrides, address, color) })
        )
    }, [])

    const setDepth = useCallback((depth: ThemeSetting) => {
        setState((current) => customise(current, { depth }))
    }, [])

    const setRadius = useCallback((radius: ThemeSetting) => {
        setState((current) => customise(current, { radius }))
    }, [])

    const setSaturation = useCallback((saturation: ThemeSetting) => {
        setState((current) => customise(current, { saturation }))
    }, [])

    return {
        ...state,
        clearDarkSeed,
        clearOverride,
        contrastError,
        css,
        depth,
        json,
        override,
        palettes: generated.palettes,
        radius,
        reset,
        saturation,
        selectPreset,
        setColor,
        setDepth,
        setOverride,
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

/** Re-seeds one intent, leaving every hand-picked colour untouched. */
function recolour(current: State, intent: Intent, seed: ThemeInput['colors'][Intent]): State {
    return customise(current, { colors: { ...current.input.colors, [intent]: seed } })
}
