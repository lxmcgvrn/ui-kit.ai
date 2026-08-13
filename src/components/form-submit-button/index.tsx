import { useFormState } from 'react-hook-form'

import type { ButtonProps } from '../button'

import { Button } from '../button'

/**
 * Props accepted by {@link FormSubmitButton} — every {@link ButtonProps} prop.
 * `isDisabled` and `isPending` are managed from the surrounding form's state.
 */
export interface FormSubmitButtonProps extends ButtonProps {
    /**
     * The button's label. Defaults to `Submit`.
     */
    children?: ButtonProps['children']
}

/**
 * A FormSubmitButton handles form submission, and listen's to
 * `react-hook-form`'s state to handle disabled * pending states appropriately.
 */
export function FormSubmitButton({
    children = 'Submit',
    variant = 'primary',
    ...props
}: FormSubmitButtonProps) {
    const { isDirty, isSubmitting, isValidating } = useFormState()

    return (
        <Button
            {...props}
            isDisabled={isDirty === false}
            isPending={props.isPending === true || isSubmitting === true || isValidating === true}
            type='submit'
            variant={variant}
        >
            {children}
        </Button>
    )
}
FormSubmitButton.displayName = 'FormSubmitButton'
