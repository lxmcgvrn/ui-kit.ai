'use client'

import { Skeleton, Tab, TabList, TabPanel, Tabs } from '@ui-kit.ai/components'

export default function TabsSegmented() {
  return (
    <Tabs
      className='w-full'
      variant='segmented'
    >
      <TabList
        aria-label='Workspace'
        className='mb-2'
      >
        <Tab id='overview'>Overview</Tab>
        <Tab id='analytics'>Analytics</Tab>
        <Tab id='reports'>Reports</Tab>
        <Tab id='settings'>Settings</Tab>
      </TabList>

      <TabPanel id='overview'>
        <PanelContent />
      </TabPanel>

      <TabPanel id='analytics'>
        <PanelContent />
      </TabPanel>

      <TabPanel id='reports'>
        <PanelContent />
      </TabPanel>

      <TabPanel id='settings'>
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
