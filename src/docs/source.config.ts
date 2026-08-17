import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config'

/** Every docs page, plus the `meta.json` files that order the sidebar. */
export const docs = defineDocs({
    dir: 'content/docs',
    docs: { schema: frontmatterSchema },
    meta: { schema: metaSchema },
})

export default defineConfig({
    mdxOptions: {},
})
