import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'

import { Button } from './button'
import { FieldGroup } from './field-group'
import { Form } from './form'
import { FormNumberField } from './form-number-field'
import { Input } from './input'
import { Label } from './label'
import { NumberFieldIncrementButton } from './number-field'

it('submits form with `FormNumberField`', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByLabelText, getByText } = render(
    <Form onSubmit={onSubmit}>
      <FormNumberField name='quantity'>
        <Label>Quantity</Label>
        <FieldGroup>
          <Input isBorderless />
        </FieldGroup>
      </FormNumberField>
      <Button type='submit'>Submit</Button>
    </Form>
  )

  await user.type(getByLabelText('Quantity'), '12')
  await user.tab()
  await user.click(getByText('Submit'))

  expect(onSubmit).toHaveBeenCalledWith({ quantity: 12 }, expect.anything())
})

it('submits `null` while `FormNumberField` is empty', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByText } = render(
    <Form onSubmit={onSubmit}>
      <FormNumberField name='quantity'>
        <Label>Quantity</Label>
        <FieldGroup>
          <Input isBorderless />
        </FieldGroup>
      </FormNumberField>
      <Button type='submit'>Submit</Button>
    </Form>
  )

  await user.click(getByText('Submit'))

  expect(onSubmit).toHaveBeenCalledWith({ quantity: undefined }, expect.anything())
})

it('steps the value with `NumberFieldIncrementButton`', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByLabelText, getByRole, getByText } = render(
    <Form onSubmit={onSubmit}>
      <FormNumberField
        defaultValue={10}
        name='quantity'
        step={5}
      >
        <Label>Quantity</Label>
        <FieldGroup>
          <Input isBorderless />
          <NumberFieldIncrementButton />
        </FieldGroup>
      </FormNumberField>
      <Button type='submit'>Submit</Button>
    </Form>
  )

  await user.click(getByRole('button', { name: /increase/i }))
  await user.click(getByText('Submit'))

  expect(getByLabelText('Quantity', { selector: 'input' })).toHaveValue('15')
  expect(onSubmit).toHaveBeenCalledWith({ quantity: 15 }, expect.anything())
})

it('handles `defaultValues` passed to `Form` with `FormNumberField`', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByLabelText, getByText } = render(
    <Form
      onSubmit={onSubmit}
      options={{ defaultValues: { quantity: 7 } }}
    >
      <FormNumberField name='quantity'>
        <Label>Quantity</Label>
        <FieldGroup>
          <Input isBorderless />
        </FieldGroup>
      </FormNumberField>
      <Button type='submit'>Submit</Button>
    </Form>
  )

  expect(getByLabelText('Quantity')).toHaveValue('7')

  await user.click(getByText('Submit'))

  expect(onSubmit).toHaveBeenCalledWith({ quantity: 7 }, expect.anything())
})
