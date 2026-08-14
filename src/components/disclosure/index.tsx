import type {
    DisclosurePanelProps as RACDisclosurePanelProps,
    DisclosureProps as RACDisclosureProps,
} from 'react-aria-components'

import { LucideChevronRight } from 'lucide-react'
import {
    Disclosure as RACDisclosure,
    DisclosurePanel as RACDisclosurePanel,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import type { ButtonProps } from '../button'

import { Button } from '../button'

export interface DisclosureProps extends RACDisclosureProps {}

/** A disclosure component that shows and hides content when triggered. */
export function Disclosure({ children, className, ...props }: DisclosureProps) {
    return (
        <RACDisclosure
            {...props}
            className={(renderProps) =>
                twMerge(
                    'group flex w-full flex-col gap-2',
                    typeof className === 'function' ? className(renderProps) : className
                )
            }
        >
            {children}
        </RACDisclosure>
    )
}
Disclosure.displayName = 'Disclosure'

export interface DisclosurePanelProps extends RACDisclosurePanelProps {}

/** Content that appears or disappears when the user toggles the disclosure. */
export function DisclosurePanel({ children, className, ...props }: DisclosurePanelProps) {
    return (
        <RACDisclosurePanel
            {...props}
            className={(renderProps) =>
                twMerge(
                    'text-sm',
                    typeof className === 'function' ? className(renderProps) : className
                )
            }
        >
            {children}
        </RACDisclosurePanel>
    )
}
DisclosurePanel.displayName = 'DisclosurePanel'

export interface DisclosureButtonProps extends ButtonProps {
    /** The button's visual weight. Defaults to `tertiary`. */
    variant?: ButtonProps['variant']
}

/** Toggles a {@link Disclosure}; its chevron rotates when open. */
export function DisclosureButton({
    children,
    className,
    variant = 'tertiary',
    ...props
}: DisclosureButtonProps) {
    return (
        <Button
            {...props}
            className={(renderProps) =>
                twMerge(
                    'w-full justify-start',
                    typeof className === 'function' ? className(renderProps) : className
                )
            }
            slot='trigger'
            slotLeft={
                <LucideChevronRight className='group-expanded:rotate-90 transition-transform ease-out' />
            }
            variant={variant}
        >
            {children}
        </Button>
    )
}
DisclosureButton.displayName = 'DisclosureButton'
