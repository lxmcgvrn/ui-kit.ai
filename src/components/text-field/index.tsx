import type { ComponentProps, ComponentPropsWithoutRef, ForwardedRef } from 'react'
import type { TextFieldProps as RACTextFieldProps } from 'react-aria-components'

import { LucideClipboard, LucideEye, LucideEyeOff, LucideX } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
    ButtonContext as RACButtonContext,
    TextField as RACTextField,
    useSlottedContext,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

import { FieldButton } from '../field-button'
import { Input } from '../input'
import { Tooltip, TooltipTrigger } from '../tooltip'

export interface TextFieldProps extends RACTextFieldProps {
    ref?: ForwardedRef<HTMLInputElement>
}

/** A text input, composable with labels, icons and validation messages. */
export function TextField({ children = <Input />, ref, ...props }: TextFieldProps) {
    const [value, setValue] = useState<RACTextFieldProps['value']>(
        props.value ?? props.defaultValue ?? ''
    )

    const [type, setType] = useState<RACTextFieldProps['type']>(props.type)

    const clearValue = useCallback(() => {
        setValue('')
    }, [])

    const toggleVisibility = useCallback(() => {
        setType((c) => (c === 'password' ? 'text' : 'password'))
    }, [])

    const copyValue = useCallback(() => {
        if (value == null) return

        return navigator.clipboard.writeText(value)
        // .then(() => toast.success(i18n.copied_to_clipboard)) // ToDo: Add toast
    }, [value])

    useEffect(() => {
        setValue(props.value ?? props.defaultValue ?? '')
    }, [props.value, props.defaultValue])

    const buttonContext: Record<
        'slots',
        Record<string, ComponentPropsWithoutRef<typeof FieldButton>>
    > = useMemo(() => {
        return {
            slots: {
                clear: {
                    isDisabled: value == null || props.isDisabled === true || props.isReadOnly,
                    onPress: clearValue,
                },
                copy: {
                    isDisabled: value == null,
                    onPress: copyValue,
                },
                visibility: {
                    onPress: toggleVisibility,
                    value: type === 'password' ? 'hidden' : 'visible',
                },
            },
        }
    }, [value, props.isDisabled, props.isReadOnly, clearValue, copyValue, toggleVisibility, type])

    return (
        <RACButtonContext.Provider value={buttonContext}>
            <RACTextField
                {...props}
                className={(rp) =>
                    twMerge(
                        'group invalid:error relative w-full',
                        typeof props.className === 'function'
                            ? props.className(rp)
                            : props.className
                    )
                }
                onChange={(v) => {
                    setValue(v)
                    props.onChange?.(v)
                }}
                ref={ref}
                type={type}
                value={value}
            >
                {(renderProps) =>
                    typeof children === 'function' ? children(renderProps) : children
                }
            </RACTextField>
        </RACButtonContext.Provider>
    )
}
TextField.displayName = 'TextField'

export interface TextFieldClearButtonProps extends ComponentProps<typeof FieldButton> {}

/** A `FieldButton` to clear the text field. */
export function TextFieldClearButton(props: TextFieldClearButtonProps) {
    return (
        <TooltipTrigger delay={0}>
            <FieldButton
                {...props}
                className={(renderProps) =>
                    twMerge(
                        'transition-opacity',
                        'group:placeholder-shown:invisible group:placeholder-shown:hidden group:placeholder-shown:opacity-0',
                        typeof props.className === 'function'
                            ? props.className(renderProps)
                            : props.className
                    )
                }
                slot='clear'
            >
                <LucideX />
            </FieldButton>

            <Tooltip placement='top'>Clear</Tooltip>
        </TooltipTrigger>
    )
}
TextFieldClearButton.displayName = 'TextFieldClearButton'

export interface TextFieldCopyButtonProps extends ComponentProps<typeof FieldButton> {}

/** A `FieldButton` to copy the text field value to the clipboard. */
export function TextFieldCopyButton(props: TextFieldCopyButtonProps) {
    return (
        <TooltipTrigger delay={0}>
            <FieldButton
                {...props}
                slot='copy'
            >
                <LucideClipboard />
            </FieldButton>

            <Tooltip placement='top'>Copy to clipboard</Tooltip>
        </TooltipTrigger>
    )
}
TextFieldCopyButton.displayName = 'TextFieldCopyButton'

export interface TextFieldVisibilityButtonProps extends ComponentProps<typeof FieldButton> {}

/** A `FieldButton` to toggle the visibility of the text field value. */
export function TextFieldVisibilityButton(props: TextFieldVisibilityButtonProps) {
    const context = useSlottedContext(RACButtonContext, 'visibility')

    return (
        <TooltipTrigger delay={0}>
            <FieldButton
                {...props}
                slot='visibility'
            >
                {context?.value === 'hidden' ? <LucideEyeOff /> : <LucideEye />}
            </FieldButton>

            <Tooltip placement='top'>{context?.value === 'hidden' ? 'Show' : 'Hide'}</Tooltip>
        </TooltipTrigger>
    )
}
TextFieldVisibilityButton.displayName = 'TextFieldVisibilityButton'
