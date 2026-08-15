'use client'

import { TagGroup, TagGroupItem, TagList } from '@ui-kit.ai/components'
import { LucideCircleAlert, LucideCircleCheck, LucideTriangleAlert } from 'lucide-react'

const BUILDS = [
    { icon: <LucideCircleCheck />, id: 'passed', intent: 'success', name: 'Passed' },
    { icon: <LucideTriangleAlert />, id: 'flaky', intent: 'warning', name: 'Flaky' },
    { icon: <LucideCircleAlert />, id: 'failed', intent: 'error', name: 'Failed' },
] as const

export default function TagGroupIntents() {
    return (
        <TagGroup aria-label='Build results'>
            <TagList items={BUILDS}>
                {(build) => (
                    <TagGroupItem
                        intent={build.intent}
                        slotLeft={build.icon}
                    >
                        {build.name}
                    </TagGroupItem>
                )}
            </TagList>
        </TagGroup>
    )
}
