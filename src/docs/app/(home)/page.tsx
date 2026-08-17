import { ButtonThemeEditor } from '@/components/theme-editor'
import { GITHUB_URL } from '@/lib/layout.shared'
import {
    FieldGroup,
    Heading,
    Input,
    LinkButton,
    TextField,
    TextFieldCopyButton,
} from '@ui-kit.ai/components'
import { LucideChevronRight } from 'lucide-react'

import { Mosaic } from './mosaic'

export default function HomePage() {
    return (
        <main className='flex flex-1 flex-col'>
            <div className='mx-auto w-full max-w-6xl px-6 py-16 md:py-24'>
                <Heading
                    className='mb-4 max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-5xl'
                    level={1}
                >
                    Beautiful UI components for AI-powered apps
                </Heading>

                <p className='mb-8 max-w-xl text-lg text-balance'>
                    Accessible, themeable React components, built for fast iteration and ready for
                    production.
                </p>

                <div className='mb-20 flex flex-wrap items-center gap-2'>
                    <LinkButton
                        className='!h-10'
                        href='/docs'
                        slotRight={<LucideChevronRight />}
                    >
                        Get started
                    </LinkButton>
                    <LinkButton
                        className='!h-10'
                        href={GITHUB_URL}
                        target='_blank'
                        variant='secondary'
                    >
                        GitHub
                    </LinkButton>
                    <TextField
                        aria-label='Install command'
                        className='w-full shrink-0 md:w-72'
                        isReadOnly
                        value='npm i @ui-kit.ai/components'
                    >
                        <FieldGroup className='!h-10'>
                            <Input
                                className='font-mono'
                                isBorderless
                            />
                            <TextFieldCopyButton className='!size-7.5' />
                        </FieldGroup>
                    </TextField>
                </div>

                <div className='mb-4 flex flex-wrap items-end justify-between gap-3'>
                    <p className='mb-0 text-sm'>
                        Every tile below is a live component. Pick a color, watch them all follow.
                    </p>
                    <ButtonThemeEditor />
                </div>

                <Mosaic />
            </div>
        </main>
    )
}
