import { componentDocs, docs } from '@/.source'
import { loader, map, multiple } from 'fumadocs-core/source'
import { createMDXSource } from 'fumadocs-mdx/runtime/next'

/**
 * Component pages are authored at `src/components/<name>/docs.mdx`, but the
 * site has always served them from `/docs/components/<name>`. Rewriting the
 * virtual path to `components/<name>.mdx` — the exact path the old
 * `content/docs/components/<name>.mdx` file had — keeps everything downstream
 * (URLs, slugs, the sidebar ordering declared in
 * `content/docs/components/meta.json`, and the static search index) working
 * without any further special-casing.
 *
 * This is also what lets the migration happen one component at a time: a
 * migrated and an unmigrated component produce the same virtual path, so both
 * land in the same "Components" folder in the page tree.
 */
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
