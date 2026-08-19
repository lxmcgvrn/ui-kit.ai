import type { ReactElement } from 'react'

import { render, screen } from '@testing-library/react'
import { getMockOptions } from '@ui-kit.ai/mocks'
import { userEvent } from '@vitest/browser/context'
import { expect, test } from 'vitest'

import { ColorField } from './color-field'
import { ColorFieldGroup, ColorFieldGroupClearButton } from './color-field-group'
import { ColorSwatch } from './color-swatch'
import { ComboBox, ComboBoxButton, ComboBoxFieldGroup, ComboBoxInput } from './combo-box'
import { DateField, DateInput } from './date-field'
import { DatePicker } from './date-picker'
import { DateRangePicker } from './date-range-picker'
import { FieldButtonClear } from './field-button-clear'
import { FieldButtonCopy } from './field-button-copy'
import { FieldButtonVisibility } from './field-button-visibility'
import { FieldGroup } from './field-group'
import { Input } from './input'
import { NumberField, NumberFieldDecrementButton, NumberFieldIncrementButton } from './number-field'
import { SearchField, SearchFieldClearButton } from './search-field'
import { describeElement, ringedElements } from './test-helpers'
import { TextField } from './text-field'

/** Every composition that embeds a focusable control in a `FieldGroup`. */
const GROUPED_FIELDS: [string, ReactElement][] = [
  [
    'FieldGroup with a bare Input',
    <FieldGroup key=''>
      <Input
        aria-label='City'
        isBorderless
      />
    </FieldGroup>,
  ],
  [
    'TextField with every field button',
    <TextField
      aria-label='City'
      key=''
    >
      <FieldGroup>
        <Input isBorderless />
        <FieldButtonClear />
        <FieldButtonVisibility />
        <FieldButtonCopy />
      </FieldGroup>
    </TextField>,
  ],
  [
    'NumberField with steppers',
    <NumberField
      aria-label='Amount'
      defaultValue={8}
      key=''
    >
      <FieldGroup>
        <Input isBorderless />
        <NumberFieldDecrementButton />
        <NumberFieldIncrementButton />
      </FieldGroup>
    </NumberField>,
  ],
  [
    'ColorField with clear and copy',
    <ColorField
      aria-label='Color'
      defaultValue='#5000ff'
      key=''
    >
      <FieldGroup>
        <Input isBorderless />
        <FieldButtonClear />
        <FieldButtonCopy />
      </FieldGroup>
    </ColorField>,
  ],
  [
    'ColorFieldGroup with a swatch',
    <ColorFieldGroup
      aria-label='Color'
      defaultValue='#5000ff'
      key=''
    >
      <FieldGroup>
        <ColorSwatch className='ml-2 size-4 shrink-0 rounded-full' />
        <div className='min-w-0 grow'>
          <Input isBorderless />
        </div>
        <ColorFieldGroupClearButton />
      </FieldGroup>
    </ColorFieldGroup>,
  ],
  [
    'SearchField with its clear button',
    <SearchField
      aria-label='Search'
      key=''
    >
      <FieldGroup>
        <Input isBorderless />
        <SearchFieldClearButton />
      </FieldGroup>
    </SearchField>,
  ],
  [
    'ComboBox with clear and toggle buttons',
    <ComboBox
      aria-label='City'
      items={getMockOptions<'listbox'>()}
      key=''
    >
      <ComboBoxFieldGroup>
        <ComboBoxInput isBorderless />
        <FieldButtonClear />
        <ComboBoxButton />
      </ComboBoxFieldGroup>
    </ComboBox>,
  ],
  [
    'DateField in a FieldGroup',
    <DateField
      aria-label='Date'
      key=''
    >
      <FieldGroup>
        <DateInput isBorderless />
      </FieldGroup>
    </DateField>,
  ],
  [
    'DatePicker',
    <DatePicker
      aria-label='Date'
      key=''
    />,
  ],
  [
    'DateRangePicker',
    <DateRangePicker
      aria-label='Dates'
      key=''
    />,
  ],
]

test.each(GROUPED_FIELDS)('%s puts the focus ring on the group alone', async (_, field) => {
  render(field)

  await userEvent.tab()

  /* RAC can clone children into a hidden collection tree, so match by focus. */
  const focused = document.activeElement ?? document.body
  const group = [...document.querySelectorAll('[data-field-group]')].find((candidate) => candidate.contains(focused))
  if (group == null) {
    throw new Error(`Tab landed on ${describeElement(focused)}, outside every field group`)
  }

  expect(ringedElements(), 'the group alone carries the ring').toEqual([describeElement(group)])
})

test('a standalone Input carries its own ring', async () => {
  render(<Input aria-label='City' />)

  await userEvent.tab()

  const input = screen.getByRole('textbox')
  expect(document.activeElement).toBe(input)
  expect(ringedElements()).toEqual([describeElement(input)])
})

test('a standalone DateField rings its DateInput, not the focused segment', async () => {
  const { container } = render(
    <DateField aria-label='Date'>
      <DateInput />
    </DateField>
  )

  await userEvent.tab()

  const dateInput = container.querySelector('[data-focus-within]')
  if (dateInput == null) {
    throw new Error('The DateInput never tracked focus within itself')
  }

  expect(ringedElements()).toEqual([describeElement(dateInput)])
})
