import type {
    DialogProps as RACDialogProps,
    PopoverProps as RACPopoverProps,
} from 'react-aria-components'

import {
    composeRenderProps,
    Dialog as RACDialog,
    OverlayArrow as RACOverlayArrow,
    Popover as RACPopover,
    PopoverContext as RACPopoverContext,
    useSlottedContext,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

export interface PopoverDialogProps extends RACDialogProps {}

export interface PopoverProps extends Omit<RACPopoverProps, 'children'> {
    children: React.ReactNode
    showArrow?: boolean
}

const popoverStyles = tv({
    base: [
        'bg-base-raised rounded',
        'text-hi-contrast shadow-2xl forced-colors:bg-[Canvas]',
        'border-default border',
        // transition
        'transition-all duration-200 will-change-transform',
        'translate-y-0',
        'translate-x-0',
        // transform origin
        '[--origin-x:0]',
        '[--origin-y:0]',
        // placement
        'placement-top:[--origin-y:var(--spacing)]',
        'placement-right:[--origin-x:calc(var(--spacing)_*_-1)]',
        'placement-bottom:[--origin-y:calc(var(--spacing)_*_-1)]',
        'placement-left:[--origin-x:var(--spacing)]',
        // entering
        'entering:ease-out',
        'entering:opacity-0',
        'entering:translate-y-(--origin-y)',
        'entering:translate-x-(--origin-x)',
        // exiting
        'entering:ease-in',
        'exiting:opacity-0',
        'exiting:translate-y-(--origin-y)',
        'exiting:translate-x-(--origin-x)',
        'exiting:pointer-events-none', // keeps content behind interactive during exit
    ],
})

/** A popover is an overlay element positioned relative to a trigger. */
export function Popover({ children, className, showArrow, ...props }: PopoverProps) {
    const popoverContext = useSlottedContext(RACPopoverContext)
    const isSubmenu = popoverContext?.trigger === 'SubmenuTrigger'
    let offset = showArrow === true ? 12 : 8
    offset = isSubmenu ? offset - 6 : offset
    return (
        <RACPopover
            offset={offset}
            {...props}
            className={composeRenderProps(className, (className, renderProps) =>
                popoverStyles({
                    ...renderProps,
                    className,
                })
            )}
        >
            {(showArrow ?? false) && (
                <RACOverlayArrow className='group'>
                    <svg
                        className='group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180
                            block fill-(--theme-default-bg-base-raised) stroke-(--theme-default-border-default) stroke-1
                            forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]'
                        height={12}
                        viewBox='0 0 12 12'
                        width={12}
                    >
                        <path d='M0 0 L6 6 L12 0' />
                    </svg>
                </RACOverlayArrow>
            )}
            {children}
        </RACPopover>
    )
}
Popover.displayName = 'Popover'

/** Place inside a {@link Popover} to contain focus within the overlay. */
export function PopoverDialog(props: PopoverDialogProps) {
    return (
        <RACDialog
            {...props}
            className={twMerge(props.className, 'p-4 outline-0')}
        />
    )
}
PopoverDialog.displayName = 'PopoverDialog'
