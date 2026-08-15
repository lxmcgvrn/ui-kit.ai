import type { ComponentType, ReactNode } from 'react'

import { useState } from 'react'
import { createRoot } from 'react-dom/client'

import './styles.css'

import { ColorPickerPanel } from '../src/docs/components/theme-editor/color-picker-panel'
import { ColorRowField } from '../src/docs/components/theme-editor/color-row-field'

/** A seed: opaque, and never given an opacity section. */
const SEED = 'oklch(0.5438 0.191 267.01)'

/** A border token: translucent, so its picker grows an opacity section. */
const TOKEN = 'oklch(0.895 0.04 267.01 / 0.11)'

interface PickerHarnessProps {
    hasAlpha: boolean
    initial: string
    label: string
}

/** Counts every `onChange`, so opening the popover can be proven silent. */
function useEdits(initial: string) {
    const [state, setState] = useState({ edits: 0, value: initial })

    return {
        ...state,
        onChange: (value: string) => {
            setState((current) => ({ edits: current.edits + 1, value }))
        },
    }
}

function Readout({ edits, value }: { edits: number; value: string }) {
    return (
        <p className='text-lo-contrast font-mono text-xs'>
            {edits} edits — {value}
        </p>
    )
}

/** The picker as the drawer uses it: a row, with the popover behind a pipette. */
function RowHarness({ hasAlpha, initial, label }: PickerHarnessProps) {
    const { edits, onChange, value } = useEdits(initial)

    return (
        <div className='flex w-72 flex-col gap-2'>
            <ColorRowField
                hasAlpha={hasAlpha}
                isDerived={false}
                label={label}
                onChange={onChange}
                value={value}
            />
            <Readout
                edits={edits}
                value={value}
            />
        </div>
    )
}

/* The popover portals to the body, so only an inline panel wears both schemes. */
function PanelHarness({ hasAlpha, initial }: PickerHarnessProps) {
    const { edits, onChange, value } = useEdits(initial)

    return (
        <div className='border-default bg-base-raised flex w-72 flex-col gap-3 rounded-sm border p-4'>
            <ColorPickerPanel
                hasAlpha={hasAlpha}
                onChange={onChange}
                value={value}
            />
            <Readout
                edits={edits}
                value={value}
            />
        </div>
    )
}

/** Swap in whatever needs eyeballing; this file is the whole harness. */
const DEMOS: [name: string, demo: ComponentType][] = [
    [
        'panel — token (alpha)',
        () => (
            <PanelHarness
                hasAlpha
                initial={TOKEN}
                label='border-default'
            />
        ),
    ],
    [
        'panel — seed (no alpha)',
        () => (
            <PanelHarness
                hasAlpha={false}
                initial={SEED}
                label='Default seed'
            />
        ),
    ],
    [
        'row — token (alpha)',
        () => (
            <RowHarness
                hasAlpha
                initial={TOKEN}
                label='border-default, light'
            />
        ),
    ],
    [
        'row — seed (no alpha)',
        () => (
            <RowHarness
                hasAlpha={false}
                initial={SEED}
                label='Default seed, light'
            />
        ),
    ],
]

/** `?from=N&to=M` renders a slice, so screenshots never need scrolling. */
const params = new URLSearchParams(window.location.search)
const from = Number(params.get('from') ?? 0)
const to = Number(params.get('to') ?? DEMOS.length)
const shown = DEMOS.slice(from, to)

function Panel({ children, scheme }: { children: ReactNode; scheme: 'dark' | 'light' }) {
    return (
        <div
            className='bg-base text-hi-contrast flex flex-col gap-6 p-6'
            style={{ colorScheme: scheme }}
        >
            {children}
        </div>
    )
}

function Preview() {
    return (
        <div className='grid min-h-dvh grid-cols-2'>
            {(['light', 'dark'] as const).map((scheme) => (
                <Panel
                    key={scheme}
                    scheme={scheme}
                >
                    {shown.map(([name, Demo]) => (
                        <section key={name}>
                            <p className='text-lo-contrast mb-2 text-xs'>{name}</p>
                            <Demo />
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
