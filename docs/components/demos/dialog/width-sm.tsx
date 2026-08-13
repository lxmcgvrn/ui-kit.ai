'use client'

import {
    Button,
    Dialog,
    DialogCloseButton,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@ui-kit.ai/components'

export default function DialogWidthSm() {
    return (
        <Dialog width='sm'>
            <DialogHeader>
                <DialogTitle>Delete account</DialogTitle>
                <DialogCloseButton />
            </DialogHeader>

            <DialogContent>
                <p>
                    <b>This action cannot be undone.</b> All of your account data will be
                    permanently deleted.
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
                    type='submit'
                >
                    Confirm
                </Button>
            </DialogFooter>
        </Dialog>
    )
}
