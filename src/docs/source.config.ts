import {
    defineCollections,
    defineConfig,
    defineDocs,
    frontmatterSchema,
    metaSchema,
} from 'fumadocs-mdx/config'

/** Prose pages plus the `meta.json` files that order the sidebar. */
export const docs = defineDocs({
    dir: 'content/docs',
    docs: { schema: frontmatterSchema },
    meta: { schema: metaSchema },
})

/** Per-component pages; `dir` is relative to this app, not the repo root. */
export const componentDocs = defineCollections({
    dir: '../components',
    files: ['*/docs.mdx'],
    schema: frontmatterSchema,
    type: 'doc',
})

export default defineConfig({
    mdxOptions: {},
})
