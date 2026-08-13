'use client'

import { Chat, ChatMessage } from '@ui-kit.ai/components'
import { useEffect, useState } from 'react'

export default function ChatDefault() {
    const [streamedMessage, setStreamedMessage] = useState<string>('')

    useEffect(() => {
        const fullMessage = 'Hi, how can I help?'
        let currentIndex = 0

        const interval = setInterval(() => {
            if (currentIndex <= fullMessage.length) {
                setStreamedMessage(fullMessage.substring(0, currentIndex))
                currentIndex++
            } else {
                clearInterval(interval)
            }
        }, 100)

        return () => {
            clearInterval(interval)
        }
    }, [])

    // Combine the initial messages with the streaming content
    const messages = [
        {
            content: 'Hello',
            id: 'msg-1',
            origin: 'us',
        },
        {
            content: streamedMessage,
            id: 'msg-2',
            origin: 'them',
        },
    ] as const

    return (
        <Chat className='mx-auto max-w-3xl p-4'>
            {messages.map((message) => (
                <ChatMessage
                    content={message.content}
                    id={message.id}
                    key={message.id}
                    origin={message.origin}
                />
            ))}
        </Chat>
    )
}
