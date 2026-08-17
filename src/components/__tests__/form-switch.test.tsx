import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'

import { Button } from '../button'
import { Form } from '../form'
import { FormSwitch } from '../form-switch'

it('submits form with `FormSwitch`', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByRole, getByText } = render(
    <Form onSubmit={onSubmit}>
      <FormSwitch
        label='Email notifications'
        name='notifications'
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )

  await user.click(getByRole('switch'))
  await user.click(getByText('Submit'))

  expect(onSubmit).toHaveBeenCalledWith({ notifications: true }, expect.anything())
})

it('submits `false` while `FormSwitch` is off', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByText } = render(
    <Form onSubmit={onSubmit}>
      <FormSwitch
        label='Email notifications'
        name='notifications'
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )

  await user.click(getByText('Submit'))

  expect(onSubmit).toHaveBeenCalledWith({ notifications: false }, expect.anything())
})

it('handles `defaultValues` passed to `Form` with `FormSwitch`', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockImplementation(() => null)

  const { getByRole, getByText } = render(
    <Form
      onSubmit={onSubmit}
      options={{ defaultValues: { notifications: true } }}
    >
      <FormSwitch
        label='Email notifications'
        name='notifications'
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )

  expect(getByRole('switch')).toBeChecked()

  await user.click(getByText('Submit'))

  expect(onSubmit).toHaveBeenCalledWith({ notifications: true }, expect.anything())
})
