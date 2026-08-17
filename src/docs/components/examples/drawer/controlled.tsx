'use client'

import { Button, Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerTitle } from '@ui-kit.ai/components'
import { useState } from 'react'

export default function DrawerControlled() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onPress={() => {
          setIsOpen(true)
        }}
        variant='secondary'
      >
        Open drawer
      </Button>

      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>

        <DrawerContent>
          <p>The drawer is open while `isOpen` is true, wherever that state lives.</p>
        </DrawerContent>
      </Drawer>
    </>
  )
}
