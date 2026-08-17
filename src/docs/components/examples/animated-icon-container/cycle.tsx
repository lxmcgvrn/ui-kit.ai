'use client'

import { AnimatedIconContainer, Button } from '@ui-kit.ai/components'
import { LucideVolume1, LucideVolume2, LucideVolumeX } from 'lucide-react'
import { useState } from 'react'

const VOLUME_ICONS = [LucideVolumeX, LucideVolume1, LucideVolume2]
const VOLUME_LABELS = ['Muted', 'Quiet', 'Loud']

export default function AnimatedIconContainerCycle() {
    const [level, setLevel] = useState(0)
    const Icon = VOLUME_ICONS[level] ?? LucideVolumeX

    return (
        <Button
            onPress={() => {
                setLevel((level + 1) % VOLUME_ICONS.length)
            }}
            variant='secondary'
        >
            <AnimatedIconContainer>
                <Icon />
            </AnimatedIconContainer>
            {VOLUME_LABELS[level] ?? VOLUME_LABELS[0]}
        </Button>
    )
}
