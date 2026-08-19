import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'

import { Button } from './button'
import { Form } from './form'
import { FormRadioGroup } from './form-radio-group'
import { FormResetOnSubmit } from './form-reset-on-submit'
import { Label } from './label'
import { Radio } from './radio-group'

it('submits form with `FormRadioGroup`', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByLabelText, getByText } = render(
    <Form onSubmit={onSubmit}>
      <FormRadioGroup name='plan'>
        <Label>Plan</Label>
        <Radio
          label='Free'
          value='free'
        />
        <Radio
          label='Pro'
          value='pro'
        />
      </FormRadioGroup>
      <Button type='submit'>Submit</Button>
    </Form>
  )

  await user.click(getByLabelText('Pro'))
  await user.click(getByText('Submit'))

  expect(onSubmit).toHaveBeenCalledWith({ plan: 'pro' }, expect.anything())
})

it('submits `null` when no radio is selected', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByText } = render(
    <Form onSubmit={onSubmit}>
      <FormRadioGroup name='plan'>
        <Label>Plan</Label>
        <Radio
          label='Free'
          value='free'
        />
        <Radio
          label='Pro'
          value='pro'
        />
      </FormRadioGroup>
      <Button type='submit'>Submit</Button>
    </Form>
  )

  await user.click(getByText('Submit'))

  expect(onSubmit).toHaveBeenCalledWith({ plan: null }, expect.anything())
})

it('`FormRadioGroup` clears when reset after submission', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByLabelText, getByText } = render(
    <Form onSubmit={onSubmit}>
      <FormResetOnSubmit />
      <FormRadioGroup name='plan'>
        <Label>Plan</Label>
        <Radio
          label='Free'
          value='free'
        />
        <Radio
          label='Pro'
          value='pro'
        />
      </FormRadioGroup>
      <Button type='submit'>Submit</Button>
    </Form>
  )

  const pro = getByLabelText('Pro')
  await user.click(pro)
  await user.click(getByText('Submit'))

  expect(pro).not.toBeChecked()
})

it('handles `defaultValues` passed to `Form` with `FormRadioGroup`', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByLabelText, getByText } = render(
    <Form
      onSubmit={onSubmit}
      options={{ defaultValues: { plan: 'free' } }}
    >
      <FormRadioGroup name='plan'>
        <Label>Plan</Label>
        <Radio
          label='Free'
          value='free'
        />
        <Radio
          label='Pro'
          value='pro'
        />
      </FormRadioGroup>
      <Button type='submit'>Submit</Button>
    </Form>
  )

  expect(getByLabelText('Free')).toBeChecked()

  await user.click(getByText('Submit'))

  expect(onSubmit).toHaveBeenCalledWith({ plan: 'free' }, expect.anything())
})
