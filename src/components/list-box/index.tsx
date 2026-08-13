import type { ListBoxProps as AriaListBoxProps } from 'react-aria-components'

import { ListBox as AriaListBox } from 'react-aria-components'

import type { OptionsSchema } from '../types/options'

import { OptionRenderer } from '../options'

/**
 * Props accepted by {@link ListBox}. Everything `react-aria-components`'
 * `ListBox` accepts — minus the props this component owns — plus this design
 * system's presentational props.
 */
export interface ListBoxProps<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>
    extends Omit<AriaListBoxProps<T>, 'children' | 'layout' | 'orientation'> {
    /**
     * When `true` a checkmark is rendered next to the selected option(s).
     */
    showCheckmarkOnSelected?: boolean
}

/**
 * A listbox displays a list of options and allows a user to select one or more of them.
 */
export function ListBox<T extends OptionsSchema<'listbox'> = OptionsSchema<'listbox'>>({
    showCheckmarkOnSelected = true,
    ...props
}: ListBoxProps<T>) {
    return (
        <AriaListBox
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
        </AriaListBox>
    )
}
ListBox.displayName = 'ListBox'
