import { parseDate } from '@internationalized/date'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@vitest/browser/context'
import { expect, test, vi } from 'vitest'

import { DateField, DateInput } from './date-field'
import { FieldButtonClear } from './field-button-clear'
import { FieldGroup } from './field-group'

function renderClearableDateField(defaultValue: null | ReturnType<typeof parseDate>, onChange?: (value: unknown) => void) {
  render(
    <DateField
      aria-label='Date'
      defaultValue={defaultValue}
      onChange={onChange}
    >
      <FieldGroup>
        <DateInput isBorderless />
        <FieldButtonClear />
      </FieldGroup>
    </DateField>
  )
}

test('the clear button empties the field', async () => {
  const onChange = vi.fn()
  renderClearableDateField(parseDate('2026-08-18'), onChange)

  await userEvent.click(screen.getByRole('button', { name: 'Clear' }))

  expect(onChange).toHaveBeenCalledWith(null)
})

test('the clear button hides while the field is empty', () => {
  renderClearableDateField(null)

  /* Hidden means gone from the accessibility tree too, so query by attribute. */
  const clearButton = document.querySelector('[aria-label="Clear"]')
  if (clearButton == null) {
    throw new Error('The clear button never rendered')
  }

  expect(getComputedStyle(clearButton).display).toBe('none')
})
