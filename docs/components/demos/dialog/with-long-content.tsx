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

const PARAGRAPHS = [
    'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.',
    'Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.',
    'Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Quisque faucibus ex sapien vitae pellentesque sem placerat.',
]

export default function DialogWithLongContent() {
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
                                    {PARAGRAPHS.map((paragraph) => (
                                        <p
                                            className='mb-2'
                                            key={paragraph}
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
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
