/**
 * Adapted from Tania Rascia's keyboard shortcut hook.
 * @see https://www.taniarascia.com/keyboard-shortcut-hook-react/#conclusion
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export interface UseKbdShortcutsOptions {
    disableTextInputs?: boolean
}

export function useKbd(
    map: [string, () => void][],
    options: UseKbdShortcutsOptions = { disableTextInputs: true }
) {
    // Cache callback refs; avoids extra re-renders
    const callbackRefs = useRef<Map<string, () => void>>(new Map())
    const [keySequences, setKeySequences] = useState<Map<string, string[]>>(new Map())

    // Update callback refs whenever map changes
    useLayoutEffect(() => {
        map.forEach(([key, callback]) => {
            callbackRefs.current.set(key, callback)
        })
    }, [map])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const target = e.target as HTMLElement
            const isTextInput =
                target instanceof HTMLTextAreaElement ||
                (target instanceof HTMLInputElement && (!target.type || target.type === 'text')) ||
                target.isContentEditable

            // Don't enable shortcuts in inputs unless explicitly allowed
            if (options.disableTextInputs === true && isTextInput) {
                return
            }

            // Cancel the shortcut if the user holds the key down
            if (e.repeat) {
                return
            }

            const modifierMap = {
                Alt: e.altKey,
                Command: e.metaKey,
                Control: e.ctrlKey,
                Meta: e.metaKey, // Alias for Command
                Shift: e.shiftKey,
            }

            for (const [shortcut] of map) {
                // Handle combined modifier key shortcuts (e.g. Control+D)
                if (shortcut.includes('+')) {
                    const keyArray = shortcut.split('+')

                    // If the first key is a modifier, handle combinations
                    if (
                        typeof keyArray[0] === 'string' &&
                        Object.keys(modifierMap).includes(keyArray[0])
                    ) {
                        const finalKey = keyArray.pop()

                        // Run the handler once the user presses the modifier(s) and key
                        if (
                            keyArray.every((k) => modifierMap[k as keyof typeof modifierMap]) &&
                            finalKey?.toLowerCase() === e.key.toLowerCase()
                        ) {
                            e.preventDefault()
                            e.stopPropagation()
                            callbackRefs.current.get(shortcut)?.()
                            return
                        }
                    } else {
                        // Sequence case - get current sequence or initialize empty
                        const currentSequence = keySequences.get(shortcut) ?? []

                        if (
                            keyArray[currentSequence.length]?.toLowerCase() === e.key.toLowerCase()
                        ) {
                            // Complete sequence case
                            if (
                                Array.isArray(keyArray) &&
                                keyArray[keyArray.length - 1]?.toLowerCase() ===
                                    e.key.toLowerCase() &&
                                currentSequence.length === keyArray.length - 1
                            ) {
                                e.preventDefault()
                                e.stopPropagation()
                                callbackRefs.current.get(shortcut)?.()
                                setKeySequences((prev) => {
                                    const updated = new Map(prev)
                                    updated.set(shortcut, [])
                                    return updated
                                })
                                return
                            }

                            // Add to the sequence
                            setKeySequences((prev) => {
                                const updated = new Map(prev)
                                updated.set(shortcut, [...currentSequence, e.key])
                                return updated
                            })
                            return
                        } else if (currentSequence.length > 0) {
                            // Reset key combo if it doesn't match the sequence
                            setKeySequences((prev) => {
                                const updated = new Map(prev)
                                updated.set(shortcut, [])
                                return updated
                            })
                        }
                    }
                } else {
                    // Single key shortcuts (e.g. pressing "d")
                    if (e.key.toLowerCase() === shortcut.toLowerCase()) {
                        e.preventDefault()
                        e.stopPropagation()
                        callbackRefs.current.get(shortcut)?.()
                        return
                    }
                }
            }
        },
        [keySequences, options.disableTextInputs, map]
    )

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])
}
