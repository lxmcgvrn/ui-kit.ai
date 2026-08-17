'use client'

import type { Intent, Scheme } from '@ui-kit.ai/theme'

import { INTENTS } from '@ui-kit.ai/theme'
import { useState } from 'react'

import type { ThemeEditorController } from './use-theme-input'

import { IntentNode } from './intent-node'

export interface ColourTreeProps {
    controller: ThemeEditorController
    scheme: Scheme
}

/** Five seeds, and the sixty tokens they generate, as one 4px-pitched tree. */
export function ColourTree({ controller, scheme }: ColourTreeProps) {
    /* One branch at a time: twelve leaves are already most of the drawer. */
    const [expanded, setExpanded] = useState<Intent>()

    return (
        <div className='flex flex-col gap-1'>
            {INTENTS.map((intent) => (
                <IntentNode
                    controller={controller}
                    intent={intent}
                    isExpanded={expanded === intent}
                    key={intent}
                    onToggle={() => {
                        setExpanded((current) => (current === intent ? undefined : intent))
                    }}
                    scheme={scheme}
                />
            ))}
        </div>
    )
}
