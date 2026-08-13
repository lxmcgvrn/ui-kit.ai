'use client'

import {
    Button,
    Dialog,
    DialogCloseButton,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogModal,
    DialogModalOverlay,
    DialogTitle,
    DialogTrigger,
} from '@ui-kit.ai/components'

export default function DialogModalDemo() {
    return (
        <DialogTrigger>
            <Button intent='error'>Delete account</Button>

            <DialogModalOverlay>
                <DialogModal>
                    <Dialog>
                        {({ close }) => (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Delete account</DialogTitle>
                                    <DialogCloseButton />
                                </DialogHeader>

                                <DialogContent>
                                    <p>
                                        <b>This action cannot be undone.</b> All of your account
                                        data will be permanently deleted.
                                    </p>
                                </DialogContent>

                                <DialogFooter>
                                    <Button
                                        className='ml-auto'
                                        slot='close'
                                        variant='secondary'
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        intent='error'
                                        onPress={close}
                                    >
                                        Confirm
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </Dialog>
                </DialogModal>
            </DialogModalOverlay>
        </DialogTrigger>
    )
}
