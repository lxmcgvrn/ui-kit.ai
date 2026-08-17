import type { AutocompleteProps as RACAutocompleteProps } from 'react-aria-components'

import { Autocomplete as RACAutocomplete, useFilter } from 'react-aria-components'

/** Filters a `Menu` or `ListBox` from a `TextField` or `SearchField`. */
export function Autocomplete(props: RACAutocompleteProps) {
  const baseFilter = useFilter({ sensitivity: 'base' })
  const filter = (textValue: string, inputValue: string) => baseFilter.contains(textValue, inputValue)

  return (
    <RACAutocomplete
      {...props}
      filter={props.filter ?? filter}
    />
  )
}
Autocomplete.displayName = 'Autocomplete'
