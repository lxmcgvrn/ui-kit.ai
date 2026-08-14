import type {
    TabListProps as RACTabListProps,
    TabPanelProps as RACTabPanelProps,
    TabProps as RACTabProps,
    TabsProps as RACTabsProps,
} from 'react-aria-components'

import {
    composeRenderProps,
    Tab as RACTab,
    TabList as RACTabList,
    TabPanel as RACTabPanel,
    Tabs as RACTabs,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

export interface TabsProps extends RACTabsProps {}

/** Groups content into sections the user can switch between. */
export function Tabs(props: TabsProps) {
    return (
        <RACTabs
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge(
                    className,
                    'group/tabs orientation-horizontal:flex-col orientation-vertical:flex-row flex'
                )
            )}
        />
    )
}
Tabs.displayName = 'Tabs'

const tabListStyles = tv({
    base: 'no-scrollbar relative flex max-w-full',
    variants: {
        orientation: {
            horizontal:
                'after:border-default flex-row after:grow after:border-b after:content-[""]',
            vertical: 'flex-col items-start',
        },
    },
})

export interface TabListProps<T extends object = object> extends RACTabListProps<T> {}

/** The row of {@link Tab}s within a {@link Tabs}. */
export function TabList<T extends object>(props: TabListProps<T>) {
    return (
        <RACTabList
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                tabListStyles({
                    ...renderProps,
                    className,
                })
            )}
        />
    )
}
TabList.displayName = 'TabList'

const tabStyles = tv({
    base: [
        'px-4 py-1.5',
        '!-outline-offset-4',
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
        'selected:border-[var(--theme-default-bg-primary)]',
        // selected
        'disabled:text-placeholder',
        'disabled:selected:text-lo-contrast forced-color-adjust-none',
        // horizontal
        'group-orientation-horizontal/tabs:border-b',
        'group-orientation-horizontal/tabs:border-default',
        // vertical
        'group-orientation-vertical/tabs:w-full',
        'group-orientation-vertical/tabs:border-r',
        'group-orientation-vertical/tabs:border-default',
    ],
})

export interface TabProps extends RACTabProps {}

/** Switches to its panel on click, tap, or arrow key. */
export function Tab(props: TabProps) {
    return (
        <RACTab
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) =>
                tabStyles({
                    ...renderProps,
                    className,
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
