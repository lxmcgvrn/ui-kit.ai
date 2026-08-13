import type { Tab, TabList, TabPanel, Tabs } from '@ui-kit.ai/components'
import type { ComponentProps } from 'react'

/**
 * Re-exported so `<AutoTypeTable />` has named, exported types to document —
 * the component package only exports the components themselves.
 */
export type TabListProps = ComponentProps<typeof TabList>

export type TabPanelProps = ComponentProps<typeof TabPanel>

export type TabProps = ComponentProps<typeof Tab>

export type TabsProps = ComponentProps<typeof Tabs>
