'use client'

import { Button, GridList, GridListItem } from '@ui-kit.ai/components'
import { LucideTrash2 } from 'lucide-react'

const TASKS = [
    { id: 'draft', name: 'Draft the release notes' },
    { id: 'review', name: 'Review the migration guide' },
    { id: 'ship', name: 'Ship the beta' },
]

export default function GridListWithActions() {
    return (
        <GridList
            aria-label='Tasks'
            items={TASKS}
            selectionMode='multiple'
        >
            {(task) => (
                <GridListItem textValue={task.name}>
                    <span className='flex-1 truncate'>{task.name}</span>
                    <Button
                        aria-label={`Delete ${task.name}`}
                        className='!size-6'
                        isIcon
                        variant='tertiary'
                    >
                        <LucideTrash2 aria-hidden />
                    </Button>
                </GridListItem>
            )}
        </GridList>
    )
}
