'use client'

import type { Scheme } from '@ui-kit.ai/theme'

import { Tab, TabList, Tabs } from '@ui-kit.ai/components'

const SCHEMES: readonly { label: string; value: Scheme }[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
]

export interface SchemeTabsProps {
    onSchemeChange: (scheme: Scheme) => void
    scheme: Scheme
}

/** Flips the site's colour scheme — the drawer previews whichever one it edits. */
export function SchemeTabs({ onSchemeChange, scheme }: SchemeTabsProps) {
    return (
        <Tabs
            onSelectionChange={(key) => {
                onSchemeChange(key === 'dark' ? 'dark' : 'light')
            }}
            selectedKey={scheme}
            variant='segmented'
        >
            <TabList aria-label='Colour scheme'>
                {SCHEMES.map(({ label, value }) => (
                    <Tab
                        id={value}
                        key={value}
                    >
                        {label}
                    </Tab>
                ))}
            </TabList>
        </Tabs>
    )
}
