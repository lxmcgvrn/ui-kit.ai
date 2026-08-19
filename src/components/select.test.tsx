import { render } from '@testing-library/react'
import { getMockOptions } from '@ui-kit.ai/mocks'
import { userEvent } from '@vitest/browser/context'
import { expect, test } from 'vitest'

import { Select } from './select'
import { describeElement, ringedElements } from './test-helpers'

test('the trigger alone carries the focus ring', async () => {
  render(
    <Select
      aria-label='City'
      items={getMockOptions<'listbox'>()}
    />
  )

  await userEvent.tab()

  const trigger = document.activeElement
  if (trigger?.tagName !== 'BUTTON') {
    throw new Error(`Tab landed on ${trigger == null ? 'nothing' : describeElement(trigger)}, not the trigger`)
  }

  expect(ringedElements(), 'the trigger alone carries the ring').toEqual([describeElement(trigger)])
})
