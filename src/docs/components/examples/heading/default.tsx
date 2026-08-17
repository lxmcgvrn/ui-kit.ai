'use client'

import type { ComponentProps } from 'react'

import { Heading } from '@ui-kit.ai/components'

const LEVELS = [1, 2, 3, 4, 5, 6] satisfies ComponentProps<typeof Heading>['level'][]

const TEXT = 'Lorem ipsum dolor...'

export default function HeadingDefault() {
  return (
    <div>
      {LEVELS.map((level) => (
        <Heading
          className='mb-0 truncate'
          key={level}
          level={level}
        >
          {`H${String(level)} ${TEXT} `}
        </Heading>
      ))}
    </div>
  )
}
