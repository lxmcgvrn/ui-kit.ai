import type {
    HeadingProps as RACHeadingProps,
    ListBoxItemRenderProps as RACListBoxItemRenderProps,
} from 'react-aria-components'

import { LucideCheck } from 'lucide-react'
import {
    composeRenderProps,
    Collection as RACCollection,
    Header as RACHeader,
    ListBoxItem as RACListBoxItem,
    ListBoxSection as RACListBoxSection,
    MenuItem as RACMenuItem,
    MenuSection as RACMenuSection,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import type {
    OptionsItemSchema,
    OptionsSchema,
    OptionsSectionSchema,
    OptionType,
} from '../types/options'

type OptionsSectionProps<TType extends OptionType> = OptionsSectionSchema<TType> & {
    type: TType
}

const optionStyle = tv({
    base: [
        'group/options-item',
        'flex items-center gap-1.5',
        'cursor-default',
        'text-hi-contrast text-sm',
        'outline outline-0',
        'rounded-sm select-none',
        'px-2 py-0.5',
        'forced-color-adjust-none',
        // disabled
        'disabled:text-placeholder',
        // hover
        'hover:bg-tint',
        // focus
        'focus:bg-tint',
        // pressed
        'pressed:bg-tint',
        // selected
        'selected:bg-tint',
    ],
})

/** Internal. Renders `ListBox` and `Menu` items consistently. */
export function OptionRenderer<
    TType extends OptionType,
    TItemId extends string = string,
    TValue extends object = object,
>(
    props: OptionsSchema<TType, TItemId, TValue> & {
        showCheckmarkOnSelected?: boolean
        type: TType
    }
) {
    if (isItem(props)) {
        return <OptionsItem {...props} />
    } else if (isSection(props)) {
        return <OptionsSection<TType> {...props} />
    }

    return null
}
OptionRenderer.displayName = 'OptionRenderer'

function isItem<TType extends OptionType>(
    props: OptionsSchema<TType>
): props is OptionsItemSchema<TType> {
    return !('items' in props)
}

function isSection<TType extends OptionType>(
    item: OptionsSchema<TType> & { type: TType }
): item is OptionsSectionProps<TType> {
    return 'items' in item
}

function OptionsItem<TType extends OptionType>({
    intent,
    showCheckmarkOnSelected,
    type,
    ...props
}: OptionsSchema<TType> & {
    showCheckmarkOnSelected?: boolean
    type: TType
}) {
    const Component = type === 'listbox' ? RACListBoxItem : RACMenuItem

    return (
        <Component
            {...props}
            aria-label={props.textValue}
            className={composeRenderProps<
                string | undefined,
                RACListBoxItemRenderProps & { defaultClassName: string | undefined },
                string
            >(props.className, (className) => twMerge(optionStyle(), intent, className))}
        >
            {({ isSelected }) => (
                <>
                    {props.icon != null ? (
                        <div
                            className={twMerge(
                                'flex items-center justify-center',
                                'text-lo-contrast',
                                'pointer-events-none',
                                'size-4 [&_svg]:size-3 [&_svg]:shrink-0'
                            )}
                        >
                            {props.icon}
                        </div>
                    ) : null}
                    <div className='flex-1 truncate'>
                        <span
                            className={twMerge(
                                'flex items-center gap-1',
                                'truncate font-normal',
                                'group-selected/options-item:font-medium'
                            )}
                        >
                            {props.children ?? props.textValue}
                        </span>
                        {props.description != null ? (
                            <span className='text-lo-contrast group-focus/options-item:text-hi-contrast truncate text-sm font-normal'>
                                {props.description}
                            </span>
                        ) : null}
                    </div>
                    {showCheckmarkOnSelected === true && isSelected ? (
                        <LucideCheck className='text-lo-contrast size-3' />
                    ) : null}
                </>
            )}
        </Component>
    )
}
OptionsItem.displayName = 'OptionsItem'

function OptionsSection<TType extends OptionType>({ type, ...props }: OptionsSectionProps<TType>) {
    const Component = type === 'listbox' ? RACListBoxSection : RACMenuSection

    return (
        <Component className='mb-2 last:mb-0'>
            {props.textValue != null ? (
                <OptionsSectionHeader>{props.textValue}</OptionsSectionHeader>
            ) : null}

            <RACCollection items={props.items}>
                {(props) => (
                    <OptionsItem
                        {...props}
                        type={type}
                    />
                )}
            </RACCollection>
        </Component>
    )
}
OptionsSection.displayName = 'OptionsSection'

function OptionsSectionHeader(props: RACHeadingProps) {
    return (
        <RACHeader
            className='text-lo-contrast px-1.5 py-1 text-xs font-medium tracking-wide uppercase'
            {...props}
        />
    )
}
OptionsSectionHeader.displayName = 'OptionsSectionHeader'
