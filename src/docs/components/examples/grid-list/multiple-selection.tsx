'use client'

import { GridList, GridListItem } from '@ui-kit.ai/components'

const RECIPIENTS = [
    { email: 'ada@example.com', id: 'ada', name: 'Ada Lovelace' },
    { email: 'grace@example.com', id: 'grace', name: 'Grace Hopper' },
    { email: 'alan@example.com', id: 'alan', name: 'Alan Turing' },
]

export default function GridListMultipleSelection() {
    return (
        <GridList
            aria-label='Recipients'
            defaultSelectedKeys={['grace']}
            items={RECIPIENTS}
            selectionMode='multiple'
        >
            {(recipient) => (
                <GridListItem textValue={recipient.name}>
                    <span className='truncate'>{recipient.name}</span>
                    <span className='text-lo-contrast truncate'>{recipient.email}</span>
                </GridListItem>
            )}
        </GridList>
    )
}
