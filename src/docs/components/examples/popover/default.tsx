'use client'

import { Button, DialogTrigger, Heading, Popover, PopoverDialog } from '@ui-kit.ai/components'

export default function PopoverDefault() {
  return (
    <DialogTrigger>
      <Button>Show popover</Button>
      <Popover
        defaultOpen
        showArrow
      >
        <PopoverDialog>
          <Heading
            className='mb-2 text-base'
            level={3}
            slot='title'
          >
            Help
          </Heading>
          <p className='text-sm'>For help accessing your account, please contact support.</p>
        </PopoverDialog>
      </Popover>
    </DialogTrigger>
  )
}
