import { useFormState } from 'react-hook-form'

import type { ButtonProps } from '../button'

import { Button } from '../button'

/** The form drives `isDisabled`, so anything passed for it is ignored. */
export interface FormSubmitButtonProps extends ButtonProps {
    /** The button's label. Defaults to `Submit`. */
    children?: ButtonProps['children']
}

/** Submits the form, tracking `react-hook-form`'s dirty and pending state. */
export function FormSubmitButton({
    children = 'Submit',
    variant = 'primary',
    ...props
}: FormSubmitButtonProps) {
    const { isDirty, isSubmitting, isValidating } = useFormState()

    return (
        <Button
            {...props}
            isDisabled={!isDirty}
            isPending={props.isPending === true || isSubmitting || isValidating}
            type='submit'
            variant={variant}
        >
            {children}
        </Button>
    )
}
FormSubmitButton.displayName = 'FormSubmitButton'
