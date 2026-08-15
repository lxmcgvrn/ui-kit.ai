'use client'

import type { Intent, Scheme } from '@ui-kit.ai/theme'

import { Tab, TabList, TabPanel, Tabs } from '@ui-kit.ai/components'
import { INTENTS } from '@ui-kit.ai/theme'
import { useState } from 'react'

import type { ThemeEditorController } from './use-theme-input'

import { SECTION_HEADING, toLabel } from './field'
import { IntentCard } from './intent-card'
import { useColorScheme } from './use-color-scheme'

/** Light reads first: every theme takes its seeds from that scheme. */
const SCHEME_TABS: readonly Scheme[] = ['light', 'dark']

export interface ColorsSectionProps {
    theme: ThemeEditorController
}

/** Every intent's colours, one scheme at a time, with the page wearing it. */
export function ColorsSection({ theme }: ColorsSectionProps) {
    const { scheme, selectScheme } = useColorScheme()

    /* Held above the tabs, so switching scheme leaves the open cards open. */
    const [expanded, setExpanded] = useState<readonly Intent[]>([])

    const onExpandedChange = (intent: Intent, isExpanded: boolean) => {
        setExpanded((current) =>
            isExpanded ? [...current, intent] : current.filter((open) => open !== intent)
        )
    }

    return (
        <Tabs
            className='gap-3'
            onSelectionChange={(key) => {
                selectScheme(key === 'dark' ? 'dark' : 'light')
            }}
            selectedKey={scheme}
        >
            <div className='flex items-center justify-between gap-4'>
                <h3 className={SECTION_HEADING}>Colors</h3>

                <TabList aria-label='Color scheme'>
                    {SCHEME_TABS.map((tab) => (
                        <Tab
                            id={tab}
                            key={tab}
                        >
                            {toLabel(tab)}
                        </Tab>
                    ))}
                </TabList>
            </div>

            {SCHEME_TABS.map((tab) => (
                <TabPanel
                    className='flex flex-col gap-3'
                    id={tab}
                    key={tab}
                >
                    {INTENTS.map((intent) => (
                        <IntentCard
                            intent={intent}
                            isExpanded={expanded.includes(intent)}
                            key={intent}
                            onExpandedChange={(isExpanded) => {
                                onExpandedChange(intent, isExpanded)
                            }}
                            scheme={tab}
                            theme={theme}
                        />
                    ))}
                </TabPanel>
            ))}
        </Tabs>
    )
}
