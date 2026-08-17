'use client'

import {
    Button,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@ui-kit.ai/components'

export default function DrawerDefault() {
    return (
        <DrawerTrigger>
            <Button variant='secondary'>Open drawer</Button>

            <Drawer>
                {({ close }) => (
                    <>
                        <DrawerHeader>
                            <DrawerTitle>Filters</DrawerTitle>
                            <DrawerCloseButton />
                        </DrawerHeader>

                        <DrawerContent>
                            <p>Narrow the results down to the rows you care about.</p>
                        </DrawerContent>

                        <DrawerFooter>
                            <Button
                                slot='close'
                                variant='tertiary'
                            >
                                Cancel
                            </Button>
                            <Button onPress={close}>Apply</Button>
                        </DrawerFooter>
                    </>
                )}
            </Drawer>
        </DrawerTrigger>
    )
}
