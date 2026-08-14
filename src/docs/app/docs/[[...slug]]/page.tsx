import type { Metadata } from 'next'

import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'

interface PageParams {
    slug?: string[]
}

export function generateMetadata(props: { params: Promise<PageParams> }): Promise<Metadata> {
    return props.params.then((params) => {
        const page = source.getPage(params.slug)
        if (page == null) notFound()

        return {
            description: page.data.description,
            title: page.data.title,
        }
    })
}

export function generateStaticParams(): { slug?: string[] }[] {
    return source.generateParams()
}

export default async function Page(props: { params: Promise<PageParams> }) {
    const params = await props.params
    const page = source.getPage(params.slug)
    if (page == null) notFound()

    const MDX = page.data.body

    return (
        <DocsPage
            full={page.data.full}
            toc={page.data.toc}
        >
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDX components={getMDXComponents()} />
            </DocsBody>
        </DocsPage>
    )
}
