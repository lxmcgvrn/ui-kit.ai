import type { ReactNode } from 'react'
import type {
    MenuProps as RACMenuProps,
    MenuTriggerProps as RACMenuTriggerProps,
} from 'react-aria-components'

import { Menu as RACMenu, MenuTrigger as RACMenuTrigger } from 'react-aria-components'

import type { OptionsSchema } from '../types/options'

import { OptionRenderer } from '../options'

export interface MenuProps<T extends OptionsSchema<'menu'> = OptionsSchema<'menu'>>
    extends Omit<RACMenuProps<T>, 'children' | 'className'> {
    /** When `true`, Menu renders a checkmark next to the selected option(s). */
    showCheckmarkOnSelected?: boolean
}

/** A menu displays a list of actions or options that a user can choose. */
export function Menu<T extends OptionsSchema<'menu'>>({
    showCheckmarkOnSelected = true,
    ...props
}: MenuProps<T>) {
    return (
        <RACMenu
            {...props}
            className='scrollbar-thin max-h-[inherit] overflow-auto p-1 outline outline-0
                [clip-path:inset(0_0_0_0_round_.25rem)]'
        >
            {(renderProps) => (
                <OptionRenderer<'menu'>
                    {...renderProps}
                    showCheckmarkOnSelected={showCheckmarkOnSelected}
                    type='menu'
                />
            )}
        </RACMenu>
    )
}
Menu.displayName = 'Menu'

/** A non-interactive section inside a `Popover`. */
export function MenuDecorativeSection(props: { children: ReactNode }) {
    return (
        <div
            className='p-1'
            {...props}
        />
    )
}
MenuDecorativeSection.displayName = 'MenuDecorativeSection'

export interface MenuTriggerProps extends RACMenuTriggerProps {}

/**
 * A `Trigger` component, for use with a `Menu` component.
 * @see https://react-spectrum.adobe.com/react-aria/Menu#menutrigger
 */
export function MenuTrigger(props: MenuTriggerProps) {
    return <RACMenuTrigger {...props} />
}
MenuTrigger.displayName = 'MenuTrigger'
