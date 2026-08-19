import { parseDate } from '@internationalized/date'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@vitest/browser/context'
import { expect, test, vi } from 'vitest'

import { DateRangePicker, DateRangePickerButton, DateRangePickerInput } from './date-range-picker'
import { FieldButtonClear } from './field-button-clear'
import { FieldGroup } from './field-group'

function renderClearableDateRangePicker(onChange: (value: unknown) => void) {
  render(
    <DateRangePicker
      aria-label='Dates'
      defaultValue={{ end: parseDate('2026-08-22'), start: parseDate('2026-08-18') }}
      onChange={onChange}
    >
      <FieldGroup>
        <DateRangePickerInput />
        <FieldButtonClear />
        <DateRangePickerButton />
      </FieldGroup>
    </DateRangePicker>
  )
}

test('the clear button empties both fields', async () => {
  const onChange = vi.fn()
  renderClearableDateRangePicker(onChange)

  await userEvent.click(screen.getByRole('button', { name: 'Clear' }))

  expect(onChange).toHaveBeenCalledWith(null)
})

test('the calendar button still opens the popover', async () => {
  renderClearableDateRangePicker(vi.fn())

  const trigger = screen.getAllByRole('button').find((button) => button.getAttribute('aria-label') !== 'Clear')
  if (trigger == null) {
    throw new Error('The calendar button never rendered')
  }

  await userEvent.click(trigger)

  expect(await screen.findByRole('dialog')).toBeInTheDocument()
})
