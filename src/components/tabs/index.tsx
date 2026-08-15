import type {
    TabListProps as RACTabListProps,
    TabPanelProps as RACTabPanelProps,
    TabProps as RACTabProps,
    TabsProps as RACTabsProps,
} from 'react-aria-components'

import { createContext, use } from 'react'
import {
    composeRenderProps,
    Tab as RACTab,
    TabList as RACTabList,
    TabPanel as RACTabPanel,
    Tabs as RACTabs,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

/** Visual treatment for the selected tab. */
export type TabsVariant = 'segmented' | 'underline'

/** Lets `TabList` and `Tab` read the variant set once on the parent `Tabs`. */
const TabsVariantContext = createContext<TabsVariant>('underline')
TabsVariantContext.displayName = 'TabsVariantContext'

export interface TabsProps extends RACTabsProps {
    /** `underline` rules off the selected tab; `segmented` sits it in a pill. */
    variant?: TabsVariant
}

/** Groups content into sections the user can switch between. */
export function Tabs({ variant = 'underline', ...props }: TabsProps) {
    return (
        <TabsVariantContext value={variant}>
            <RACTabs
                {...props}
                className={composeRenderProps(props.className, (className) =>
                    twMerge(
                        className,
                        'group/tabs orientation-horizontal:flex-col orientation-vertical:flex-row flex'
                    )
                )}
            />
        </TabsVariantContext>
    )
}
Tabs.displayName = 'Tabs'

const tabListStyles = tv({
    base: 'no-scrollbar relative flex max-w-full',
    compoundVariants: [
        {
            // The rule runs on past the last tab, to the edge of the list.
            class: 'after:border-default after:grow after:border-b after:content-[""]',
            orientation: 'horizontal',
            variant: 'underline',
        },
    ],
    defaultVariants: {
        variant: 'underline',
    },
    variants: {
        orientation: {
            horizontal: 'flex-row',
            vertical: 'flex-col items-start',
        },
        variant: {
            // The raised track the active tab cuts through.
            segmented: 'bg-base-raised w-fit gap-1 rounded-md p-0.5',
            underline: '',
        },
    },
})

export interface TabListProps<T extends object = object> extends RACTabListProps<T> {}

/** The row of {@link Tab}s within a {@link Tabs}. */
export function TabList<T extends object>(props: TabListProps<T>) {
    const variant = use(TabsVariantContext)

    return (
        <RACTabList
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                tabListStyles({
                    ...renderProps,
                    className,
                    variant,
                })
            )}
        />
    )
}
TabList.displayName = 'TabList'

const tabStyles = tv({
    base: [
        'px-4 py-1.5',
        'text-lo-contrast text-sm whitespace-nowrap',
        'font-medium',
        'flex items-center',
        'cursor-pointer',
        // pressed
        'pressed:text-lo-contrast',
        // hover
        'hover:text-hi-contrast',
        // selected
        'selected:text-hi-contrast',
        // disabled
        'disabled:text-placeholder',
        'disabled:selected:text-lo-contrast forced-color-adjust-none',
        // vertical
        'group-orientation-vertical/tabs:w-full',
    ],
    defaultVariants: {
        variant: 'underline',
    },
    variants: {
        variant: {
            // The active tab wears the page color, back through the raised track.
            segmented: [
                '!outline-offset-0',
                'rounded-sm border border-transparent',
                'transition-colors',
                // hover
                'hover:bg-tint',
                // pressed
                'pressed:bg-tint',
                // selected
                'selected:bg-base',
                'selected:border-default',
            ],
            underline: [
                '!-outline-offset-4',
                // selected
                'selected:border-[var(--theme-default-bg-primary)]',
                // horizontal
                'group-orientation-horizontal/tabs:border-b',
                'group-orientation-horizontal/tabs:border-default',
                // vertical
                'group-orientation-vertical/tabs:border-r',
                'group-orientation-vertical/tabs:border-default',
            ],
        },
    },
})

export interface TabProps extends RACTabProps {}

/** Switches to its panel on click, tap, or arrow key. */
export function Tab(props: TabProps) {
    const variant = use(TabsVariantContext)

    return (
        <RACTab
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                tabStyles({
                    ...renderProps,
                    className,
                    variant,
                })
            )}
        />
    )
}
Tab.displayName = 'Tab'

export interface TabPanelProps extends RACTabPanelProps {}

/** The content for a single {@link Tab}. */
export function TabPanel(props: TabPanelProps) {
    return (
        <RACTabPanel
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge('flex-1 outline-0', className)
            )}
        />
    )
}
TabPanel.displayName = 'TabPanel'
