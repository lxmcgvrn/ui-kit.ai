'use client'

import { Button } from '@ui-kit.ai/components'
import { LucideCheck, LucideClipboard } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const CONFIRM_MS = 1500

export interface CopyButtonProps {
    children: string
    getValue: () => string
}

/** Copies a generated string, and says so for a moment afterwards. */
export function CopyButton({ children, getValue }: CopyButtonProps) {
    const [hasCopied, setHasCopied] = useState(false)
    const timeout = useRef<number | undefined>(undefined)

    useEffect(() => {
        return () => {
            window.clearTimeout(timeout.current)
        }
    }, [])

    const onPress = async () => {
        try {
            await navigator.clipboard.writeText(getValue())
        } catch {
            return
        }

        setHasCopied(true)
        window.clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
            setHasCopied(false)
        }, CONFIRM_MS)
    }

    return (
        <Button
            onPress={() => void onPress()}
            slotLeft={hasCopied ? <LucideCheck /> : <LucideClipboard />}
            variant='secondary'
        >
            {hasCopied ? 'Copied' : children}
        </Button>
    )
}
