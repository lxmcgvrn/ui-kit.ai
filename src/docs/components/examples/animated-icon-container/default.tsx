'use client'

import { AnimatedIconContainer, Button } from '@ui-kit.ai/components'
import { LucidePause, LucidePlay } from 'lucide-react'
import { useState } from 'react'

export default function AnimatedIconContainerDefault() {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <Button
            aria-label={isPlaying ? 'Pause' : 'Play'}
            isIcon
            onPress={() => {
                setIsPlaying(!isPlaying)
            }}
        >
            <AnimatedIconContainer>
                {isPlaying ? <LucidePause /> : <LucidePlay />}
            </AnimatedIconContainer>
        </Button>
    )
}
