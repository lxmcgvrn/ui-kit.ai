import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

/** Resets the form after a successful submission. */
export function FormResetOnSubmit() {
    const {
        formState: { isSubmitSuccessful },
        reset,
    } = useFormContext()

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }
    }, [isSubmitSuccessful, reset])

    return null
}
FormResetOnSubmit.displayName = 'FormResetOnSubmit'
