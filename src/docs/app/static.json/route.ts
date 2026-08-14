import { source } from '@/lib/source'
import { createFromSource } from 'fumadocs-core/search/server'

/** Static search index; the client half lives in `app/layout.tsx`. */
export const revalidate = false

export const { staticGET: GET } = createFromSource(source, {
    language: 'english',
})
