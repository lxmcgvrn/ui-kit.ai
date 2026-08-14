import type { ListBoxProps as RACListBoxProps } from 'react-aria-components'

import { ListBox as RACListBox } from 'react-aria-components'

import type { OptionsSchema } from '../types/options'

import { OptionRenderer } from '../options'

export interface ListBoxProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>
    extends Omit<RACListBoxProps<T>, 'children' | 'layout' | 'orientation'> {
    /** When `true` a checkmark is rendered next to the selected option(s). */
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
            className={(renderProps) => (
                typeof props.className === 'function'
                    ? props.className(renderProps)
                    : props.className,
                'outline-0'
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
