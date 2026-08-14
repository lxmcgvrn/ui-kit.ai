import type { Preset } from '@ui-kit.ai/theme'

import { Button, ListBox } from '@ui-kit.ai/components'
import { getMockOptions } from '@ui-kit.ai/mocks'
import { generateTheme, PRESETS } from '@ui-kit.ai/theme'

/* Throwaway page for tuning contrast ratios. Delete when done. */

const SCHEMES = ['light', 'dark'] as const

export default function ContrastLab() {
    return (
        <main className='mx-auto flex max-w-4xl flex-col gap-8 p-8'>
            {PRESETS.map((preset) => (
                <PresetRow
                    key={preset.name}
                    preset={preset}
                />
            ))}
        </main>
    )
}

function PresetRow({ preset }: { preset: Preset }) {
    const scope = `lab-${preset.name}`

    return (
        <section>
            <style>{scopedCss(preset, scope)}</style>
            <h2 className='text-lo-contrast mb-2 text-sm font-medium'>{preset.label}</h2>
            <div className={`${scope} grid grid-cols-2 gap-px`}>
                {SCHEMES.map((scheme) => (
                    <div
                        className='bg-base flex items-start gap-6 rounded-lg border p-6'
                        key={scheme}
                        style={{ colorScheme: scheme }}
                    >
                        <Button>Primary</Button>
                        <ListBox
                            aria-label={`${preset.label} ${scheme} produce`}
                            className='w-40'
                            defaultSelectedKeys={['apple']}
                            items={getMockOptions<'listbox'>({ withIcon: true })}
                            selectionMode='single'
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

/* The editor's runtime transform, scoped to a class instead of `:root`. */
function scopedCss(preset: Preset, scope: string): string {
    const [themeBlock = ''] = generateTheme(preset.input).css.split('@utility')

    return themeBlock
        .split('\n')
        .filter((line) => !line.includes('--color-*'))
        .join('\n')
        .replace('@theme {', `.${scope} {`)
}
