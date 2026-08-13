import type { SearchFieldProps as RACSearchFieldProps } from 'react-aria-components'

import { LucideX } from 'lucide-react'
import { type ComponentProps, type ForwardedRef, forwardRef } from 'react'
import { SearchField as RACSearchField } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { FieldButton } from '../field-button'
import { Input } from '../input'
import { Tooltip, TooltipTrigger } from '../tooltip'

/**
 * Props accepted by {@link SearchField}. Everything `react-aria-components`'
 * `SearchField` accepts, plus a ref to the underlying input.
 */
export interface SearchFieldProps extends RACSearchFieldProps {
    ref?: ForwardedRef<HTMLInputElement>
}

/**
 * A search field allows a user to enter and clear a search query.
 */
export const SearchField = forwardRef(
    (
        { children = <Input />, ...props }: Omit<SearchFieldProps, 'ref'>,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <RACSearchField
                {...props}
                className={(renderProps) =>
                    twMerge(
                        typeof props.className === 'function'
                            ? props.className(renderProps)
                            : props.className,
                        'group relative w-full grow'
                    )
                }
                ref={ref}
            >
                {children}
            </RACSearchField>
        )
    }
)
SearchField.displayName = 'SearchField'

/**
 * Props accepted by {@link SearchFieldClearButton}.
 */
export interface SearchFieldClearButtonProps extends ComponentProps<typeof FieldButton> {}

/**
 * A `FieldButton` to clear the text field.
 */
export function SearchFieldClearButton(props: SearchFieldClearButtonProps) {
    return (
        <TooltipTrigger delay={0}>
            <FieldButton
                {...props}
                className='group-empty:invisible'
                slot='clear'
            >
                <LucideX aria-hidden />
            </FieldButton>

            <Tooltip placement='top'>Clear</Tooltip>
        </TooltipTrigger>
    )
}
SearchFieldClearButton.displayName = 'SearchFieldClearButton'
