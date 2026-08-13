import type { AutocompleteProps as RACAutocompleteProps } from 'react-aria-components'

import { Autocomplete as RACAutocomplete, useFilter } from 'react-aria-components'

/**
 * An `Autocomplete` combines a `TextField` (or `SearchField`) with a `Menu` or `ListBox`, allowing users to search or filter a list of suggestions.
 */
export function Autocomplete(props: RACAutocompleteProps) {
    const { contains } = useFilter({ sensitivity: 'base' })
    const filter = (textValue: string, inputValue: string) => contains(textValue, inputValue)

    return (
        <RACAutocomplete
            {...props}
            filter={props.filter ?? filter}
        />
    )
}
Autocomplete.displayName = 'Autocomplete'
