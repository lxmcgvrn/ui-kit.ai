import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { twMerge } from 'tailwind-merge'

export interface CodeInlineProps {
  /** The snippet of code to highlight. */
  children: string

  /** Merged with the default inline code styles. */
  className?: string

  /** Any language supported by [Prism](https://prismjs.com). */
  language: string
}

/** A syntax-highlighted inline code span. */
export function CodeInline({ children, className, language }: CodeInlineProps) {
  if (!children) return null

  return (
    <SyntaxHighlighter
      codeTagProps={{
        className: twMerge('bg-tint text-hi-contrast rounded-sm px-1 py-0.25', className),
        style: {
          whiteSpace: 'unset',
        },
      }}
      language={language}
      PreTag='span'
      useInlineStyles={false}
      wrapLines={false}
    >
      {children.replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}
CodeInline.displayName = 'CodeInline'
