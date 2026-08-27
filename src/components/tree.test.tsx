import { render } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Tree, TreeItem } from './tree'

/** The two chevrons of the first row, in DOM order: leading, then trailing. */
function chevrons(container: HTMLElement): [Element, Element] {
  const [leading, trailing] = container.querySelectorAll('button[slot="chevron"]')
  if (leading == null || trailing == null) {
    throw new Error('Expected a chevron on each side of the row')
  }

  return [leading, trailing]
}

function renderTree(expandIconPosition?: 'left' | 'right') {
  return render(
    <Tree
      aria-label='Files'
      expandIconPosition={expandIconPosition}
    >
      <TreeItem
        id='src'
        textValue='src'
        title='src'
      >
        <TreeItem
          id='index'
          textValue='index.ts'
          title='index.ts'
        />
      </TreeItem>
    </Tree>
  )
}

test('the chevron leads each row by default', () => {
  const { container } = renderTree()

  const [leading, trailing] = chevrons(container)
  expect(getComputedStyle(leading).display).not.toBe('none')
  expect(getComputedStyle(trailing).display).toBe('none')
})

test('expandIconPosition=right trails each row instead', () => {
  const { container } = renderTree('right')

  const [leading, trailing] = chevrons(container)
  expect(getComputedStyle(leading).display).toBe('none')
  expect(getComputedStyle(trailing).display).not.toBe('none')
})
