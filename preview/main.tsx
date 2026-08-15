import type { ComponentType, ReactNode } from 'react'

import { createRoot } from 'react-dom/client'

import './styles.css'

import TabsDefault from '../src/components/tabs/examples/default'
import TabsSegmented from '../src/components/tabs/examples/segmented'
import TabsVertical from '../src/components/tabs/examples/vertical'

/** Swap in whatever needs eyeballing; this file is the whole harness. */
const DEMOS: [name: string, demo: ComponentType][] = [
    ['underline', TabsDefault],
    ['segmented', TabsSegmented],
    ['vertical', TabsVertical],
]

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
                    {DEMOS.map(([name, Demo]) => (
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
