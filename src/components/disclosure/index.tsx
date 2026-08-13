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

/**
 * Props accepted by {@link Disclosure} — everything `react-aria-components`'
 * `Disclosure` accepts.
 */
export interface DisclosureProps extends RACDisclosureProps {}

/**
 * A disclosure component that shows and hides content when triggered.
 */
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

/**
 * Props accepted by {@link DisclosurePanel} — everything
 * `react-aria-components`' `DisclosurePanel` accepts.
 */
export interface DisclosurePanelProps extends RACDisclosurePanelProps {}

/**
 * The content that appears/disappears when the disclosure is toggled.
 */
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

/**
 * Props accepted by {@link DisclosureButton} — every {@link ButtonProps} prop.
 */
export interface DisclosureButtonProps extends ButtonProps {
    /**
     * The button's visual weight. Defaults to `tertiary`.
     */
    variant?: ButtonProps['variant']
}

/**
 * A button specifically styled for use with disclosure components.
 * Includes a chevron icon that rotates based on open/closed state.
 */
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
