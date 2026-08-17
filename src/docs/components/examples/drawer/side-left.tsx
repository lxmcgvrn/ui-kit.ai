'use client'

import { Button, Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@ui-kit.ai/components'

export default function DrawerSideLeft() {
  return (
    <DrawerTrigger>
      <Button variant='secondary'>Open navigation</Button>

      <Drawer side='left'>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>

        <DrawerContent>
          <p>The panel slides in from the left instead of the right.</p>
        </DrawerContent>
      </Drawer>
    </DrawerTrigger>
  )
}
