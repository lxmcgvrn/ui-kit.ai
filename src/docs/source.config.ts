import {
    defineCollections,
    defineConfig,
    defineDocs,
    frontmatterSchema,
    metaSchema,
} from 'fumadocs-mdx/config'

/**
 * The hand-written prose pages (`/docs`, `/docs/installation`, `/docs/theming`)
 * plus the `meta.json` files that own the sidebar's shape and ordering.
 */
export const docs = defineDocs({
    dir: 'content/docs',
    docs: { schema: frontmatterSchema },
    meta: { schema: metaSchema },
})

/**
 * Per-component reference pages, which live next to the component they
 * document — `src/components/<name>/docs.mdx`.
 *
 * `dir` is resolved against the working directory Next.js is run from (this
 * app), so it deliberately points outside the app. `lib/source.ts` maps these
 * files back onto the `components/<name>.mdx` virtual paths the rest of the
 * site already uses, so URLs and sidebar ordering are unaffected.
 */
export const componentDocs = defineCollections({
    dir: '../components',
    files: ['*/docs.mdx'],
    schema: frontmatterSchema,
    type: 'doc',
})

export default defineConfig({
    mdxOptions: {},
})
