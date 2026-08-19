import type { ForwardedRef, ReactNode } from 'react'
import type {
  DateFieldProps as RACDateFieldProps,
  DateFieldRenderProps as RACDateFieldRenderProps,
  DateInputProps as RACDateInputProps,
  DateSegmentProps as RACDateSegmentProps,
  DateValue as RACDateValue,
} from 'react-aria-components'

import { useContext, useMemo } from 'react'
import {
  composeRenderProps,
  ButtonContext as RACButtonContext,
  DateField as RACDateField,
  DateFieldStateContext as RACDateFieldStateContext,
  DateInput as RACDateInput,
  DateSegment as RACDateSegment,
  DEFAULT_SLOT as RACDEFAULT_SLOT,
} from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { fieldVariants } from './styles/field-variants'

const dateInputStyles = tv({
  base: ['flex items-center', 'px-3', 'text-sm', 'w-full whitespace-nowrap'],
  extend: fieldVariants,
})

const dateSegmentStyles = tv({
  base: [
    'rounded-xs px-0.5',
    'tabular-nums caret-transparent',
    'forced-color-adjust-none',
    'type-literal:text-placeholder type-literal:px-0',
    'placeholder-shown:text-placeholder',
    'focus:bg-primary focus:text-accent',
    'disabled:text-placeholder',
  ],
})

/** Renders one editable segment; the default child of {@link DateInput}. */
const renderDateSegment: RACDateInputProps['children'] = (segment) => <DateSegment segment={segment} />

export interface DateFieldProps<T extends RACDateValue = RACDateValue> extends RACDateFieldProps<T> {
  ref?: ForwardedRef<HTMLDivElement>
}

/** A date input the user edits segment by segment with the keyboard. */
export function DateField<T extends RACDateValue = RACDateValue>({ children = <DateInput />, ref, ...props }: DateFieldProps<T>) {
  return (
    <RACDateField<T>
      {...props}
      className={composeRenderProps(props.className, (className) => twMerge('group invalid:error relative w-full', className))}
      ref={ref}
    >
      {composeRenderProps<ReactNode, RACDateFieldRenderProps & { defaultChildren: ReactNode }, ReactNode>(children, (children) => (
        <DateFieldButtons isDisabled={props.isDisabled === true || props.isReadOnly === true}>{children}</DateFieldButtons>
      ))}
    </RACDateField>
  )
}
DateField.displayName = 'DateField'

export interface DateInputProps extends Omit<RACDateInputProps, 'children'> {
  /** Renders each segment. Defaults to a `DateSegment`. */
  children?: RACDateInputProps['children']

  /** When `true`, DateInput renders without its border and background. */
  isBorderless?: boolean
  ref?: ForwardedRef<HTMLDivElement>
}

/** Groups the editable segments of a date or time field into one field. */
export function DateInput({ children = renderDateSegment, isBorderless, ref, ...props }: DateInputProps) {
  return (
    <RACDateInput
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dateInputStyles({
          ...renderProps,
          className,
          isBorderless,
        })
      )}
      data-variant-borderless={isBorderless}
      ref={ref}
    >
      {children}
    </RACDateInput>
  )
}
DateInput.displayName = 'DateInput'

export interface DateSegmentProps extends RACDateSegmentProps {
  ref?: ForwardedRef<HTMLDivElement>
}

/** A single unit of a date or time, editable by typing or arrow keys. */
export function DateSegment({ ref, ...props }: DateSegmentProps) {
  return (
    <RACDateSegment
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dateSegmentStyles({
          ...renderProps,
          className,
        })
      )}
      ref={ref}
    />
  )
}
DateSegment.displayName = 'DateSegment'

interface DateFieldButtonsProps {
  children: ReactNode
  isDisabled: boolean
}

/** Hands the composed buttons their slot props. */
function DateFieldButtons({ children, isDisabled }: DateFieldButtonsProps) {
  return <RACButtonContext.Provider value={useDateFieldButtons(isDisabled)}>{children}</RACButtonContext.Provider>
}
DateFieldButtons.displayName = 'DateFieldButtons'

/** Slot props for the `FieldButtonClear` a caller composes in. */
function useDateFieldButtons(isDisabled: boolean) {
  const state = useContext(RACDateFieldStateContext)
  const isEmpty = state?.value == null

  return useMemo(
    () => ({
      slots: {
        clear: {
          'data-empty': isEmpty || undefined,
          isDisabled: isEmpty || isDisabled,
          onPress: () => state?.setValue(null),
        },
        [RACDEFAULT_SLOT]: {},
      },
    }),
    [isDisabled, isEmpty, state]
  )
}
