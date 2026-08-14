import { componentDocs, docs } from '@/.source'
import { loader, map, multiple } from 'fumadocs-core/source'
import { createMDXSource } from 'fumadocs-mdx/runtime/next'

/** Serves `&lt;name>/docs.mdx` at the legacy `components/&lt;name>.mdx` path. */
const componentSource = map(createMDXSource(componentDocs)).page((entry) => ({
    ...entry,
    path: entry.path.replace(/^(?<component>.+)\/docs\.mdx$/, 'components/$<component>.mdx'),
}))

export const source = loader({
    baseUrl: '/docs',
    source: multiple({
        components: componentSource,
        docs: docs.toFumadocsSource(),
    }),
})
