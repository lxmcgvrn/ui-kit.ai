import type { ComponentProps, HTMLProps } from 'react'
import type {
    DialogProps as RACDialogProps,
    DialogTriggerProps as RACDialogTriggerProps,
    ModalOverlayProps as RACModalOverlayProps,
} from 'react-aria-components'

import { LucideX } from 'lucide-react'
import { useContext } from 'react'
import {
    composeRenderProps,
    Dialog as RACDialog,
    DialogTrigger as RACDialogTrigger,
    Modal as RACModal,
    ModalOverlay as RACModalOverlay,
    OverlayTriggerStateContext as RACOverlayTriggerStateContext,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Button } from '../button'
import { Heading } from '../heading'

/* Transparent, like the dialog's: the page behind stays readable. */
const overlayStyles = tv({
    base: ['fixed inset-0 z-50', 'h-dvh w-dvw', 'exiting:pointer-events-none'],
})

const panelStyles = tv({
    base: [
        'fixed inset-y-0',
        'h-dvh w-full sm:w-96',
        'bg-base text-hi-contrast',
        'border-default shadow-2xl',
        'forced-colors:bg-[Canvas]',
        // transition
        'transition-transform duration-200',
        'entering:ease-out',
        'exiting:ease-in',
        'exiting:pointer-events-none', // keeps content behind interactive during exit
    ],
    variants: {
        side: {
            left: ['left-0 border-r', 'entering:-translate-x-full', 'exiting:-translate-x-full'],
            right: ['right-0 border-l', 'entering:translate-x-full', 'exiting:translate-x-full'],
        },
    },
})

const dialogStyles = tv({
    base: ['group/drawer', 'flex h-full flex-col', 'text-left', '!outline-0'],
})

export interface DrawerProps
    extends Omit<RACModalOverlayProps, 'children' | 'className'>,
        Pick<RACDialogProps, 'aria-describedby' | 'aria-label' | 'aria-labelledby' | 'role'> {
    /** Drawer body, or a render function that receives `close`. */
    children: RACDialogProps['children']

    /** Styles the sliding panel — override its width here. */
    className?: RACModalOverlayProps['className']

    /** The edge the panel slides in from. */
    side?: 'left' | 'right'
}

/** A drawer is a panel that slides in from the edge of the screen. */
export function Drawer({
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    className,
    isDismissable = true,
    role,
    side = 'right',
    ...props
}: DrawerProps) {
    return (
        <RACModalOverlay
            {...props}
            className={overlayStyles()}
            isDismissable={isDismissable}
        >
            <RACModal
                className={composeRenderProps(className, (resolved) =>
                    twMerge(panelStyles({ side }), resolved)
                )}
            >
                <RACDialog
                    aria-describedby={ariaDescribedBy}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    className={dialogStyles()}
                    role={role}
                >
                    {children}
                </RACDialog>
            </RACModal>
        </RACModalOverlay>
    )
}
Drawer.displayName = 'Drawer'

export interface DrawerCloseButtonProps
    extends Omit<ComponentProps<typeof Button>, 'aria-label' | 'name' | 'type' | 'variant'> {}

/** A button to close the drawer. */
export function DrawerCloseButton(props: DrawerCloseButtonProps) {
    const overlayTriggerState = useContext(RACOverlayTriggerStateContext)

    return (
        <Button
            {...props}
            aria-label='Close'
            isIcon
            name='close'
            onPress={(e) => {
                props.onPress?.(e)
                overlayTriggerState?.close()
            }}
            type='button'
            variant='tertiary'
        >
            <LucideX />
        </Button>
    )
}
DrawerCloseButton.displayName = 'DrawerCloseButton'

export interface DrawerContentProps extends HTMLProps<HTMLDivElement> {}

/** Wrapper to render scrollable content within the drawer. */
export function DrawerContent({ ref, ...props }: DrawerContentProps) {
    return (
        <div
            {...props}
            className={twMerge(
                'scrollbar-thin overflow-y-auto',
                'text-base',
                'shrink grow',
                // padding
                'p-4',
                'group-has-data-[drawer-footer]/drawer:pb-2',
                'group-has-data-[drawer-header]/drawer:pt-2',
                props.className
            )}
            data-drawer-content
            ref={ref}
        />
    )
}
DrawerContent.displayName = 'DrawerContent'

export interface DrawerFooterProps extends HTMLProps<HTMLElement> {}

/** Wrapper to pin content to the bottom of the drawer. */
export function DrawerFooter(props: DrawerFooterProps) {
    return (
        <footer
            {...props}
            className={twMerge(
                'min-h-10',
                'flex shrink-0 items-center justify-between gap-2',
                // padding
                'p-4',
                'group-has-data-[drawer-content]/drawer:pt-2',
                props.className
            )}
            data-drawer-footer
        />
    )
}
DrawerFooter.displayName = 'DrawerFooter'

export interface DrawerHeaderProps extends HTMLProps<HTMLElement> {}

/** Wrapper to render the drawer header. */
export function DrawerHeader(props: DrawerHeaderProps) {
    return (
        <header
            {...props}
            className={twMerge(
                'flex shrink-0 items-center justify-between gap-4',
                // padding
                'p-4',
                'group-has-data-[drawer-content]/drawer:pb-2',
                props.className
            )}
            data-drawer-header
        />
    )
}
DrawerHeader.displayName = 'DrawerHeader'

export interface DrawerTitleProps extends Omit<ComponentProps<typeof Heading>, 'level' | 'slot'> {}

/** A {@link Heading} in the `title` slot, labelling the drawer. */
export function DrawerTitle(props: DrawerTitleProps) {
    return (
        <Heading
            {...props}
            className={twMerge('mb-0 truncate text-base', props.className)}
            level={3}
            slot='title'
        />
    )
}
DrawerTitle.displayName = 'DrawerTitle'

export interface DrawerTriggerProps extends RACDialogTriggerProps {}

/** DrawerTrigger opens a drawer when the user presses its trigger element. */
export function DrawerTrigger(props: DrawerTriggerProps) {
    return <RACDialogTrigger {...props} />
}
DrawerTrigger.displayName = 'DrawerTrigger'
