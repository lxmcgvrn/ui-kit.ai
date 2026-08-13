import type { ReactNode } from 'react'
import type {
    MenuProps as AriaMenuProps,
    MenuTriggerProps as AriaMenuTriggerProps,
} from 'react-aria-components'

import { Menu as RACMenu, MenuTrigger as RACMenuTrigger } from 'react-aria-components'

import type { OptionsSchema } from '../types/options'

import { OptionRenderer } from '../options'

/**
 * Props accepted by {@link Menu}. Everything `react-aria-components`' `Menu`
 * accepts — minus the props this component owns — plus this design system's
 * presentational props.
 */
export interface MenuProps<T extends OptionsSchema<'menu'> = OptionsSchema<'menu'>>
    extends Omit<AriaMenuProps<T>, 'children' | 'className'> {
    /**
     * When `true` a checkmark is rendered next to the selected option(s).
     */
    showCheckmarkOnSelected?: boolean
}

/**
 * A menu displays a list of actions or options that a user can choose.
 */
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

/**
 * A <MenuDecorativeSection> defines a section within a
 * `Popover` that is purely decorative and does not contain
 * any interactive elements.
 *
 * **Note** Compose this in the `Dropdown`, not in the `DropdownMenu`
 */
export function MenuDecorativeSection(props: { children: ReactNode }) {
    return (
        <div
            className='p-1'
            {...props}
        />
    )
}
MenuDecorativeSection.displayName = 'MenuDecorativeSection'

/**
 * Props accepted by {@link MenuTrigger}.
 */
export interface MenuTriggerProps extends AriaMenuTriggerProps {}

/**
 * A `Trigger` component, for use with a `Menu` component.
 *
 * @see https://react-spectrum.adobe.com/react-aria/Menu#menutrigger
 */
export function MenuTrigger(props: MenuTriggerProps) {
    return <RACMenuTrigger {...props} />
}
MenuTrigger.displayName = 'MenuTrigger'
