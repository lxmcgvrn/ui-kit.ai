'use client'

import {
    Button,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@ui-kit.ai/components'

export default function DrawerWidth() {
    return (
        <DrawerTrigger>
            <Button variant='secondary'>Open wide drawer</Button>

            <Drawer className='sm:w-[36rem]'>
                <DrawerHeader>
                    <DrawerTitle>Activity</DrawerTitle>
                    <DrawerCloseButton />
                </DrawerHeader>

                <DrawerContent>
                    <p>The panel is wider than the default from the `sm` breakpoint up.</p>
                </DrawerContent>
            </Drawer>
        </DrawerTrigger>
    )
}
