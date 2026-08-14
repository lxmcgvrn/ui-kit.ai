import { LucideCopy } from 'lucide-react'
import { useCallback } from 'react'
import { Prism as SyntaxHighlighter, type SyntaxHighlighterProps } from 'react-syntax-highlighter'

import { FieldButton } from '../field-button'
import { Tooltip, TooltipTrigger } from '../tooltip'

export interface CodeBlockProps extends SyntaxHighlighterProps {
    /** When `true` (the default), CodeBlock shows line numbers in the left-hand column. */
    showLineNumbers?: boolean
}

/** A syntax-highlighted code block, with a copy button. */
export function CodeBlock({ showLineNumbers = true, ...props }: CodeBlockProps) {
    const copyValue = useCallback(() => {
        if (props.children === '' || props.children.length === 0) return
        const valueToCopy =
            typeof props.children === 'string' ? props.children : props.children.join('\n')

        return navigator.clipboard.writeText(valueToCopy)
    }, [props.children])

    return (
        <div className='relative w-full'>
            <SyntaxHighlighter
                {...props}
                PreTag={undefined}
                showLineNumbers={showLineNumbers}
                useInlineStyles={false}
                wrapLines
            >
                {typeof props.children === 'string' ? props.children.trim() : props.children}
            </SyntaxHighlighter>
            <TooltipTrigger>
                <FieldButton
                    aria-label='Copy to clipboard'
                    className='absolute -top-0.75 -right-0.75'
                    onPress={() => void copyValue()}
                >
                    <LucideCopy />
                </FieldButton>
                <Tooltip placement='top'>Copy to clipboard</Tooltip>
            </TooltipTrigger>
        </div>
    )
}
CodeBlock.displayName = 'Code'
