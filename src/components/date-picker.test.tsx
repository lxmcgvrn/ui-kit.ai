import { parseDate } from '@internationalized/date'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@vitest/browser/context'
import { expect, test, vi } from 'vitest'

import { DateInput } from './date-field'
import { DatePicker, DatePickerButton } from './date-picker'
import { FieldButtonClear } from './field-button-clear'
import { FieldGroup } from './field-group'

function renderClearableDatePicker(onChange: (value: unknown) => void) {
  render(
    <DatePicker
      aria-label='Date'
      defaultValue={parseDate('2026-08-18')}
      onChange={onChange}
    >
      <FieldGroup>
        <DateInput isBorderless />
        <FieldButtonClear />
        <DatePickerButton />
      </FieldGroup>
    </DatePicker>
  )
}

test('the clear button empties the field', async () => {
  const onChange = vi.fn()
  renderClearableDatePicker(onChange)

  await userEvent.click(screen.getByRole('button', { name: 'Clear' }))

  expect(onChange).toHaveBeenCalledWith(null)
})

test('the calendar button still opens the popover', async () => {
  renderClearableDatePicker(vi.fn())

  const trigger = screen.getAllByRole('button').find((button) => button.getAttribute('aria-label') !== 'Clear')
  if (trigger == null) {
    throw new Error('The calendar button never rendered')
  }

  await userEvent.click(trigger)

  expect(await screen.findByRole('dialog')).toBeInTheDocument()
})
