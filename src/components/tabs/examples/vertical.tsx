'use client'

import { Skeleton, Tab, TabList, TabPanel, Tabs } from '@ui-kit.ai/components'

export default function TabsVertical() {
    return (
        <Tabs orientation='vertical'>
            <TabList
                aria-label='Tabs'
                className='mr-2'
            >
                <Tab id='tab-1'>Tab 1</Tab>
                <Tab id='tab-2'>Tab 2</Tab>
                <Tab id='tab-3'>Tab 3</Tab>
            </TabList>

            <TabPanel id='tab-1'>
                <PanelContent />
            </TabPanel>

            <TabPanel id='tab-2'>
                <PanelContent />
            </TabPanel>

            <TabPanel id='tab-3'>
                <PanelContent />
            </TabPanel>
        </Tabs>
    )
}

function PanelContent() {
    return (
        <div className='bg-base-raised border-default w-full rounded-lg border border-dashed p-4'>
            <div className='mb-4 flex items-center justify-start gap-2'>
                <Skeleton className='size-10 rounded-full' />
                <Skeleton className='h-6 w-24 rounded-sm' />
            </div>
            <Skeleton className='mb-4 h-4 w-full rounded-sm' />
            <Skeleton className='mb-4 h-4 w-full rounded-sm' />
            <Skeleton className='h-4 w-1/3 rounded-sm' />
        </div>
    )
}
