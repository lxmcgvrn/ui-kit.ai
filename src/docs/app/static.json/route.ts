import { source } from '@/lib/source'
import { createFromSource } from 'fumadocs-core/search/server'

/**
 * Search indexes for the static search client, exported to `/static.json` at
 * build time (the site is a fully static export, so there is no search server).
 *
 * The client side of this lives in `app/layout.tsx`.
 */
export const revalidate = false

export const { staticGET: GET } = createFromSource(source, {
    language: 'english',
})
