import type { LabelProps as RACLabelProps } from 'react-aria-components'

import { Text as RACText } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export interface DescriptionProps extends RACLabelProps {
    /** The description text to announce alongside the field or control. */
    children?: RACLabelProps['children']
}

/** Extra context for a field or control, announced by screen readers. */
export function Description(props: DescriptionProps) {
    return (
        <RACText
            {...props}
            className={twMerge(
                'mb-1 block w-fit cursor-default last:mt-2',
                'text-lo-contrast text-sm font-normal',
                'group-invalid:error',
                'group-disabled:cursor-not-allowed group-disabled:opacity-50',
                props.className
            )}
            slot='description'
        />
    )
}
Description.displayName = 'Description'
