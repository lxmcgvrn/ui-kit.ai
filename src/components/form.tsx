import type { ReactNode } from 'react'
import type { FieldValues, SubmitErrorHandler, SubmitHandler, UseFormProps } from 'react-hook-form'

import { FormProvider, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  /** Fields and a submit button; all get `react-hook-form` context. */
  children: ReactNode

  /** Class name for the form. */
  className?: string

  /** The form calls this when validation errors occur. */
  onError?: SubmitErrorHandler<TFieldValues>

  /** The form calls this on submit. */
  onSubmit: SubmitHandler<TFieldValues>

  /** Options passed to `react-hook-form`'s `useForm` hook. */
  options?: UseFormProps<TFieldValues>
}

/** A group of fields with validation, submission and error handling. */
export function Form<TFieldValues extends FieldValues = FieldValues>({
  children,
  className,
  onError,
  onSubmit,
  options,
}: FormProps<TFieldValues>) {
  const formMethods = useForm<TFieldValues>(options)

  return (
    <FormProvider {...formMethods}>
      <form
        className={twMerge(className, 'w-full')}
        onSubmit={(e) => void formMethods.handleSubmit(onSubmit, onError)(e)}
      >
        {children}
      </form>
    </FormProvider>
  )
}
Form.displayName = 'Form'
