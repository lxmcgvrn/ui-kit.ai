import { useCallback, useEffect, useRef, useState } from 'react'

/** How long the "copied" confirmation stands in for the resting state. */
const COPY_CONFIRM_MS = 1500

/** Drives the confirmed-state swap shared by every copy-to-clipboard button. */
export function useCopyConfirmation() {
    const [hasCopied, setHasCopied] = useState(false)
    const timeout = useRef<number | undefined>(undefined)

    useEffect(() => {
        return () => {
            window.clearTimeout(timeout.current)
        }
    }, [])

    const confirmCopy = useCallback(() => {
        setHasCopied(true)
        window.clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
            setHasCopied(false)
        }, COPY_CONFIRM_MS)
    }, [])

    return { confirmCopy, hasCopied }
}
