import type { Scheme, ThemeInput } from '@ui-kit.ai/theme'
import type { ComponentType, ReactNode } from 'react'

import { DEFAULT_SETTING, DEFAULT_THEME, generateTheme } from '@ui-kit.ai/theme'
import { useCallback, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'

import type { ThemeEditorController } from '../src/docs/components/theme-editor/use-theme-input'

import { seedFor, withSeed } from '../src/docs/components/theme-editor/color'
import { ColorTree } from '../src/docs/components/theme-editor/color-tree'
import { toContrastReport } from '../src/docs/components/theme-editor/contrast-report'
import {
    overrideAt,
    withoutIntentOverrides,
    withoutOverride,
    withOverride,
} from '../src/docs/components/theme-editor/overrides'

/** A mid-tone seed the solver cannot satisfy, so the error icons show up. */
const ORANGE = 'oklch(0.7 0.19 45)'

/** Dark aimed away from light, with two of its tokens hand-picked. */
const AIMED: ThemeInput = {
    colors: { ...DEFAULT_THEME.colors, default: { dark: ORANGE, light: ORANGE } },
    overrides: {
        default: {
            'bg-tint': { dark: 'oklch(0.35 0.06 45)', light: 'oklch(0.9 0.06 45)' },
            'border-field': { dark: 'oklch(0.9 0.04 45 / 0.3)', light: 'oklch(0.2 0.08 45 / 0.3)' },
        },
    },
}

const ORANGE_SEEDED: ThemeInput = {
    colors: { ...DEFAULT_THEME.colors, default: ORANGE },
}

/** The controller's surface, without the persistence the drawer wraps it in. */
function useHarnessController(initial: ThemeInput): ThemeEditorController {
    const [input, setInput] = useState(initial)

    const generated = useMemo(() => generateTheme(input), [input])
    const contrast = useMemo(
        () => toContrastReport(generated.warnings, input.overrides),
        [generated.warnings, input.overrides]
    )

    const override = useCallback(
        (address: Parameters<ThemeEditorController['override']>[0]) =>
            overrideAt(input.overrides, address),
        [input.overrides]
    )

    return {
        clearDarkSeed: (intent) => {
            setInput((current) => ({
                ...current,
                colors: {
                    ...current.colors,
                    [intent]: seedFor(current.colors[intent], 'light'),
                },
            }))
        },
        clearIntentOverrides: (intent, scheme) => {
            setInput((current) => ({
                ...current,
                overrides: withoutIntentOverrides(current.overrides, intent, scheme),
            }))
        },
        clearOverride: (address) => {
            setInput((current) => ({
                ...current,
                overrides: withoutOverride(current.overrides, address),
            }))
        },
        contrast,
        css: () => generated.css,
        depth: DEFAULT_SETTING,
        input,
        isOverridden: true,
        json: () => JSON.stringify(input),
        override,
        palettes: generated.palettes,
        preset: 'custom',
        radius: DEFAULT_SETTING,
        reset: () => undefined,
        saturation: DEFAULT_SETTING,
        selectPreset: () => undefined,
        setColor: (intent, scheme, color) => {
            setInput((current) => ({
                ...current,
                colors: {
                    ...current.colors,
                    [intent]: withSeed(current.colors[intent], scheme, color),
                },
            }))
        },
        setDepth: () => undefined,
        setOverride: (address, color) => {
            setInput((current) => ({
                ...current,
                overrides: withOverride(current.overrides, address, color),
            }))
        },
        setRadius: () => undefined,
        setSaturation: () => undefined,
    }
}

function TreeHarness({ input, scheme }: { input: ThemeInput; scheme: Scheme }) {
    const controller = useHarnessController(input)

    return (
        <div className='w-[420px]'>
            <ColorTree
                controller={controller}
                scheme={scheme}
            />
        </div>
    )
}

/** Swap in whatever needs eyeballing; this file is the whole harness. */
const DEMOS: [name: string, demo: ComponentType<{ scheme: Scheme }>][] = [
    [
        'tree — shipped theme (dark mirrors light)',
        ({ scheme }) => (
            <TreeHarness
                input={DEFAULT_THEME}
                scheme={scheme}
            />
        ),
    ],
    [
        'tree — orange seed (contrast failures)',
        ({ scheme }) => (
            <TreeHarness
                input={ORANGE_SEEDED}
                scheme={scheme}
            />
        ),
    ],
    [
        'tree — dark aimed, two overrides',
        ({ scheme }) => (
            <TreeHarness
                input={AIMED}
                scheme={scheme}
            />
        ),
    ],
]

/** `?from=N&to=M` renders a slice, so screenshots never need scrolling. */
const params = new URLSearchParams(window.location.search)
const from = Number(params.get('from') ?? 0)
const to = Number(params.get('to') ?? DEMOS.length)
const shown = DEMOS.slice(from, to)

/** `?scheme=light` drops to one column, for screenshots at full size. */
const only = params.get('scheme')
const schemes = (['light', 'dark'] as const).filter((scheme) => only == null || only === scheme)

function Panel({ children, scheme }: { children: ReactNode; scheme: Scheme }) {
    return (
        <div
            className='bg-base-raised text-hi-contrast flex flex-col gap-6 p-6'
            style={{ colorScheme: scheme }}
        >
            {children}
        </div>
    )
}

function Preview() {
    return (
        <div
            className='grid min-h-dvh'
            style={{ gridTemplateColumns: `repeat(${schemes.length.toString()}, minmax(0, 1fr))` }}
        >
            {schemes.map((scheme) => (
                <Panel
                    key={scheme}
                    scheme={scheme}
                >
                    {shown.map(([name, Demo]) => (
                        <section key={name}>
                            <p className='text-lo-contrast mb-2 text-xs'>{name}</p>
                            <Demo scheme={scheme} />
                        </section>
                    ))}
                </Panel>
            ))}
        </div>
    )
}

const container = document.getElementById('root')
if (container == null) throw new Error('missing #root')
createRoot(container).render(<Preview />)
