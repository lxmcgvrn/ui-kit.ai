import type { AutoTypeTableProps } from 'fumadocs-typescript/ui'
import type { MDXComponents } from 'mdx/types'

import { ComponentPreview } from '@/components/component-preview'
import { ThemePlayground } from '@/components/theme-playground'
import { createGenerator } from 'fumadocs-typescript'
import { AutoTypeTable } from 'fumadocs-typescript/ui'
import defaultMdxComponents from 'fumadocs-ui/mdx'

const generator = createGenerator()

/** Components available to every MDX page without importing them. */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        AutoTypeTable: AutoTypeTableWithGenerator,
        ComponentPreview,
        ThemePlayground,
        ...components,
    }
}

function AutoTypeTableWithGenerator(props: AutoTypeTableProps) {
    return (
        <AutoTypeTable
            {...props}
            generator={generator}
        />
    )
}
