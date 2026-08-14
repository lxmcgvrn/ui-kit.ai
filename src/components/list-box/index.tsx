import type { ListBoxProps as RACListBoxProps } from 'react-aria-components'

import { composeRenderProps, ListBox as RACListBox } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import type { OptionsSchema } from '../types/options'

import { OptionRenderer } from '../options'

export interface ListBoxProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>
    extends Omit<RACListBoxProps<T>, 'children' | 'layout' | 'orientation'> {
    /** When `true`, ListBox renders a checkmark next to the selected option(s). */
    showCheckmarkOnSelected?: boolean
}

/** A list of options, one or more of them selectable. */
export function ListBox<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>({
    showCheckmarkOnSelected = true,
    ...props
}: ListBoxProps<T>) {
    return (
        <RACListBox
            {...props}
            className={composeRenderProps(props.className, (className) =>
                twMerge('outline-0', className)
            )}
        >
            {(props) => (
                <OptionRenderer
                    {...props}
                    showCheckmarkOnSelected={showCheckmarkOnSelected}
                    type='listbox'
                />
            )}
        </RACListBox>
    )
}
ListBox.displayName = 'ListBox'
